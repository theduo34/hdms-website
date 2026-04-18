import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function GET() {
    try {
        const db = createServiceClient()
        const [photos, videos, events] = await Promise.all([
            db.from('gallery_photos').select('id', { count: 'exact', head: true }),
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
