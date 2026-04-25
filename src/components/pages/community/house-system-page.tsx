import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CommunitySubNav } from '@/features/community/community-sub-nav'
import { HouseOverviewSection } from '@/features/community/house-overview-section'
import { HouseTabsSection } from '@/features/community/house-tabs-section'
import { HouseLifeSection } from '@/features/community/house-life-section'

export function HouseSystemPage() {
  return (
    <main className="w-full min-h-screen">
      <SmoothScroll>
        <PageHeader
          iconName="shield"
          label="Community"
          headingLine1="Four Houses."
          headingLine2="One Family."
          watermark="Houses"
          description="Every child who joins Heaven's Dew Montessori becomes part of something bigger than a classroom. They join a house - a community within the community - where friendships, competition, and belonging are built for life."
          accentLine
        />
        <CommunitySubNav />
        <HouseOverviewSection />
        <HouseTabsSection />
        <HouseLifeSection />
      </SmoothScroll>
    </main>
  )
}
