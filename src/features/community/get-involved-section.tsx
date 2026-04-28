"use client"

import { useParents } from "@/hooks/use-community"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { StepCard } from "@/features/community/step-card"
import { headingStyle } from "@/styles/font"

export function GetInvolvedSection() {
  const { involvement } = useParents()

  const top    = involvement.slice(0, 3)
  const bottom = involvement.slice(3)

  return (
    <section aria-labelledby="get-involved-heading" className="section-container bg-white">

      <AnimateInView yOffset={16} duration={0.7}>
        <div className="mb-12 md:mb-16">
          <p className="text-secondary text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            How to Get Involved
          </p>
          <h2
            id="get-involved-heading"
            className="text-primary"
            style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}
          >
            Five Ways to Be Part of HDM.
          </h2>
        </div>
      </AnimateInView>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {top.map((step, i) => (
          <AnimateInView key={i} yOffset={20} delay={i * 0.08} duration={0.65}>
            <StepCard step={step} />
          </AnimateInView>
        ))}
      </div>

      {bottom.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 lg:w-2/3 lg:mx-auto">
          {bottom.map((step, i) => (
            <AnimateInView key={i} yOffset={20} delay={(top.length + i) * 0.08} duration={0.65}>
              <StepCard step={step} />
            </AnimateInView>
          ))}
        </div>
      )}
    </section>
  )
}
