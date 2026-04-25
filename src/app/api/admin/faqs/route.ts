import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

const schema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  sort_order: z.number().default(0),
})

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'faqs', 'read')
  if (err) return err

  const { data, error } = await db!
    .from('admissions_faqs')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'faqs', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { data, error } = await db!
    .from('admissions_faqs')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data, 201)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'faqs', 'update')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const body = await req.json().catch(() => null)
  const parsed = schema.partial().safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { data, error } = await db!
    .from('admissions_faqs')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'faqs', 'delete')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const { error } = await db!.from('admissions_faqs').delete().eq('id', id)
  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true })
}
