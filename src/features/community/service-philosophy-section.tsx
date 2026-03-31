"use client"

import { useService } from "@/hooks/use-community"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function ServicePhilosophySection() {
  const { quote } = useService()

  return (
    <section aria-label="Service philosophy quote" className="section-container bg-white">
      <AnimateInView yOffset={20} duration={0.8}>
        <div
          className="font-black italic leading-none select-none text-secondary/12 -mb-8"
          style={{ ...headingStyle, fontSize: "clamp(8rem, 20vw, 16rem)", lineHeight: 0.8 }}
          aria-hidden
        >
          &ldquo;
        </div>

        <blockquote>
          <p
            className="font-black italic text-primary leading-[1.0] tracking-[-0.02em]"
            style={{ ...headingStyle, fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
          >
            {quote}
          </p>

          <footer className="mt-10">
            <p className="text-[0.62rem] tracking-[0.3em] uppercase font-bold">
              HDM Service and Outreach Philosophy
            </p>
          </footer>
        </blockquote>
      </AnimateInView>
    </section>
  )
}
