import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CommunitySubNav } from '@/features/community/community-sub-nav'
import { ServicePhilosophySection } from '@/features/community/service-philosophy-section'
import { InitiativesSection } from '@/features/community/initiatives-section'
import { CulturalSection } from '@/features/community/cultural-section'
import { ServiceCTASection } from '@/features/community/service-cta-section'

export function ServicePage() {
  return (
    <main className="w-full min-h-screen">
      <SmoothScroll>
        <PageHeader
          iconName="globe"
          label="Community"
          headingLine1="Service &"
          headingLine2="Outreach."
          watermark="Service"
          description="Heaven's Dew Montessori believes education must go beyond the classroom walls. We raise children who give back — to their school, their community, and their nation."
          accentLine
        />
        <CommunitySubNav />
        <ServicePhilosophySection />
        <InitiativesSection />
        <CulturalSection />
        <ServiceCTASection />
      </SmoothScroll>
    </main>
  )
}
