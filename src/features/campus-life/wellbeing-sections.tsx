"use client"

import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { useWellbeing } from '@/hooks/use-campus-life'

export function WellbeingQuoteSection() {
  return (
    <section className="py-28 md:py-40 px-4 md:px-16 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimateInView yOffset={30} once>
          <div className="relative">
            <span
              className="absolute -top-8 md:-top-12 -left-4 md:-left-6 font-black text-secondary/15 leading-none select-none pointer-events-none"
              style={{ ...headingStyle, fontSize: 'clamp(10rem, 20vw, 16rem)' }}
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="relative pl-4 md:pl-8">
              <p
                className="font-black italic leading-[1.08] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                Every child deserves to feel{' '}
                <span className="text-secondary not-italic">seen</span>,{' '}
                <span className="text-secondary not-italic">known</span>,
                <br />
                and{' '}
                <span className="text-secondary not-italic">cared for</span>.
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <div className="w-10 h-[2px] bg-secondary shrink-0" />
                <span className="text-foreground/30 text-[0.62rem] tracking-[0.42em] uppercase font-bold">
                  Heaven&apos;s Dew Montessori &nbsp;·&nbsp; Our Wellbeing Commitment
                </span>
              </footer>
            </blockquote>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}

export function PastoralSection() {
  const { pastoral } = useWellbeing()

  return (
    <section id="pastoral" className="bg-muted py-24 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={18} once>
          <div className="mb-14">
            <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
              Pastoral Care
            </span>
            <h2
              className="font-black leading-[0.88] text-primary"
              style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              <em className="italic">Every Child</em>
              <br />
              <span className="text-foreground/15">Seen &amp; Known.</span>
            </h2>
          </div>
        </AnimateInView>

        {/* Full-width rows */}
        {pastoral.map((pillar, i) => (
          <AnimateInView key={pillar.number} delay={i * 0.1} yOffset={18} once>
            <div className="group grid grid-cols-1 md:grid-cols-[6rem_14rem_1fr] gap-4 md:gap-10 border-t border-border/60 py-10 items-start cursor-default hover:bg-white/50 transition-colors duration-300 px-4 -mx-4 rounded-xl">
              <span
                className="font-black italic text-secondary/20 group-hover:text-secondary/40 transition-colors duration-300 leading-none select-none"
                style={{ ...headingStyle, fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
                aria-hidden
              >
                {pillar.number}
              </span>
              <h3
                className="font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight pt-1"
                style={{ ...headingStyle, fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
              >
                {pillar.title}
              </h3>
              <p className="text-[0.87rem] text-foreground/50 leading-[1.85] max-w-xl pt-1">
                {pillar.description}
              </p>
            </div>
          </AnimateInView>
        ))}

      </div>
    </section>
  )
}

export function HealthSection() {
  const { health } = useWellbeing()

  return (
    <section id="health" className="py-24 px-4 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Health &amp; Safety
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                <em className="italic">Your Child&apos;s Safety,</em>
                <br />
                <span className="text-foreground/15">Our Priority.</span>
              </h2>
            </div>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.9]">
              Parents trust us with their most precious people. Trained staff, clear protocols, and immediate communication - always.
            </p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {health.map((fact, i) => (
            <AnimateInView key={fact.label} delay={i * 0.08} yOffset={14} once>
              <div className="group p-8 border border-border/50 rounded-2xl hover:border-secondary/50 hover:bg-secondary/[0.02] transition-all duration-300 cursor-default relative overflow-hidden">
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-l-full scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-center" />
                <span className="text-secondary font-black text-[0.62rem] tracking-[0.35em] uppercase block mb-4">
                  {fact.label}
                </span>
                <p className="text-[0.87rem] text-foreground/55 leading-relaxed">
                  {fact.detail}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>

      </div>
    </section>
  )
}

export function NutritionSection() {
  const { nutrition } = useWellbeing()

  return (
    <section id="nutrition" className="py-24 px-4 md:px-16 bg-muted">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                School Nutrition
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                <em className="italic">Food That</em>
                <br />
                <span className="text-foreground/15">Fuels Futures.</span>
              </h2>
            </div>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.9]">
              Fresh, locally sourced, nutritionist-reviewed. We believe good food is inseparable from good education.
            </p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nutrition.map((fact, i) => (
            <AnimateInView key={fact.label} delay={i * 0.1} yOffset={22} once>
              <div className="group bg-white rounded-2xl p-8 border border-border/40 hover:border-secondary/50 hover:shadow-sm transition-all duration-300 cursor-default">
                <span
                  className="font-black italic text-secondary/20 leading-none block mb-5 select-none"
                  style={{ ...headingStyle, fontSize: '4rem' }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-black text-primary mb-3 group-hover:text-secondary transition-colors duration-300"
                  style={{ ...headingStyle, fontSize: '1.15rem' }}
                >
                  {fact.label}
                </h3>
                <p className="text-[0.84rem] text-foreground/50 leading-relaxed">
                  {fact.description}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>

      </div>
    </section>
  )
}
