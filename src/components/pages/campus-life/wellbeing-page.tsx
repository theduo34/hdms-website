import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CampusLifeSubNav } from '@/features/campus-life/campus-life-sub-nav'
import { WellbeingQuoteSection } from '@/features/campus-life/wellbeing-quote-section'
import { PastoralSection } from '@/features/campus-life/pastoral-section'
import { HealthSection } from '@/features/campus-life/health-section'
import { NutritionSection } from '@/features/campus-life/nutrition-section'

export function WellbeingPage() {
  return (
    <main className="w-full min-h-screen">
      <SmoothScroll>
        <PageHeader
          iconName="heart"
          label="Campus Life"
          headingLine1="Wellbeing at"
          headingLine2="Heaven's Dew."
          watermark="Care"
          description="We believe a child who feels safe, seen, and cared for is a child who can truly learn. At HDM, wellbeing is not a policy — it is a promise we make to every family who entrusts their child to us."
          accentLine
        />
        <CampusLifeSubNav />
        <WellbeingQuoteSection />
        <PastoralSection />
        <HealthSection />
        <NutritionSection />
      </SmoothScroll>
    </main>
  )
}
