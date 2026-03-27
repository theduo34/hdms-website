import { SmoothScroll } from "@/components/layout/smooth-scroll"
import { ProgrammesHeroSection } from "@/features/programmes/sections/programmes-hero-section"
import { ProgrammeTabs } from "@/features/programmes/sections/programme-tabs"

export function ProgrammesPage() {
    return (
        <main className="flex items-start justify-start w-full min-h-screen bg-background text-foreground font-sans">
            <SmoothScroll>
                <div className="flex w-full flex-col bg-background">
                    <ProgrammesHeroSection />
                    <ProgrammeTabs />
                </div>
            </SmoothScroll>
        </main>
    )
}
