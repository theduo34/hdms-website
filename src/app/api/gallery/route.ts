import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getMediaUrl } from '@/lib/media'
import { PAGE_SIZE } from '@/features/gallery/gallery'

function pick<T>(v: T | T[] | null | undefined): T | undefined {
    if (!v) return undefined
    return Array.isArray(v) ? v[0] : v
}

// When sub !== 'all':
//   - Use !inner so PostgREST does an INNER JOIN → rows with no/wrong category are excluded.
//   - Filter by media_categories.slug to match the chosen sub-category.
//   - No separate lookup needed; one round-trip does the filtering.
// When sub === 'all':
//   - Use a regular (LEFT) join so uncategorised rows are still returned.
function categorySelect(sub: string, leftJoin: string, innerJoin: string) {
    return sub === 'all' ? leftJoin : innerJoin
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const main = (searchParams.get('main') ?? 'photos') as 'photos' | 'videos' | 'events'
    const sub  = searchParams.get('sub')  ?? 'all'
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))

    try {
        const db = createServiceClient()

        // ── photos ───────────────────────────────────────────────────────────
        if (main === 'photos') {
            const limit = PAGE_SIZE.photos
            const from  = (page - 1) * limit
            const to    = from + limit - 1

            const catJoin = categorySelect(
                sub,
                'category:media_categories(slug)',
                'category:media_categories!inner(slug)',
            )

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let query: any = db
                .from('gallery_photos')
                .select(
                    `id, created_at, asset:media_assets(storage_path, alt, title, width, height), ${catJoin}`,
                    { count: 'exact' },
                )
                .order('sort_order', { ascending: true })
                .range(from, to)

            if (sub !== 'all') query = query.eq('media_categories.slug', sub)

            const { data, count, error } = await query
            if (error) return NextResponse.json({ error: error.message }, { status: 500 })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items = (data ?? []).map((row: any) => {
                const asset = pick(row.asset)
                const cat   = pick(row.category)
                return {
                    id:          row.id,
                    type:        'photos',
                    subCategory: cat?.slug ?? 'events',
                    src:         getMediaUrl(asset?.storage_path),
                    alt:         asset?.alt ?? '',
                    title:       asset?.title ?? asset?.alt ?? '',
                    createdAt:   (row.created_at as string).slice(0, 10),
                    width:       asset?.width  ?? 1200,
                    height:      asset?.height ?? 800,
                }
            })

            const total = count ?? 0
            return NextResponse.json({ items, total, hasMore: total > page * limit })
        }

        // ── videos ───────────────────────────────────────────────────────────
        if (main === 'videos') {
            const limit = PAGE_SIZE.videos
            const from  = (page - 1) * limit
            const to    = from + limit - 1

            const catJoin = categorySelect(
                sub,
                'category:media_categories(slug)',
                'category:media_categories!inner(slug)',
            )

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let query: any = db
                .from('gallery_videos')
                .select(
                    `id, title, alt, video_url, duration, width, height, created_at, thumbnail:media_assets(storage_path), ${catJoin}`,
                    { count: 'exact' },
                )
                .order('created_at', { ascending: false })
                .range(from, to)

            if (sub !== 'all') query = query.eq('media_categories.slug', sub)

            const { data, count, error } = await query
            if (error) return NextResponse.json({ error: error.message }, { status: 500 })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items = (data ?? []).map((row: any) => {
                const thumb = pick(row.thumbnail)
                const cat   = pick(row.category)
                return {
                    id:          row.id,
                    type:        'videos',
                    subCategory: cat?.slug ?? 'events',
                    thumbnail:   getMediaUrl(thumb?.storage_path),
                    alt:         row.alt,
                    title:       row.title,
                    createdAt:   (row.created_at as string).slice(0, 10),
                    duration:    row.duration ?? '',
                    videoUrl:    row.video_url,
                    width:       row.width  ?? 1200,
                    height:      row.height ?? 675,
                }
            })

            const total = count ?? 0
            return NextResponse.json({ items, total, hasMore: total > page * limit })
        }

        // ── events ───────────────────────────────────────────────────────────
        const limit = PAGE_SIZE.events
        const from  = (page - 1) * limit
        const to    = from + limit - 1

        const catJoin = categorySelect(
            sub,
            'category:media_categories(slug)',
            'category:media_categories!inner(slug)',
        )

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let query: any = db
            .from('gallery_events')
            .select(
                `id, title, description, event_date, photo_count, video_count, cover:media_assets(storage_path, alt, width, height), ${catJoin}`,
                { count: 'exact' },
            )
            .order('event_date', { ascending: false })
            .range(from, to)

        if (sub !== 'all') query = query.eq('media_categories.slug', sub)

        const { data, count, error } = await query
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items = (data ?? []).map((row: any) => {
            const cover = pick(row.cover)
            const cat   = pick(row.category)
            return {
                id:          row.id,
                type:        'events',
                subCategory: cat?.slug ?? 'special',
                coverImage:  getMediaUrl(cover?.storage_path),
                alt:         cover?.alt ?? row.title,
                title:       row.title,
                eventDate:   row.event_date,
                description: row.description ?? '',
                photoCount:  row.photo_count,
                videoCount:  row.video_count,
                width:       cover?.width  ?? 1200,
                height:      cover?.height ?? 800,
            }
        })

        const total = count ?? 0
        return NextResponse.json({ items, total, hasMore: total > page * limit })

    } catch (e) {
        console.error('[/api/gallery]', e)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
