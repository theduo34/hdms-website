// GET    /api/admin/calendar/terms           — list terms
// POST   /api/admin/calendar/terms           — create term
// PATCH  /api/admin/calendar/terms?id=<id>   — update term
// DELETE /api/admin/calendar/terms?id=<id>   — delete term

import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  is_current: z.boolean().default(false),
  is_break: z.boolean().default(false),
})

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'calendar', 'read')
  if (err) return err

  const { data, error } = await db!
    .from('academic_terms')
    .select('*')
    .order('start_date', { ascending: true })

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'calendar', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const id = parsed.data.id ?? `term-${Date.now()}`

  const { data, error } = await db!
    .from('academic_terms')
    .insert({ ...parsed.data, id })
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data, 201)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'calendar', 'update')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const body = await req.json().catch(() => null)
  const parsed = schema.partial().safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  // If setting is_current = true, unset all others first
  if (parsed.data.is_current) {
    await db!.from('academic_terms').update({ is_current: false }).neq('id', id)
  }

  const { data, error } = await db!
    .from('academic_terms')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'calendar', 'delete')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const { error } = await db!.from('academic_terms').delete().eq('id', id)
  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true })
}
