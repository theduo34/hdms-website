import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { creatableRoles } from '@/lib/admin/permissions'
import { writeAuditLog } from '@/lib/admin/audit'
import { z } from 'zod'
import type { AdminRole } from '@/lib/admin/types'

const VALID_TAGS = ['ict-directorate', 'school-heads', 'hdm-administration', 'admissions-office'] as const

const inviteSchema = z.object({
  email:          z.string().email(),
  display_name:   z.string().min(1),
  role:           z.enum(['super_admin', 'support_admin', 'school_admin']),
  department_tag: z.enum(VALID_TAGS).default('ict-directorate'),
})

const updateSchema = z.object({
  display_name:   z.string().min(1).optional(),
  role:           z.enum(['super_admin', 'support_admin', 'school_admin']).optional(),
  verified:       z.boolean().optional(),
  department_tag: z.enum(VALID_TAGS).optional(),
})

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'users', 'read')
  if (err) return err

  const { data, error } = await db!
    .from('admin_profiles')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function POST(req: NextRequest) {
  const { db, err, json, admin } = await apiGuard(req, 'users', 'create')
  if (err) return err

  const body   = await req.json().catch(() => null)
  const parsed = inviteSchema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const allowed = creatableRoles(admin!.profile.role as AdminRole)
  if (!allowed.includes(parsed.data.role)) {
    return json!({ error: `Your role cannot create "${parsed.data.role}" accounts.` }, 403)
  }

  const portalToken = process.env.ADMIN_PORTAL_TOKEN ?? ''
  const siteUrl     = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const { data: invited, error: inviteError } = await db!.auth.admin.inviteUserByEmail(
    parsed.data.email,
    {
      data: { display_name: parsed.data.display_name },
      redirectTo: `${siteUrl}/login/${portalToken}`,
    },
  )

  if (inviteError || !invited.user) {
    return json!({ error: inviteError?.message ?? 'Failed to send invitation.' }, 500)
  }

  const { data: profile, error: profileError } = await db!
    .from('admin_profiles')
    .insert({
      id:             invited.user.id,
      role:           parsed.data.role,
      display_name:   parsed.data.display_name,
      email:          parsed.data.email,
      department_tag: parsed.data.department_tag,
      verified:       false,
      created_by:     admin!.profile.id,
    })
    .select()
    .single()

  if (profileError) {
    return json!({ error: `Profile creation failed: ${profileError.message}` }, 500)
  }

  await writeAuditLog(admin!, 'invite', 'users', invited.user.id, {
    invited_email: parsed.data.email,
    role:          parsed.data.role,
  })

  return json!({ profile, message: `Invitation sent to ${parsed.data.email}` }, 201)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json, admin } = await apiGuard(req, 'users', 'update')
  if (err) return err

  if (admin!.profile.role !== 'super_admin') {
    return json!({ error: 'Only super admins can update admin profiles.' }, 403)
  }

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  if (id === admin!.profile.id) {
    return json!({ error: 'You cannot modify your own profile through this endpoint.' }, 400)
  }

  const body   = await req.json().catch(() => null)
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { data, error } = await db!
    .from('admin_profiles')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)

  await writeAuditLog(admin!, 'update', 'users', id, parsed.data as Record<string, unknown>)

  return json!(data)
}

export async function DELETE(req: NextRequest) {
  const { db, err, json, admin } = await apiGuard(req, 'users', 'delete')
  if (err) return err

  if (admin!.profile.role !== 'super_admin') {
    return json!({ error: 'Only super admins can delete admin accounts.' }, 403)
  }

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  if (id === admin!.profile.id) {
    return json!({ error: 'You cannot delete your own account.' }, 400)
  }

  const { error } = await db!.auth.admin.deleteUser(id)
  if (error) return json!({ error: error.message }, 500)

  await writeAuditLog(admin!, 'delete', 'users', id)

  return json!({ success: true })
}
