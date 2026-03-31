"use client"

import { useService } from "@/hooks/use-community"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function InitiativesSection() {
  const { initiatives } = useService()

  return (
    <section aria-labelledby="initiatives-heading" className="section-container bg-muted">
      {/* 2-col intro: heading left, description right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
        <SectionIntro
          tag="Community Initiatives"
          heading="How We Give Back."
        />
        <div className="flex items-end">
          <p className="text-sm leading-relaxed max-w-md">
            From environmental leadership to community outreach, HDM students learn that service is not an activity. It is a way of life.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {initiatives.map((initiative, i) => (
          <AnimateInView key={i} yOffset={20} delay={i * 0.1} duration={0.7}>
            <article className="h-full flex flex-col bg-white rounded-2xl p-8 border border-border/40 hover:border-secondary/50 transition-all duration-300 cursor-default">
              <span className="card-ghost-num" aria-hidden>
                {initiative.number}
              </span>
              <div className="w-8 h-[2px] bg-secondary mb-4" aria-hidden />
              <h3
                className="font-bold text-base uppercase tracking-wide text-primary mb-3"
                style={headingStyle}
              >
                {initiative.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed">
                {initiative.description}
              </p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
