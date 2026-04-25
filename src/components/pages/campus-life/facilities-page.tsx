import { createServiceClient } from '@/lib/supabase/service'
import { getMediaUrl } from '@/lib/media'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CampusLifeSubNav } from '@/features/campus-life/campus-life-sub-nav'
import { LearningSpacesSection } from '@/features/campus-life/learning-spaces-section'
import { OutdoorSection } from '@/features/campus-life/outdoor-section'
import { SupportSection } from '@/features/campus-life/support-section'
import {
    learningSpaces as defaultLearning,
    outdoorSpaces as defaultOutdoor,
    supportSpaces as defaultSupport,
} from '@/features/campus-life/campus-life'

export interface FacilityItem {
    id?: string
    name: string
    description: string
    image: string
    alt?: string
}

type Section = 'learning' | 'outdoor' | 'support'

async function getFacilities(): Promise<Record<Section, FacilityItem[]>> {
    try {
        const db = createServiceClient()
        const { data, error } = await db
            .from('campus_facilities')
            .select('id, section, name, description, asset:media_assets(storage_path, alt)')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error || !data?.length) throw new Error()

        const grouped: Record<Section, FacilityItem[]> = { learning: [], outdoor: [], support: [] }

        for (const row of data) {
            const asset = (Array.isArray(row.asset) ? row.asset[0] : row.asset) as
                | { storage_path?: string; alt?: string }
                | null
            if (row.section in grouped) {
                grouped[row.section as Section].push({
                    id:          row.id,
                    name:        row.name,
                    description: row.description,
                    image:       getMediaUrl(asset?.storage_path),
                    alt:         asset?.alt ?? row.name,
                })
            }
        }

        return grouped
    } catch {
        return {
            learning: defaultLearning,
            outdoor:  defaultOutdoor,
            support:  defaultSupport,
        }
    }
}

export async function FacilitiesPage() {
    const facilities = await getFacilities()

    return (
        <main className="w-full min-h-screen">
            <SmoothScroll>
                <PageHeader
                    iconName="building2"
                    label="Campus Life"
                    headingLine1="Our Campus &"
                    headingLine2="Facilities."
                    watermark="Campus"
                    description="Our campus is designed with children in mind — spaces that are beautiful, purposeful, and safe. Every environment at HDM invites curiosity, supports independence, and makes children feel right at home."
                    accentLine
                />
                <CampusLifeSubNav />
                <LearningSpacesSection items={facilities.learning} />
                <OutdoorSection items={facilities.outdoor} />
                <SupportSection items={facilities.support} />
            </SmoothScroll>
        </main>
    )
}
