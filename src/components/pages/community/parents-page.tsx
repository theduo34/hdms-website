import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CommunitySubNav } from '@/features/community/community-sub-nav'
import { PartnershipSection } from '@/features/community/partnership-section'
import { PTASection } from '@/features/community/pta-section'
import { GetInvolvedSection } from '@/features/community/get-involved-section'
import { TestimonialsSection } from '@/features/community/testimonials-section'

export function ParentsPage() {
  return (
    <main className="w-full min-h-screen">
      <SmoothScroll>
        <PageHeader
          iconName="users"
          label="Community"
          headingLine1="Parents &"
          headingLine2="Families."
          watermark="Family"
          description="At HDM, parents are not visitors - they are partners. Everything we do is stronger when school and home move together, guided by the same love for every child in our care."
          accentLine
        />
        <CommunitySubNav />
        <PartnershipSection />
        <PTASection />
        <GetInvolvedSection />
        <TestimonialsSection />
      </SmoothScroll>
    </main>
  )
}
