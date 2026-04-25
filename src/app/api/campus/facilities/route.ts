import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getMediaUrl } from '@/lib/media'

type Section = 'learning' | 'outdoor' | 'support'

interface FacilityItem {
    id: string
    name: string
    description: string
    image: string
    alt: string
}

export async function GET() {
    try {
        const db = createServiceClient()

        const { data, error } = await db
            .from('campus_facilities')
            .select('id, section, name, description, asset:media_assets(storage_path, alt)')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error) throw error

        const grouped: Record<Section, FacilityItem[]> = { learning: [], outdoor: [], support: [] }

        for (const row of data ?? []) {
            const asset = (Array.isArray(row.asset) ? row.asset[0] : row.asset) as
                | { storage_path?: string; alt?: string }
                | null
            const item: FacilityItem = {
                id:          row.id,
                name:        row.name,
                description: row.description,
                image:       getMediaUrl(asset?.storage_path),
                alt:         asset?.alt ?? row.name,
            }
            if (row.section in grouped) {
                grouped[row.section as Section].push(item)
            }
        }

        return NextResponse.json(grouped, {
            headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
        })
    } catch {
        return NextResponse.json({ learning: [], outdoor: [], support: [] })
    }
}
