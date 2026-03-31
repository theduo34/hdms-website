"use client"

import Image from "next/image"
import { useSportsClubs } from "@/hooks/use-campus-life"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function SportGallerySection() {
  const { sports } = useSportsClubs()

  const hero = sports[0]
  const mid = sports.slice(1, 3)
  const small = sports.slice(3)

  return (
    <section id="sports" aria-labelledby="sports-heading" className="section-container bg-white">
      <SectionIntro
        tag="Sports and Physical Education"
        heading="Active. Competitive. Confident."
      />

      <div className="mt-12 space-y-3">
        {/* Hero sport */}
        {hero && (
          <AnimateInView yOffset={20} duration={0.7}>
            <article className="group relative w-full overflow-hidden rounded-2xl" style={{ height: "55vh", minHeight: "320px" }}>
              <Image
                src={hero.image}
                alt={hero.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              {/* Gold accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3
                  className="font-black italic text-primary-foreground leading-[0.95]"
                  style={{ ...headingStyle, fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  {hero.name}
                </h3>
                {/* Mobile: always visible. Desktop: hover only */}
                <p className="text-primary-foreground/80 text-sm mt-2 max-w-lg leading-relaxed md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                  {hero.description}
                </p>
              </div>
            </article>
          </AnimateInView>
        )}

        {/* Mid row */}
        {mid.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mid.map((sport, i) => (
              <AnimateInView key={i} yOffset={16} delay={i * 0.1} duration={0.7}>
                <article className="group relative w-full h-64 overflow-hidden rounded-2xl">
                  <Image
                    src={sport.image}
                    alt={sport.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-bold text-xl text-primary-foreground">{sport.name}</h3>
                    <p className="text-primary-foreground/80 text-xs mt-1 leading-relaxed md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                      {sport.description}
                    </p>
                  </div>
                </article>
              </AnimateInView>
            ))}
          </div>
        )}

        {/* Small row */}
        {small.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {small.map((sport, i) => (
              <AnimateInView key={i} yOffset={12} delay={i * 0.08} duration={0.6}>
                <article className="group relative w-full h-48 overflow-hidden rounded-2xl">
                  <Image
                    src={sport.image}
                    alt={sport.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-bold text-base text-primary-foreground">{sport.name}</h3>
                    <p className="text-primary-foreground/80 text-xs mt-1 leading-snug md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                      {sport.description}
                    </p>
                  </div>
                </article>
              </AnimateInView>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
