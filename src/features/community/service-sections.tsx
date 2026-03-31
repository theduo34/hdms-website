"use client"

import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { CTAButton } from '@/components/shared/cta-button'
import { useService } from '@/hooks/use-community'

// ─── Philosophy - massive editorial quote, white bg ────────────────
export function ServicePhilosophySection() {
  const { quote } = useService()

  return (
    <section className="py-28 md:py-40 px-4 md:px-16 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimateInView yOffset={30} once>
          <div className="relative">
            <span
              className="absolute -top-8 md:-top-14 -left-4 font-black text-secondary/12 leading-none select-none pointer-events-none"
              style={{ ...headingStyle, fontSize: 'clamp(10rem, 22vw, 18rem)' }}
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="relative pl-4 md:pl-8">
              <p
                className="font-black italic leading-[1.1] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 5vw, 4.2rem)' }}
              >
                {quote}
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <div className="w-10 h-[2px] bg-secondary shrink-0" />
                <span className="text-foreground/30 text-[0.62rem] tracking-[0.42em] uppercase font-bold">
                  Heaven&apos;s Dew Montessori &nbsp;·&nbsp; Service Ethos
                </span>
              </footer>
            </blockquote>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}

// ─── Initiatives - editorial full-width rows ──────────────────────
export function InitiativesSection() {
  const { initiatives } = useService()

  return (
    <section id="initiatives" className="py-24 px-4 md:px-16 bg-muted">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Our Initiatives
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                <em className="italic">Real</em>
                <br />
                <span className="text-foreground/15">Difference.</span>
              </h2>
            </div>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.9]">
              Community service at HDM is year-round, student-led, and grounded in the life of Koforidua and the Eastern Region.
            </p>
          </div>
        </AnimateInView>

        {initiatives.map((item, i) => (
          <AnimateInView key={item.number} delay={i * 0.08} yOffset={16} once>
            <div className="group grid grid-cols-1 md:grid-cols-[5rem_16rem_1fr] gap-4 md:gap-10 border-t border-border/60 py-10 items-start cursor-default hover:bg-white/60 transition-colors duration-300 px-4 -mx-4 rounded-xl">
              <span
                className="font-black italic text-secondary/20 group-hover:text-secondary/45 transition-colors duration-300 leading-none select-none"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
                aria-hidden
              >
                {item.number}
              </span>
              <h3
                className="font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight pt-1 uppercase tracking-wide"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
              >
                {item.title}
              </h3>
              <p className="text-[0.87rem] text-foreground/50 leading-[1.85] pt-1">
                {item.description}
              </p>
            </div>
          </AnimateInView>
        ))}

      </div>
    </section>
  )
}

// ─── Cultural Celebrations - white bg, Ghana-accented cards ───────
export function CulturalSection() {
  const { cultural } = useService()

  return (
    <section id="culture" className="py-24 md:py-28 px-4 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Cultural Celebrations
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                <em className="italic">Proudly</em>
                <br />
                <span className="text-secondary">Ghanaian.</span>
              </h2>
            </div>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.85] max-w-xs md:text-right">
              Our Ghanaian identity is celebrated year-round - through ceremony, performance, and community pride.
            </p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cultural.map((event, i) => (
            <AnimateInView key={event.name} delay={i * 0.1} yOffset={22} once>
              <div className="group border border-border/50 rounded-2xl p-8 md:p-10 hover:border-secondary/40 transition-all duration-300 cursor-default relative overflow-hidden">
                {/* Ghana flag stripe on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3
                    className="font-black text-primary leading-tight"
                    style={{ ...headingStyle, fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
                  >
                    {event.name}
                  </h3>
                  {event.date && (
                    <span className="text-secondary text-[0.62rem] tracking-widest uppercase font-bold shrink-0 pt-0.5 bg-secondary/10 px-3 py-1 rounded-full">
                      {event.date}
                    </span>
                  )}
                </div>
                <p className="text-foreground/50 text-[0.84rem] leading-relaxed">
                  {event.description}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── CTA - bold two-col statement (last section) ──────────────────
export function ServiceCTASection() {
  return (
    <section id="cta" className="py-24 px-4 md:px-16 bg-muted">
      <div className="max-w-6xl mx-auto">
        <AnimateInView yOffset={20} once>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Get Involved
              </span>
              <h2
                className="font-black leading-[0.88] text-primary mb-6"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                <em className="italic">Ready to</em>
                <br />
                <span className="text-foreground/15">Give Back?</span>
              </h2>
              <p className="text-[0.9rem] text-foreground/45 leading-[1.85] max-w-md">
                Whether you are a parent, a local business, or a community organisation - there is a place for you in the HDM story.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href="/contact" className="py-5 px-10">
                Contact Us
              </CTAButton>
              <CTAButton href="/community/parents" className="py-5 px-10 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Join the PTA
              </CTAButton>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
