"use client"

import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { CTAButton } from '@/components/shared/cta-button'
import { useParents } from '@/hooks/use-community'
import { parentVoices } from '@/features/home'
import { ParentVoiceCard } from '@/features/home/cards/parent-voice-card'

export function PartnershipSection() {
  const { pillars } = useParents()

  return (
    <section id="partnership" className="py-28 md:py-36 px-4 md:px-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-6">
            Our Community
          </span>
        </AnimateInView>

        <AnimateInView yOffset={30} once>
          <h2
            className="font-black leading-[0.85] text-primary mb-14"
            style={{ ...headingStyle, fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
          >
            <em className="italic block">Parents</em>
            <span className="text-foreground/12">are Partners.</span>
          </h2>
        </AnimateInView>

        {/* Full-width pillar rows */}
        {pillars.map((pillar, i) => (
          <AnimateInView key={pillar.number} delay={i * 0.1} yOffset={16} once>
            <div className="group grid grid-cols-1 md:grid-cols-[5rem_16rem_1fr] gap-4 md:gap-10 border-t border-border/60 py-10 items-start cursor-default hover:bg-muted/50 transition-colors duration-300 px-4 -mx-4 rounded-xl">
              <span
                className="font-black italic text-secondary/20 group-hover:text-secondary/45 transition-colors duration-300 leading-none select-none"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
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
              <p className="text-[0.87rem] text-foreground/50 leading-[1.85] pt-1">
                {pillar.description}
              </p>
            </div>
          </AnimateInView>
        ))}

      </div>
    </section>
  )
}

export function PTASection() {
  const { pta } = useParents()

  return (
    <section id="pta" className="py-24 px-4 md:px-16 bg-muted">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Parent-Teacher Association
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                The{' '}
                <em className="italic text-secondary">HDM PTA.</em>
              </h2>
            </div>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.9]">
              The formal bridge between our families and staff - a space for shared decisions, shared events, and a shared commitment to making HDM the best it can be.
            </p>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pta.map((fact, i) => (
            <AnimateInView key={fact.label} delay={i * 0.08} yOffset={14} once>
              <div className="group bg-white rounded-2xl p-8 border border-border/40 hover:border-secondary/50 transition-all duration-300 cursor-default relative overflow-hidden">
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-l-full scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-center" />
                <span className="text-secondary font-black text-[0.62rem] tracking-[0.35em] uppercase block mb-3">
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

export function GetInvolvedSection() {
  const { involvement } = useParents()

  return (
    <section id="get-involved" className="py-24 px-4 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={18} once>
          <div className="mb-14">
            <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
              Get Involved
            </span>
            <h2
              className="font-black leading-[0.88] text-primary"
              style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              <em className="italic">Five Ways</em>
              <br />
              <span className="text-foreground/15">to Be Part of It.</span>
            </h2>
          </div>
        </AnimateInView>

        {involvement.map((way, i) => (
          <AnimateInView key={way.number} delay={i * 0.07} yOffset={14} once>
            <div className="group grid grid-cols-1 md:grid-cols-[5rem_16rem_1fr] gap-4 md:gap-10 border-t border-border/60 py-10 items-start cursor-default hover:bg-muted/50 transition-colors duration-300 px-4 -mx-4 rounded-xl">
              <span
                className="font-black italic text-secondary/20 group-hover:text-secondary/45 transition-colors duration-300 leading-none select-none"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
                aria-hidden
              >
                {way.number}
              </span>
              <h3
                className="font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight pt-1 uppercase tracking-wide"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
              >
                {way.title}
              </h3>
              <p className="text-[0.87rem] text-foreground/50 leading-[1.85] pt-1">
                {way.description}
              </p>
            </div>
          </AnimateInView>
        ))}

      </div>
    </section>
  )
}

export function ParentVoicesShowcase() {
  const featured = parentVoices.slice(0, 3)

  return (
    <section id="voices" className="py-24 md:py-28 px-4 md:px-16 bg-muted">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Parent Voices
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                <em className="italic">What Our</em>
                <br />
                <span className="text-foreground/15">Families Say.</span>
              </h2>
            </div>
            <CTAButton href="/admissions/apply" className="self-start md:self-end py-4 px-8">
              Join Our Community
            </CTAButton>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {featured.map((voice, i) => (
            <ParentVoiceCard key={voice.name} voice={voice} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
