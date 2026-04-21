import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getMediaUrl } from '@/lib/media'

const DEFAULT_LIMIT = 10

function pick<T>(v: T | T[] | null | undefined): T | undefined {
    if (!v) return undefined
    return Array.isArray(v) ? v[0] : v
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id: eventId } = await params
    if (!eventId) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { searchParams } = new URL(req.url)
    const page  = Math.max(1, parseInt(searchParams.get('page')  ?? '1', 10))
    const limit = Math.max(1, parseInt(searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10))
    const from  = (page - 1) * limit
    const to    = from + limit - 1

    try {
        const db = createServiceClient()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const evResult: any = await db
            .from('gallery_events')
            .select(
                'id, title, description, event_date, photo_count, video_count,' +
                'cover:media_assets(storage_path, alt, width, height),' +
                'category:media_categories(slug)',
            )
            .eq('id', eventId)
            .single()

        if (evResult.error || !evResult.data) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const evRow: any = evResult.data
        const cover = pick(evRow.cover)
        const cat   = pick(evRow.category)

        const event = {
            id:          evRow.id,
            type:        'events',
            subCategory: cat?.slug ?? 'special',
            coverImage:  getMediaUrl(cover?.storage_path),
            alt:         cover?.alt ?? evRow.title,
            title:       evRow.title,
            eventDate:   evRow.event_date,
            description: evRow.description ?? '',
            photoCount:  evRow.photo_count,
            videoCount:  evRow.video_count,
            width:       cover?.width  ?? 1200,
            height:      cover?.height ?? 800,
        }

        const linksResult = await db
            .from('gallery_event_photos')
            .select('photo_id')
            .eq('event_id', eventId)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const photoIds = ((linksResult.data ?? []) as any[]).map((l: any) => l.photo_id)
        if (photoIds.length === 0) {
            return NextResponse.json({ event, photos: [], total: 0, hasMore: false })
        }

        const photoResult = await db
            .from('gallery_photos')
            .select(
                'id, created_at,' +
                'asset:media_assets(storage_path, alt, title, width, height),' +
                'category:media_categories(slug)',
            )
            .in('id', photoIds)
            .order('created_at', { ascending: false })
            .range(from, to)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const photos = ((photoResult.data ?? []) as any[]).map((row: any) => {
            const asset = pick(row.asset)
            const pCat  = pick(row.category)
            return {
                id:          row.id,
                type:        'photos',
                subCategory: pCat?.slug ?? 'events',
                src:         getMediaUrl(asset?.storage_path),
                alt:         asset?.alt ?? '',
                title:       asset?.title ?? asset?.alt ?? '',
                createdAt:   (row.created_at as string).slice(0, 10),
                width:       asset?.width  ?? 1200,
                height:      asset?.height ?? 800,
            }
        })

        const total   = photoIds.length
        const hasMore = from + photos.length < total

        return NextResponse.json({ event, photos, total, hasMore })
    } catch (e) {
        console.error('[/api/gallery/events/[id]]', e)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
