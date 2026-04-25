import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

const PAGE_SIZE_DEFAULT = 10

const postSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  category: z.enum(['news', 'announcement', 'event', 'press']),
  category_label: z.string().default(''),
  headline: z.string().min(1),
  excerpt: z.string().default(''),
  cover_asset_id: z.string().uuid().optional().nullable(),
  content: z.array(z.object({
    type: z.enum(['paragraph', 'pullquote']),
    text: z.string(),
  })).default([]),
  featured: z.boolean().default(false),
  published_at: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'news', 'read')
  if (err) return err

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (id) {
    const { data, error } = await db!
      .from('news_posts')
      .select('*, cover:media_assets!cover_asset_id(id, storage_path, alt)')
      .eq('id', id)
      .single()
    if (error) return json!({ error: error.message }, 404)
    return json!(data)
  }

  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = parseInt(searchParams.get('limit') ?? String(PAGE_SIZE_DEFAULT), 10)
  const offset = (page - 1) * limit

  const { data, error, count } = await db!
    .from('news_posts')
    .select('*, cover:media_assets!cover_asset_id(id, storage_path, alt)', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return json!({ error: error.message }, 500)
  return json!({ data, count, page, limit })
}

export async function POST(req: NextRequest) {
  const { db, err, json, admin } = await apiGuard(req, 'news', 'create')
  if (err) return err

  const body = await req.json().catch(() => null)
  const parsed = postSchema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const author = admin!.profile.display_name
  const author_tag = admin!.profile.department_tag ?? 'ict-directorate'

  const { data, error } = await db!
    .from('news_posts')
    .insert({ ...parsed.data, author, author_tag })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') return json!({ error: 'A post with this slug already exists.' }, 409)
    return json!({ error: error.message }, 500)
  }
  return json!(data, 201)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'news', 'update')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const body = await req.json().catch(() => null)
  const parsed = postSchema.partial().safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { data, error } = await db!
    .from('news_posts')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'news', 'delete')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const { error } = await db!.from('news_posts').delete().eq('id', id)
  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true })
}
