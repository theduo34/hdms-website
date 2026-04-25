"use client"

import { useParents } from "@/hooks/use-community"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"

export function PTASection() {
  const { pta } = useParents()

  return (
    <section aria-labelledby="pta-heading" className="section-container bg-muted">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
        <SectionIntro
          tag="Parent-Teacher Association"
          heading="The PTA at HDM."
        />
        <div className="flex items-end">
          <p className="text-sm leading-relaxed max-w-md">
            The PTA is the formal voice of our parent community. Every HDM parent is automatically a member, and active participation shapes the life of the school.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {pta.map((fact, i) => (
          <AnimateInView key={i} yOffset={16} delay={i * 0.08} duration={0.6}>
            <article className="h-full flex flex-col bg-white rounded-2xl p-8 border border-border/40 hover:border-secondary/50 transition-all duration-300 cursor-default group relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-r-full" aria-hidden />
              <span className="section-label">{fact.label}</span>
              <p className="flex-1 text-sm leading-relaxed">
                {fact.detail}
              </p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
