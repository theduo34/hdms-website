"use client"

import { useParents } from "@/hooks/use-community"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function GetInvolvedSection() {
  const { involvement } = useParents()

  return (
    <section aria-labelledby="get-involved-heading" className="section-container bg-white">
      <SectionIntro
        tag="How to Get Involved"
        heading="Five Ways to Be Part of HDM."
      />

      <div className="mt-12 max-w-2xl">
        <ol>
          {involvement.map((step, i) => (
            <AnimateInView key={i} yOffset={16} delay={i * 0.07} duration={0.6}>
              <li className="flex gap-6 pb-10 last:pb-0 relative">
                {/* Left column: circle + connector line */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm shrink-0 z-10">
                    {step.number}
                  </div>
                  {/* Vertical connector line */}
                  {i < involvement.length - 1 && (
                    <div className="flex-1 w-px bg-border mt-2" aria-hidden />
                  )}
                </div>
                {/* Right column: text */}
                <div className="pb-2 flex-1">
                  <h3
                    className="font-bold text-base text-primary mb-2"
                    style={headingStyle}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            </AnimateInView>
          ))}
        </ol>
      </div>
    </section>
  )
}
