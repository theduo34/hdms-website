import {SmoothScroll} from "@/components/layout/smooth-scroll";
import {HeroSection} from "@/features/home/hero-section";


export function HomePage ()  {
  return(
    <main className="flex items-start justify-start w-full min-h-screen bg-background text-foreground font-sans">
      <SmoothScroll>
        <div className="flex w-full flex-col bg-background">
         <HeroSection />

        </div>
      </SmoothScroll>
    </main>
  )
}
