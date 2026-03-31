"use client"

import Image from 'next/image'
import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { useSchoolDay } from '@/hooks/use-campus-life'

// ─── Daily Schedule - vertical dot timeline ────────────────────────
export function DayScheduleSection() {
  const { schedule } = useSchoolDay()

  return (
    <section id="schedule" className="py-24 md:py-32 px-4 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-16">
            <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
              Monday · Friday
            </span>
            <h2
              className="font-black leading-[0.88] text-primary"
              style={{ ...headingStyle, fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
            >
              <em className="italic">The Day,</em>
              <br />
              <span className="text-foreground/12">Hour by Hour.</span>
            </h2>
          </div>
        </AnimateInView>

        {/* Timeline */}
        <div className="relative ml-2">
          {/* Vertical line */}
          <div
            className="absolute left-[6.5rem] md:left-[8.5rem] top-0 bottom-0 w-px bg-border/50"
            aria-hidden
          />

          {schedule.map((item, i) => (
            <AnimateInView key={item.time} delay={i * 0.04} yOffset={8} once>
              <div className="group flex items-start cursor-default">
                {/* Time */}
                <div className="w-24 md:w-32 shrink-0 text-right pr-5 pt-1">
                  <span
                    className="font-black tabular-nums text-foreground/25 group-hover:text-secondary transition-colors duration-300"
                    style={{ ...headingStyle, fontSize: 'clamp(0.78rem, 1.5vw, 0.92rem)' }}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Dot */}
                <div className="shrink-0 w-2.5 h-2.5 rounded-full border-2 border-border/60 group-hover:border-secondary group-hover:bg-secondary bg-white mt-1.5 transition-all duration-300 z-10" />

                {/* Content */}
                <div className="flex-1 pl-6 pb-8">
                  <p
                    className="font-bold text-primary uppercase tracking-wide group-hover:text-secondary transition-colors duration-300 leading-tight"
                    style={{ fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)' }}
                  >
                    {item.label}
                  </p>
                  <p className="text-foreground/35 text-[0.78rem] leading-relaxed mt-1.5 max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Work Cycle - full-bleed classroom image ──────────────────────
export function WorkCycleSection() {
  const { pillars } = useSchoolDay()

  return (
    <section id="work-cycle" className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/20" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-16 pb-16 md:pb-24 pt-40">
        <div className="max-w-6xl mx-auto">

          <AnimateInView yOffset={28} once>
            <span className="text-secondary font-bold text-[0.62rem] tracking-[0.3em] uppercase block mb-5">
              The Montessori Work Cycle
            </span>
            <h2
              className="font-black leading-[0.88] text-primary-foreground mb-14"
              style={{ ...headingStyle, fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              <em className="italic">Three Hours.</em>
              <br />
              <span className="text-secondary">Uninterrupted.</span>
            </h2>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pillars.map((pillar, i) => (
              <AnimateInView key={pillar.number} delay={i * 0.1} yOffset={24} once>
                <div className="group border border-white/10 hover:border-secondary/50 bg-white/5 hover:bg-white/10 backdrop-blur-sm p-7 rounded-2xl transition-all duration-300 cursor-default">
                  <span
                    className="font-black text-secondary/25 group-hover:text-secondary/60 transition-colors duration-300 block mb-5 leading-none"
                    style={{ ...headingStyle, fontSize: '3.5rem' }}
                  >
                    {pillar.number}
                  </span>
                  <h3
                    className="font-bold text-primary-foreground text-[1rem] mb-3"
                    style={headingStyle}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-primary-foreground/45 text-[0.82rem] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Meals - sticky sidebar + scrolling content (last section) ────
export function MealsSection() {
  const { meals } = useSchoolDay()

  return (
    <section id="meals" className="py-24 md:py-32 px-4 md:px-16 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-12 md:gap-24 items-start">

          <AnimateInView yOffset={20} once>
            <div className="md:sticky md:top-28">
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Meals &amp; Nutrition
              </span>
              <h2
                className="font-black leading-[0.9] text-primary mb-6"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                <em className="italic">Good Food,</em>
                <br />
                Every Day.
              </h2>
              <p className="text-[0.88rem] text-foreground/45 leading-[1.9] max-w-xs">
                Fresh, balanced, locally sourced. Because a well-nourished child is a ready-to-learn child.
              </p>
            </div>
          </AnimateInView>

          <div>
            {meals.map((meal, i) => (
              <AnimateInView key={meal.label} delay={i * 0.1} yOffset={18} once>
                <div className="group border-b border-border/60 py-10 cursor-default relative overflow-hidden">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-center" />
                  <span className="text-secondary font-bold text-[0.62rem] tracking-[0.35em] uppercase block mb-3">
                    {meal.time}
                  </span>
                  <h3
                    className="font-black text-primary mb-4 group-hover:text-secondary transition-colors duration-300"
                    style={{ ...headingStyle, fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)' }}
                  >
                    {meal.label}
                  </h3>
                  <p className="text-foreground/45 text-[0.85rem] leading-relaxed max-w-sm">
                    {meal.description}
                  </p>
                </div>
              </AnimateInView>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
