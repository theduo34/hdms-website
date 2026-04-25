import Image from "next/image"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"
import type { Programme } from "@/features/programmes"

type Props = {
  programme: Programme
}

export function ProgrammeDetailSection({ programme }: Props) {
  return (
    <section className="section relative overflow-hidden bg-background">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
        {/* Text */}
        <div className="md:col-span-2 flex flex-col gap-6 md:pl-[16%]">
          <AnimateInView yOffset={20}>
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] rounded-full bg-secondary" />
              <span className="text-[10px] tracking-[0.3em] font-bold text-secondary">
                {programme.sectionLabel}
              </span>
            </div>
          </AnimateInView>

          <AnimateInView yOffset={20} delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] text-foreground whitespace-pre-line"
              style={headingStyle}
            >
              {programme.heading}
            </h2>
          </AnimateInView>

          <AnimateInView yOffset={20} delay={0.2}>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {programme.description}
            </p>
          </AnimateInView>
        </div>

        {/* Image */}
        <div className="md:col-span-3">
          <AnimateInView yOffset={30} delay={0.15}>
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-muted rounded-lg overflow-hidden">
              <Image
                src={programme.image}
                alt={programme.tabLabel}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                unoptimized
              />
              {/* Fallback placeholder overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                <svg
                  className="w-16 h-16 text-muted-foreground/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
