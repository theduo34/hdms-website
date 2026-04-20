import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  department: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  initials: z.string().nullable().optional(),
  asset_id: z.string().uuid().nullable().optional(),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
})

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'staff', 'read')
  if (err) return err

  const { data, error } = await db!
    .from('staff_members')
    .select('*, photo:media_assets!asset_id(id, storage_path, alt)')
    .order('sort_order', { ascending: true })

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'staff', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const initials = parsed.data.initials ??
    parsed.data.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  const { data, error } = await db!
    .from('staff_members')
    .insert({ ...parsed.data, initials })
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data, 201)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'staff', 'update')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const body = await req.json().catch(() => null)
  const parsed = schema.partial().safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { data, error } = await db!
    .from('staff_members')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'staff', 'delete')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const { error } = await db!.from('staff_members').delete().eq('id', id)
  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true })
}
