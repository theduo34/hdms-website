"use client"

import Image from "next/image"
import { useSchoolDay } from "@/hooks/use-campus-life"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function WorkCycleSection() {
  const { pillars } = useSchoolDay()

  return (
    <section id="work-cycle" aria-labelledby="work-cycle-heading" className="relative overflow-hidden">
      <div className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
          alt="Montessori classroom"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-primary/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-16">
          <AnimateInView yOffset={20} duration={0.8}>
            <h2
              id="work-cycle-heading"
              className="font-black italic text-primary-foreground leading-[0.95] tracking-[-0.02em]"
              style={{ ...headingStyle, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Three Hours.
              <br />
              Uninterrupted.
            </h2>
          </AnimateInView>
        </div>
      </div>

      <div className="bg-primary px-4 md:px-16 pb-20 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch -mt-16 relative z-10">
          {pillars.map((pillar, i) => (
            <AnimateInView key={i} yOffset={24} delay={i * 0.1} duration={0.7}>
              <article className="h-full flex flex-col border border-white/12 bg-white/6 backdrop-blur-sm rounded-2xl p-8 hover:border-secondary/50 transition-all duration-300 cursor-default">
                <span
                  className="font-black italic leading-none block mb-4 select-none"
                  style={{ ...headingStyle, fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "rgba(var(--color-secondary), 0.25)", opacity: 0.25 }}
                  aria-hidden
                >
                  {pillar.number}
                </span>
                <h3 className="font-bold text-lg text-primary-foreground mb-3">{pillar.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-primary-foreground/60">
                  {pillar.description}
                </p>
              </article>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
