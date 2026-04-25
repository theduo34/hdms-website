"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function WellbeingQuoteSection() {
  return (
    <section aria-label="Wellbeing philosophy quote" className="section-container bg-white">
      <AnimateInView yOffset={20} duration={0.8}>
        <div
          className="font-black italic leading-none select-none text-secondary/15 mb-0 -mb-8"
          style={{ ...headingStyle, fontSize: "clamp(8rem, 20vw, 16rem)", lineHeight: 0.8 }}
          aria-hidden
        >
          &ldquo;
        </div>

        <blockquote>
          <p
            className="font-black italic text-primary leading-[1.0] tracking-[-0.02em]"
            style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Every child at HDM deserves to be{" "}
            <em className="text-secondary not-italic">seen</em>,{" "}
            <em className="text-secondary not-italic">known</em>, and{" "}
            <em className="text-secondary not-italic">cared for</em> - not just educated.
          </p>

          <footer className="mt-10">
            <p className="text-[0.62rem] tracking-[0.3em] uppercase font-bold">
              The HDM Wellbeing Promise
            </p>
          </footer>
        </blockquote>
      </AnimateInView>
    </section>
  )
}
