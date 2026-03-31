import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CampusLifeSubNav } from '@/features/campus-life/campus-life-sub-nav'
import { LearningSpacesSection } from '@/features/campus-life/learning-spaces-section'
import { OutdoorSection } from '@/features/campus-life/outdoor-section'
import { SupportSection } from '@/features/campus-life/support-section'

export function FacilitiesPage() {
  return (
    <main className="w-full min-h-screen">
      <SmoothScroll>
        <PageHeader
          iconName="building2"
          label="Campus Life"
          headingLine1="Our Campus &"
          headingLine2="Facilities."
          watermark="Campus"
          description="Our campus is designed with children in mind - spaces that are beautiful, purposeful, and safe. Every environment at HDM invites curiosity, supports independence, and makes children feel right at home."
          accentLine
        />
        <CampusLifeSubNav />
        <LearningSpacesSection />
        <OutdoorSection />
        <SupportSection />
      </SmoothScroll>
    </main>
  )
}
