import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { AboutSideNav } from "@/features/about-us/about-side-nav";
import { OurStory } from "@/features/about-us/our-story";
import { VisionMission } from "@/features/about-us/vision-mission";
import { WhyMontessori } from "@/features/about-us/why-montessori";
import { OurPhilosophy } from "@/features/about-us/our-philosophy";
import { OurHistory } from "@/features/about-us/our-history";
import { HouseSystem } from "@/features/about-us/house-system";

export function AboutUsPage() {
    return (
        <main className="flex flex-col w-full min-h-screen bg-background pt-30">
            <SmoothScroll>
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] max-w-325 mx-auto px-4 md:px-12 gap-1 items-start">
                    <AboutSideNav />
                    <div className="min-w-0">
                        <OurStory />
                        <VisionMission />
                        <WhyMontessori />
                        <OurPhilosophy />
                        <OurHistory />
                        <HouseSystem />
                    </div>
                </div>
            </SmoothScroll>
        </main>
    )
}