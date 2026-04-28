import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const random = searchParams.get('random') === 'true'
  const page   = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit  = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') ?? '9', 10)))

  const supabase = await createClient()

  if (random) {
    const { data, error } = await supabase
      .from('parent_testimonials')
      .select('id, parent_name, child_year, quote, asset:media_assets(id, storage_path, alt)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const shuffled = [...(data ?? [])].sort(() => Math.random() - 0.5).slice(0, limit)
    return NextResponse.json({ data: shuffled, total: data?.length ?? 0 })
  }

  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('parent_testimonials')
    .select('id, parent_name, child_year, quote, asset:media_assets(id, storage_path, alt)', { count: 'exact' })
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const total = count ?? 0
  return NextResponse.json({
    data: data ?? [],
    total,
    page,
    limit,
    hasMore: total > offset + limit,
  })
}
