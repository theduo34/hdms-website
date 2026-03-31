import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CampusLifeSubNav } from '@/features/campus-life/campus-life-sub-nav'
import { SportGallerySection } from '@/features/campus-life/sports-gallery-section'
import { ClubsSection } from '@/features/campus-life/clubs-section'

export function SportsPage() {
  return (
    <main className="w-full min-h-screen">
      <SmoothScroll>
        <PageHeader
          iconName="trophy"
          label="Campus Life"
          headingLine1="Sports, Clubs &"
          headingLine2="Activities."
          watermark="Sports"
          description="Life at HDM extends well beyond the classroom. From the football pitch to the art room, our sports programme and after-school clubs nurture well-rounded, energetic, and confident children."
          accentLine
        />
        <CampusLifeSubNav />
        <SportGallerySection />
        <ClubsSection />
      </SmoothScroll>
    </main>
  )
}
