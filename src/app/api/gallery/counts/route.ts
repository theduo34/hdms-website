import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function GET() {
    try {
        const db = createServiceClient()

        // Exclude event-album photos from the public photo count (same logic as /api/gallery)
        const { data: eventLinks } = await db.from('gallery_event_photos').select('photo_id')
        const eventPhotoIds = (eventLinks ?? []).map((r: { photo_id: string }) => r.photo_id)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let photoQuery: any = db.from('gallery_photos').select('id', { count: 'exact', head: true })
        if (eventPhotoIds.length > 0) {
            photoQuery = photoQuery.not('id', 'in', `(${eventPhotoIds.join(',')})`)
        }

        const [photos, videos, events] = await Promise.all([
            photoQuery,
            db.from('gallery_videos').select('id', { count: 'exact', head: true }),
            db.from('gallery_events').select('id', { count: 'exact', head: true }),
        ])

        return NextResponse.json({
            photos: photos.count ?? 0,
            videos: videos.count ?? 0,
            events: events.count ?? 0,
        })
    } catch (e) {
        console.error('[/api/gallery/counts]', e)
        return NextResponse.json({ photos: 0, videos: 0, events: 0 })
    }
}
