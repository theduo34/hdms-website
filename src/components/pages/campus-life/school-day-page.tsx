import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageHeader } from '@/components/shared/page-header'
import { CampusLifeSubNav } from '@/features/campus-life/campus-life-sub-nav'
import { DayScheduleSection } from '@/features/campus-life/day-schedule-section'
import { WorkCycleSection } from '@/features/campus-life/work-cycle-section'
import { MealsSection } from '@/features/campus-life/meals-section'

export function SchoolDayPage() {
  return (
    <main className="w-full min-h-screen">
      <SmoothScroll>
        <PageHeader
          iconName="sun"
          label="Campus Life"
          headingLine1="A Day at"
          headingLine2="Heaven's Dew."
          watermark="Day"
          description="From morning assembly to afternoon dismissal, every hour of the HDM school day is purposefully designed around the Montessori method - giving children the time, space, and freedom to truly flourish."
          accentLine
        />
        <CampusLifeSubNav />
        <DayScheduleSection />
        <WorkCycleSection />
        <MealsSection />
      </SmoothScroll>
    </main>
  )
}
