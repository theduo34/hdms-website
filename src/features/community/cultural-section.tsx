"use client"

import { useService } from "@/hooks/use-community"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function CulturalSection() {
  const { cultural } = useService()

  return (
    <section aria-labelledby="cultural-heading" className="section-container bg-white">
      <div className="mb-12">
        <SectionIntro
          tag="Cultural Calendar"
          heading="Celebrating Ghana. Celebrating Africa."
          body="Our cultural calendar honours the heritage, history, and identity of every child in our community. These are not just events - they are lessons in pride, belonging, and identity."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {cultural.map((event, i) => (
          <AnimateInView key={i} yOffset={16} delay={i * 0.1} duration={0.7}>
            <article
              className="h-full flex flex-col border border-border/50 rounded-2xl p-8 hover:border-secondary/40 transition-all duration-300 cursor-default group relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to right, #cf0921, #fcd116, #006b3f)" }}
                aria-hidden
              />
              <span
                className="inline-block self-start px-3 py-1 rounded-full text-[0.6rem] tracking-[0.2em] uppercase font-bold text-secondary mb-4"
                style={{ backgroundColor: "color-mix(in oklch, var(--color-secondary) 10%, transparent)" }}
              >
                {event.date}
              </span>
              <h3
                className="font-bold text-lg text-primary mb-3"
                style={headingStyle}
              >
                {event.name}
              </h3>
              <p className="flex-1 text-sm leading-relaxed">
                {event.description}
              </p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
