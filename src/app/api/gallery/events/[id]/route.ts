import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getTransformedMediaUrl } from '@/lib/media'

function pick<T>(v: T | T[] | null | undefined): T | undefined {
    if (!v) return undefined
    return Array.isArray(v) ? v[0] : v
}

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id: eventId } = await params
    if (!eventId) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

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
            coverImage:  getTransformedMediaUrl(cover?.storage_path, { width: 800, quality: 80 }),
            alt:         cover?.alt ?? evRow.title,
            title:       evRow.title,
            eventDate:   evRow.event_date,
            description: evRow.description ?? '',
            photoCount:  evRow.photo_count,
            videoCount:  evRow.video_count,
            width:       cover?.width  ?? 1200,
            height:      cover?.height ?? 800,
        }

        // Fetch ordered photo IDs linked to this event
        const linksResult = await db
            .from('gallery_event_photos')
            .select('photo_id')
            .eq('event_id', eventId)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const photoIds = ((linksResult.data ?? []) as any[]).map((l: any) => l.photo_id)
        if (photoIds.length === 0) {
            return NextResponse.json({ event, photos: [], total: event.photoCount })
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const photos = ((photoResult.data ?? []) as any[])
            .map((row: any) => {
                const asset = pick(row.asset)
                const pCat  = pick(row.category)
                return {
                    id:          row.id,
                    type:        'photos',
                    subCategory: pCat?.slug ?? 'events',
                    src:         getTransformedMediaUrl(asset?.storage_path, { width: 1600, quality: 80 }),
                    alt:         asset?.alt ?? '',
                    title:       asset?.title ?? asset?.alt ?? '',
                    createdAt:   (row.created_at as string).slice(0, 10),
                    width:       asset?.width  ?? 1200,
                    height:      asset?.height ?? 800,
                }
            })

        return NextResponse.json({ event, photos, total: event.photoCount })
    } catch (e) {
        console.error('[/api/gallery/events/[id]]', e)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
