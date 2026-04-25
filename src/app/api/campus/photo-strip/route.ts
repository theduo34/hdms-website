import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getMediaUrl } from '@/lib/media'

export async function GET() {
    try {
        const db = createServiceClient()

        const { data, error } = await db
            .from('campus_photo_strip')
            .select('id, caption, asset:media_assets(storage_path, alt, width, height)')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })
            .limit(24)

        if (error) throw error

        const items = (data ?? []).map((row) => {
            const asset = (Array.isArray(row.asset) ? row.asset[0] : row.asset) as
                | { storage_path?: string; alt?: string; width?: number; height?: number }
                | null
            return {
                id:      row.id,
                caption: row.caption,
                src:     getMediaUrl(asset?.storage_path),
                alt:     asset?.alt ?? row.caption,
                width:   asset?.width  ?? 700,
                height:  asset?.height ?? 700,
            }
        })

        return NextResponse.json(items, {
            headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
        })
    } catch {
        return NextResponse.json([])
    }
}
