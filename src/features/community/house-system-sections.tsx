"use client"

import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { HouseSystem } from '@/features/about-us/house-system'
import { useHouseSystem } from '@/hooks/use-community'

export function HouseOverviewSection() {
  const { intro } = useHouseSystem()

  const houses = [
    { label: 'Red',    color: '#dc2626' },
    { label: 'Yellow', color: '#eab308' },
    { label: 'Green',  color: '#16a34a' },
    { label: 'Blue',   color: '#2563eb' },
  ]

  return (
    <section id="overview" className="py-28 md:py-36 px-4 md:px-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-6">
            Our Community
          </span>
        </AnimateInView>

        {/* Giant heading */}
        <AnimateInView yOffset={30} once>
          <h2
            className="font-black leading-[0.85] text-primary mb-12"
            style={{ ...headingStyle, fontSize: 'clamp(4rem, 10vw, 9rem)' }}
          >
            <em className="italic block">{intro.headline}</em>
            <span className="text-secondary">{intro.headlineAccent}</span>
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-start">
          <AnimateInView yOffset={16} once>
            <p className="text-[0.92rem] text-foreground/50 leading-[1.9] max-w-xl">
              {intro.description}
            </p>
          </AnimateInView>

          {/* House colour dots */}
          <AnimateInView yOffset={16} once>
            <div className="flex md:flex-col gap-5 md:gap-4">
              {houses.map((h) => (
                <div key={h.label} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: h.color }}
                  />
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-foreground/40">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimateInView>
        </div>

      </div>
    </section>
  )
}

// ─── Interactive House Tabs ────────────────────────────────────────
export function HouseTabsSection() {
  return (
    <section id="houses" className="px-4 md:px-16 pb-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <HouseSystem />
      </div>
    </section>
  )
}

// ─── House Life - editorial full-width rows (last, NOT bg-primary) ─
export function HouseLifeSection() {
  const { activities } = useHouseSystem()

  return (
    <section id="house-life" className="py-24 px-4 md:px-16 bg-muted">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={18} once>
          <div className="mb-14">
            <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
              House Life
            </span>
            <h2
              className="font-black leading-[0.88] text-primary"
              style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              <em className="italic">Compete.</em>{' '}
              Create.{' '}
              <span className="text-secondary">Connect.</span>
            </h2>
          </div>
        </AnimateInView>

        {/* Editorial rows */}
        {activities.map((activity, i) => (
          <AnimateInView key={activity.number} delay={i * 0.08} yOffset={16} once>
            <div className="group grid grid-cols-1 md:grid-cols-[5rem_16rem_1fr] gap-4 md:gap-10 border-t border-border/60 py-10 items-start cursor-default hover:bg-white/60 transition-colors duration-300 px-4 -mx-4 rounded-xl">
              <span
                className="font-black italic text-secondary/20 group-hover:text-secondary/45 transition-colors duration-300 leading-none select-none"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
                aria-hidden
              >
                {activity.number}
              </span>
              <h3
                className="font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight pt-1"
                style={{ ...headingStyle, fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
              >
                {activity.title}
              </h3>
              <p className="text-[0.87rem] text-foreground/50 leading-[1.85] pt-1">
                {activity.description}
              </p>
            </div>
          </AnimateInView>
        ))}

      </div>
    </section>
  )
}
