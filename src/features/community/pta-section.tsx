"use client"

import { useParents } from "@/hooks/use-community"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function PTASection() {
  const { pta } = useParents()

  return (
    <section aria-labelledby="pta-heading" className="section-container bg-muted">

      {/* Editorial header — heading left, intro paragraph right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-16">
        <AnimateInView yOffset={16} duration={0.7}>
          <div className="flex flex-col gap-3">
            <p className="text-secondary text-xs uppercase tracking-[0.2em] font-semibold">
              Parent-Teacher Association
            </p>
            <h2
              id="pta-heading"
              className="text-primary"
              style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}
            >
              The PTA at HDM.
            </h2>
          </div>
        </AnimateInView>

        <AnimateInView yOffset={16} delay={0.1} duration={0.7} className="flex items-end">
          <p className="text-foreground/60 text-sm leading-relaxed max-w-md">
            The PTA is the formal voice of our parent community. Every HDM parent is
            automatically a member, and active participation shapes the life of the school.
          </p>
        </AnimateInView>
      </div>

      {/* 4 fact cards — 2×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pta.map((fact, i) => (
          <AnimateInView key={i} yOffset={16} delay={i * 0.07} duration={0.6}>
            <article className="h-full flex flex-col bg-white rounded-2xl p-7 border-l-4 border-secondary hover:shadow-md transition-shadow duration-300 cursor-default">
              <span
                className="text-secondary text-[10px] uppercase tracking-[0.2em] font-bold mb-4 block"
              >
                {fact.label}
              </span>
              <p className="text-foreground/70 text-sm leading-relaxed flex-1">
                {fact.detail}
              </p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
