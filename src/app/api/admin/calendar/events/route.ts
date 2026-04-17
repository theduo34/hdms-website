// GET    /api/admin/calendar/events           — list events
// POST   /api/admin/calendar/events           — create event
// PATCH  /api/admin/calendar/events?id=<id>   — update event
// DELETE /api/admin/calendar/events?id=<id>   — delete event

import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().nullable().optional(),
  time: z.string().nullable().optional(),
  end_time: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  category: z.enum(['academic', 'event', 'holiday', 'exam', 'sports', 'cultural']),
  category_label: z.string().default(''),
  description: z.string().nullable().optional(),
  is_all_day: z.boolean().default(false),
  is_highlight: z.boolean().default(false),
})

const CATEGORY_LABELS: Record<string, string> = {
  academic: 'Academic',
  event: 'Event',
  holiday: 'Holiday',
  exam: 'Exam',
  sports: 'Sports',
  cultural: 'Cultural',
}

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'calendar', 'read')
  if (err) return err

  const { searchParams } = new URL(req.url)
  const upcoming = searchParams.get('upcoming') === 'true'
  const today = new Date().toISOString().slice(0, 10)

  const query = db!
    .from('calendar_events')
    .select('*')
    .order('date', { ascending: true })
    .limit(60)

  if (upcoming) query.gte('date', today)

  const { data, error } = await query

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'calendar', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const id = parsed.data.id ?? `ev-${Date.now()}`
  const label = parsed.data.category_label || CATEGORY_LABELS[parsed.data.category]

  const { data, error } = await db!
    .from('calendar_events')
    .insert({ ...parsed.data, id, category_label: label })
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

  if (parsed.data.category && !parsed.data.category_label) {
    parsed.data.category_label = CATEGORY_LABELS[parsed.data.category]
  }

  const { data, error } = await db!
    .from('calendar_events')
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

  const { error } = await db!.from('calendar_events').delete().eq('id', id)
  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true })
}
