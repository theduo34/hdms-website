"use client"

import Image from 'next/image'
import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { useFacilities } from '@/hooks/use-campus-life'

export function LearningSpacesSection() {
  const { learning } = useFacilities()
  const [featured, ...rest] = learning

  return (
    <section id="learning" className="bg-white py-24 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14">
            <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
              Our Campus
            </span>
            <h2
              className="font-black leading-[0.88] text-primary"
              style={{ ...headingStyle, fontSize: 'clamp(3rem, 6.5vw, 5.5rem)' }}
            >
              <em className="italic">Where Learning</em>
              <br />
              <span className="text-foreground/12">Comes Alive.</span>
            </h2>
          </div>
        </AnimateInView>

        {/* Featured space - full width, tall */}
        {featured && (
          <AnimateInView yOffset={30} once>
            <article className="group relative w-full h-[50vh] md:h-[65vh] overflow-hidden rounded-2xl mb-4 cursor-default">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="text-secondary font-bold text-[0.6rem] tracking-[0.3em] uppercase block mb-2">01</span>
                <h3
                  className="text-primary-foreground font-black uppercase"
                  style={{ ...headingStyle, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  {featured.name}
                </h3>
                <p className="text-primary-foreground/55 text-[0.85rem] mt-2 max-w-md leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  {featured.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </article>
          </AnimateInView>
        )}

        {/* Remaining - 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((space, i) => (
            <AnimateInView key={space.name} delay={i * 0.1} yOffset={24} once>
              <article className="group relative h-64 md:h-80 overflow-hidden rounded-2xl cursor-default">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="text-secondary font-bold text-[0.6rem] tracking-[0.3em] uppercase block mb-1.5">
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-primary-foreground font-black text-xl md:text-2xl uppercase"
                    style={headingStyle}
                  >
                    {space.name}
                  </h3>
                  <p className="text-primary-foreground/55 text-[0.82rem] mt-2 max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    {space.description}
                  </p>
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

export function OutdoorSection() {
  const { outdoor } = useFacilities()

  return (
    <section id="outdoor" className="bg-muted py-24 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
                Outdoor &amp; Sports
              </span>
              <h2
                className="font-black leading-[0.88] text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
              >
                <em className="italic">Room to</em>
                <br />
                <span className="text-secondary">Run.</span>
              </h2>
            </div>
            <p className="text-[0.9rem] text-foreground/45 leading-[1.85] max-w-xs md:text-right">
              Open space, fresh air, and the freedom to move - the outdoors is as much a part of our Montessori environment as any classroom.
            </p>
          </div>
        </AnimateInView>

        {/* Two panoramic images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outdoor.map((space, i) => (
            <AnimateInView key={space.name} delay={i * 0.1} yOffset={28} once>
              <article className="group overflow-hidden rounded-2xl bg-white cursor-default">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-colors duration-500" />
                </div>
                <div className="p-7 border-t-2 border-secondary/20 group-hover:border-secondary transition-colors duration-400">
                  <h3
                    className="font-black text-primary mb-2"
                    style={{ ...headingStyle, fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
                  >
                    {space.name}
                  </h3>
                  <p className="text-foreground/45 text-[0.83rem] leading-relaxed">
                    {space.description}
                  </p>
                </div>
              </article>
            </AnimateInView>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Support Facilities - horizontal full-bleed rows (last) ───────
export function SupportSection() {
  const { support } = useFacilities()

  return (
    <section id="support" className="bg-white py-24 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">

        <AnimateInView yOffset={20} once>
          <div className="mb-14">
            <span className="text-[0.62rem] tracking-[0.32em] uppercase font-bold text-secondary block mb-4">
              Support Facilities
            </span>
            <h2
              className="font-black leading-[0.88] text-primary"
              style={{ ...headingStyle, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              <em className="italic">Cared For,</em>
              <br />
              <span className="text-foreground/15">Every Day.</span>
            </h2>
          </div>
        </AnimateInView>

      </div>

      {/* Full-width rows */}
      {support.map((space, i) => (
        <AnimateInView key={space.name} delay={i * 0.1} yOffset={20} once className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image - alternates side */}
            <div className={`relative h-64 md:h-96 overflow-hidden group ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <Image
                src={space.image}
                alt={space.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Text */}
            <div className={`flex flex-col justify-center px-8 py-14 md:px-16 md:py-20 bg-muted ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <span
                className="font-black italic text-primary/[0.05] leading-none block mb-3 select-none"
                style={{ ...headingStyle, fontSize: 'clamp(5rem, 10vw, 9rem)' }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="w-8 h-[3px] bg-secondary mb-5" />
              <h3
                className="font-black text-primary mb-4"
                style={{ ...headingStyle, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
              >
                {space.name}
              </h3>
              <p className="text-[0.87rem] text-foreground/50 leading-relaxed max-w-sm">
                {space.description}
              </p>
            </div>
          </div>
        </AnimateInView>
      ))}

    </section>
  )
}
