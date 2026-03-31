"use client"

import Image from 'next/image'
import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { useSportsClubs } from '@/hooks/use-campus-life'
import { clubActivities } from '@/features/programmes'

export function SportsSection() {
  const { sports } = useSportsClubs()
  const [hero, ...rest] = sports
  const mid = rest.slice(0, 2)
  const small = rest.slice(2)

  return (
    <section id="sports" className="py-24 px-4 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Sports &amp; PE
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                <em className="italic">Move.</em>
                <br />
                <span className="text-foreground/15">Compete. Grow.</span>
              </h2>
            </div>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.9] md:max-w-sm">
              From the football pitch to the athletics track, sport at HDM builds more than fitness - it builds character, resilience, and joy.
            </p>
          </div>
        </AnimateInView>

        {/* Hero - full width tall */}
        {hero && (
          <AnimateInView yOffset={30} once>
            <article className="group relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-2xl mb-3 cursor-default">
              <Image
                src={hero.image}
                alt={hero.name}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between gap-6">
                <div>
                  <span className="text-secondary font-bold text-[0.6rem] tracking-[0.3em] uppercase block mb-2">
                    Flagship Sport
                  </span>
                  <h3
                    className="text-primary-foreground font-black uppercase"
                    style={{ ...headingStyle, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                  >
                    {hero.name}
                  </h3>
                </div>
                <p className="hidden md:block text-primary-foreground/55 text-[0.85rem] max-w-xs leading-relaxed text-right opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {hero.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </article>
          </AnimateInView>
        )}

        {/* Mid row - 2 equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {mid.map((sport, i) => (
            <AnimateInView key={sport.name} delay={i * 0.08} yOffset={24} once>
              <article className="group relative h-56 md:h-72 overflow-hidden rounded-2xl cursor-default">
                <Image
                  src={sport.image}
                  alt={sport.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-primary-foreground font-black text-xl uppercase" style={headingStyle}>
                    {sport.name}
                  </h3>
                  <p className="text-primary-foreground/55 text-[0.78rem] mt-1 max-w-xs opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                    {sport.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </article>
            </AnimateInView>
          ))}
        </div>

        {/* Small row - 3 compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {small.map((sport, i) => (
            <AnimateInView key={sport.name} delay={i * 0.07} yOffset={18} once>
              <article className="group relative h-40 md:h-48 overflow-hidden rounded-2xl cursor-default">
                <Image
                  src={sport.image}
                  alt={sport.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-primary-foreground font-black text-lg uppercase" style={headingStyle}>
                    {sport.name}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </article>
            </AnimateInView>
          ))}
        </div>

      </div>
    </section>
  )
}

export function ClubsSection() {
  return (
    <section id="clubs" className="bg-muted py-24 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Large heading banner */}
        <AnimateInView yOffset={20} once>
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border pb-10">
            <h2
              className="font-black leading-[0.88] text-primary"
              style={{ ...headingStyle, fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              <em className="italic">After</em>
              <br />
              School.
            </h2>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.85] max-w-sm md:pb-2">
              Every week, our after-school clubs give children the space to discover what they love - beyond the curriculum, beyond the classroom.
            </p>
          </div>
        </AnimateInView>

        {/* Clubs listed as announcement board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {clubActivities.map((category, ci) => (
            <div key={category.title}>
              <AnimateInView delay={ci * 0.08} yOffset={16} once>
                <div className="flex items-baseline justify-between gap-4 mb-1 pt-6 pb-3 border-b border-border">
                  <h3
                    className="font-black text-primary uppercase tracking-wide"
                    style={{ ...headingStyle, fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
                  >
                    {category.title}
                  </h3>
                  <span className="text-foreground/30 text-[0.62rem] tracking-widest uppercase font-bold shrink-0">
                    {category.day}
                  </span>
                </div>
              </AnimateInView>

              {category.clubs.map((club, i) => (
                <AnimateInView key={club.name} delay={ci * 0.06 + i * 0.04} yOffset={8} once>
                  <div className="group flex items-center justify-between gap-4 py-3.5 border-b border-border/40 hover:bg-white/60 transition-colors duration-200 px-2 -mx-2 cursor-default">
                    <span className="text-[0.9rem] font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
                      {club.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/30 group-hover:bg-secondary transition-colors duration-200 shrink-0" />
                  </div>
                </AnimateInView>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
