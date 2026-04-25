// GET  /api/admin/settings     — list all settings
// PATCH /api/admin/settings    — upsert a batch of settings (super_admin only)

import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'settings', 'read')
  if (err) return err

  const { data, error } = await db!
    .from('school_settings')
    .select('*')
    .order('key', { ascending: true })

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json, admin } = await apiGuard(req, 'settings', 'update')
  if (err) return err

  if (admin!.profile.role !== 'super_admin') {
    return json!({ error: 'Only super admins can update settings.' }, 403)
  }

  const body = await req.json().catch(() => null)
  const parsed = z.record(z.string(), z.string()).safeParse(body)
  if (!parsed.success) return json!({ error: 'Body must be an object of key:value strings.' }, 400)

  const rows = Object.entries(parsed.data).map(([key, value]) => ({ key, value }))

  const { error } = await db!
    .from('school_settings')
    .upsert(rows, { onConflict: 'key' })

  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true, updated: rows.length })
}
