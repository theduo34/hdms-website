"use client"

import { useParents } from "@/hooks/use-community"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function PartnershipSection() {
  const { pillars } = useParents()

  return (
    <section aria-labelledby="partnership-heading" className="section-container bg-white">
      <AnimateInView yOffset={20} duration={0.8}>
        <h2
          id="partnership-heading"
          className="font-black italic text-primary leading-[0.95] tracking-[-0.02em] mb-14"
          style={{ ...headingStyle, fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Parents are Partners.
        </h2>
      </AnimateInView>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {pillars.map((pillar, i) => (
          <AnimateInView key={i} yOffset={20} delay={i * 0.1} duration={0.7}>
            <article className="h-full flex flex-col bg-white rounded-2xl p-8 border border-border/40 hover:border-secondary/50 transition-all duration-300 cursor-default">
              <span
                className="card-ghost-num"
                aria-hidden
              >
                {pillar.number}
              </span>
              <div className="w-8 h-[2px] bg-secondary mb-4" aria-hidden />
              <h3
                className="font-bold text-lg text-primary mb-3"
                style={headingStyle}
              >
                {pillar.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
