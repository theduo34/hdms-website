import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { AdmissionsPageHeader } from '@/features/admissions/AdmissionsPageHeader'
import { FeesSection } from '@/features/admissions/AdmissionsSections'

export function TuitionPage() {
    return (
        <main className="w-full min-h-screen">
            <SmoothScroll>
                <AdmissionsPageHeader
                    iconName="banknote"
                    label="Admissions - Fees"
                    headingLine1="Transparent"
                    headingLine2="Fee Structure."
                    description="We believe in complete transparency when it comes to the cost of your child's education. Below you'll find our full fee schedule for the 2025/2026 academic year."
                    watermark="Tuition"
                />
                <div className="max-w-325 mx-auto px-4 md:px-12 py-16">
                    <FeesSection />
                </div>
            </SmoothScroll>
        </main>
    )
}
