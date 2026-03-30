import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { AdmissionsPageHeader } from '@/features/admissions/AdmissionsPageHeader'
import AdmissionsSideNav from '@/features/admissions/AdmissionsSideNav'
import { OpenDaySection, ContactAdmissions } from '@/features/admissions/AdmissionsSections'
import { visitSideNavSections } from '@/features/admissions/admissions'

export function VisitCampusPage() {
    return (
        <main className="w-full min-h-screen">
            <SmoothScroll>
                <AdmissionsPageHeader
                    iconName="mappin"
                    label="Admissions - Visit"
                    headingLine1="Visit Our"
                    headingLine2="Campus."
                    description="Experience Heaven's Dew Montessori first-hand. Come and see our classrooms, meet our teachers, and discover why families across the Eastern Region trust us with their children's education."
                    watermark="Visit"
                />
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] max-w-325 mx-auto px-4 md:px-12 gap-1 items-start">
                    <AdmissionsSideNav sections={visitSideNavSections} />
                    <div className="min-w-0 flex flex-col gap-16 py-16">
                        <OpenDaySection />
                        <ContactAdmissions />
                    </div>
                </div>
            </SmoothScroll>
        </main>
    )
}
