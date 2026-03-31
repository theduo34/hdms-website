"use client"

import Image from "next/image"
import { useFacilities } from "@/hooks/use-campus-life"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"

export function OutdoorSection() {
  const { outdoor } = useFacilities()

  return (
    <section id="outdoor" aria-labelledby="outdoor-heading" className="section-container bg-white">
      <SectionIntro
        tag="Outdoor and Sports Facilities"
        heading="Open Air. Open Minds."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {outdoor.map((space, i) => (
          <AnimateInView key={i} yOffset={20} delay={i * 0.12} duration={0.7}>
            <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-border/40 hover:border-secondary/50 hover:shadow-sm transition-all duration-300 cursor-default group">
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden shrink-0">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Text content */}
              <div className="flex-1 p-8 border-t-2 border-secondary/20 group-hover:border-secondary transition-colors duration-300">
                <h3 className="font-bold text-xl text-primary mb-3">{space.name}</h3>
                <p className="text-sm leading-relaxed">{space.description}</p>
              </div>
            </article>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
