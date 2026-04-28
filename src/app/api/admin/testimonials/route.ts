import { NextRequest } from 'next/server'
import { apiGuard } from '@/lib/admin/api-guard'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

function pickFirst<T>(v: T | T[] | null | undefined): T | undefined {
  if (!v) return undefined
  return Array.isArray(v) ? v[0] : v
}

const createSchema = z.object({
  parent_name: z.string().min(1).max(120),
  child_year:  z.string().max(80).default(''),
  quote:       z.string().min(1).max(1000),
  asset_id:    z.string().uuid().nullable().optional(),
  is_active:   z.boolean().optional(),
  sort_order:  z.number().int().optional(),
})

export async function GET(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'testimonials', 'read')
  if (err) return err

  const { searchParams } = new URL(req.url)
  const page  = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '12', 10)))
  const offset = (page - 1) * limit

  const { data, error, count } = await db!
    .from('parent_testimonials')
    .select('id, parent_name, child_year, quote, asset_id, is_active, sort_order, created_at, asset:media_assets(id, storage_path, alt)', { count: 'exact' })
    .order('sort_order', { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) return json!({ error: error.message }, 500)

  const rows = (data ?? []).map((row) => ({
    ...row,
    asset: pickFirst(row.asset as Parameters<typeof pickFirst>[0]),
  }))

  const total = count ?? 0
  return json!({ data: rows, total, page, limit, hasMore: total > offset + limit })
}

export async function POST(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'testimonials', 'create')
  if (err) return err

  const body   = await req.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { count } = await db!
    .from('parent_testimonials')
    .select('*', { count: 'exact', head: true })

  const { data, error } = await db!
    .from('parent_testimonials')
    .insert({ ...parsed.data, sort_order: parsed.data.sort_order ?? (count ?? 0) })
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data, 201)
}

export async function PATCH(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'testimonials', 'update')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const body   = await req.json().catch(() => null)
  const parsed = createSchema.partial().safeParse(body)
  if (!parsed.success) return json!({ error: parsed.error.flatten() }, 400)

  const { data, error } = await db!
    .from('parent_testimonials')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()

  if (error) return json!({ error: error.message }, 500)
  return json!(data)
}

export async function DELETE(req: NextRequest) {
  const { db, err, json } = await apiGuard(req, 'testimonials', 'delete')
  if (err) return err

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return json!({ error: 'Missing id' }, 400)

  const { error } = await db!.from('parent_testimonials').delete().eq('id', id)
  if (error) return json!({ error: error.message }, 500)
  return json!({ success: true })
}
