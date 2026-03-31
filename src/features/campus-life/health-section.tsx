"use client"

import { useWellbeing } from "@/hooks/use-campus-life"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"

export function HealthSection() {
  const { health } = useWellbeing()

  return (
    <section id="health" aria-labelledby="health-heading" className="section-container bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
        <SectionIntro
          tag="Health and Safety"
          heading="Your Child&#39;s Safety is Our First Priority."
        />
        <div className="flex items-end">
          <p className="text-sm leading-relaxed max-w-md">
            Our campus is designed to be safe, secure, and supportive at every level. From qualified nursing staff to first-aid-trained teachers, we take every measure to protect the children in our care.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {health.map((fact, i) => (
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
