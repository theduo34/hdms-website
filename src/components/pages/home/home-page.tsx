import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { HeroSection } from "@/features/home/sections/hero-section";
import { HdmExperienceSection } from "@/features/home/sections/hdm-experience-section";
import { StudentsSection } from "@/features/home/sections/students-section";
import { StudentExperienceSection } from "@/features/home/sections/student-experience-section";

export function HomePage() {
    return (
        <main className="flex items-start justify-start w-full min-h-screen bg-background text-foreground font-sans">
            <SmoothScroll>
                <div className="flex w-full flex-col bg-background">
                    <HeroSection />
                    <HdmExperienceSection />
                    <StudentsSection />
                    <StudentExperienceSection />
                </div>
            </SmoothScroll>
        </main>
    )
}
