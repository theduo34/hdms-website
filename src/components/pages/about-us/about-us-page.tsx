import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PageHeader } from "@/components/shared/page-header";
import { AboutSideNav } from "@/features/about-us/about-side-nav";
import { OurStory } from "@/features/about-us/our-story";
import { VisionMission } from "@/features/about-us/vision-mission";
import { WhyMontessori } from "@/features/about-us/why-montessori";
import { OurPhilosophy } from "@/features/about-us/our-philosophy";
import { OurHistory } from "@/features/about-us/our-history";
import { HouseSystem } from "@/features/about-us/house-system";
import { AnthemPledge } from "@/features/about-us/anthem-pledge";

export function AboutUsPage() {
    return (
        <main className="flex flex-col w-full min-h-screen bg-background">
            <PageHeader
                iconName="info"
                label="About Us"
                headingLine1="Who We"
                headingLine2="Are."
                watermark="About"
                description="Heaven's Dew Montessori is a nurturing learning community in Koforidua, Ghana, dedicated to raising independent, curious, and confident children through the Montessori philosophy."
            />
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
                        <AnthemPledge />
                    </div>
                </div>
            </SmoothScroll>
        </main>
    )
}
