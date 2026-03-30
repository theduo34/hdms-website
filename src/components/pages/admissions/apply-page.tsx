import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { AdmissionsPageHeader } from '@/features/admissions/AdmissionsPageHeader'
import AdmissionsSideNav from '@/features/admissions/AdmissionsSideNav'
import HowToApply from '@/features/admissions/HowToApply'
import Requirements from '@/features/admissions/Requirements'
import ApplyNow from '@/features/admissions/ApplyNow'
import { FAQsSection } from '@/features/admissions/AdmissionsSections'
import { applySideNavSections } from '@/features/admissions/admissions'
import {getAcademicYear} from "@/lib/utils";

export function ApplyPage() {
    const {label} = getAcademicYear();
    return (
        <main className="w-full min-h-screen">
            <SmoothScroll>
                <AdmissionsPageHeader
                    iconName="clipboard"
                    label={label}
                    headingLine1="Begin Your Child's"
                    headingLine2="Application."
                    description="Joining Heaven's Dew Montessori School is the first step towards giving your child an education that truly sees, understands, and nurtures them. We're delighted you're considering us."
                    watermark="Apply Now"
                />
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] max-w-325 mx-auto px-4 md:px-12 gap-1 items-start">
                    <AdmissionsSideNav sections={applySideNavSections} />
                    <div className="min-w-0 flex flex-col gap-16 py-16">
                        <HowToApply />
                        <Requirements />
                        <ApplyNow />
                        <FAQsSection />
                    </div>
                </div>
            </SmoothScroll>
        </main>
    )
}
