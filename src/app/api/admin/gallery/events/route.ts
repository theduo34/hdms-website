import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category_slug: z.string().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  cover_asset_id: z.string().uuid().optional().nullable(),
})

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  let categoryId = parsed.data.category_id ?? null
  if (!categoryId && parsed.data.category_slug) {
    const { data: cat } = await db!
      .from('media_categories')
      .select('id')
      .eq('slug', parsed.data.category_slug)
      .eq('domain', 'gallery_events')
      .single()
    categoryId = cat?.id ?? null
  }

  const { category_slug: _slug, ...insertData } = parsed.data

  const { data, error } = await db!
    .from('gallery_events')
    .insert({ ...insertData, category_id: categoryId })
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data, 201)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'update')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const body = await req.json().catch(() => null)
  const parsed = eventSchema.partial().safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { data, error } = await db!
    .from('gallery_events')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'gallery', 'delete')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const { error } = await db!.from('gallery_events').delete().eq('id', id)
  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true })
}
