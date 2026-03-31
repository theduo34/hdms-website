"use client"

import { useWellbeing } from "@/hooks/use-campus-life"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function NutritionSection() {
  const { nutrition } = useWellbeing()

  return (
    <section id="nutrition" aria-labelledby="nutrition-heading" className="section-container bg-muted">
      <SectionIntro
        tag="Nutrition Programme"
        heading="Fuelling Young Minds."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mt-12">
        {nutrition.map((fact, i) => (
          <AnimateInView key={i} yOffset={20} delay={i * 0.1} duration={0.7}>
            <article className="h-full flex flex-col bg-white rounded-2xl p-8 border border-border/40 hover:border-secondary/50 transition-all duration-300 cursor-default">
              {/* Ghost number watermark */}
              <span
                className="card-ghost-num"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-[2px] bg-secondary mb-4" aria-hidden />
              <h3
                className="font-bold text-lg text-primary mb-3"
                style={headingStyle}
              >
                {fact.label}
              </h3>
              <p className="flex-1 text-sm leading-relaxed">
                {fact.description}
              </p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
