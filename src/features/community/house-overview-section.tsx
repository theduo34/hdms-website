"use client"

import { useHouseSystem } from "@/hooks/use-community"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

const houseDots = [
  { name: "Phoenix House", color: "#c0392b" },
  { name: "Nile House", color: "#2980b9" },
  { name: "Savanna House", color: "#27ae60" },
  { name: "Sahara House", color: "#f39c12" },
]

export function HouseOverviewSection() {
  const { intro } = useHouseSystem()

  return (
    <section aria-labelledby="house-overview-heading" className="section-container bg-white">
      <AnimateInView yOffset={20} duration={0.8}>
        <h2
          id="house-overview-heading"
          className="font-black italic text-primary leading-[0.95] tracking-[-0.02em] mb-12"
          style={{ ...headingStyle, fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          {intro.headline}
          <br />
          <span className="text-secondary">{intro.headlineAccent}</span>
        </h2>
      </AnimateInView>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* Description */}
        <AnimateInView yOffset={16} delay={0.1} duration={0.7}>
          <p className="leading-relaxed text-base max-w-lg">
            {intro.description}
          </p>
        </AnimateInView>

        {/* House colour dots */}
        <AnimateInView yOffset={16} delay={0.2} duration={0.7}>
          <div className="grid grid-cols-2 gap-6">
            {houseDots.map((house) => (
              <div key={house.name} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full shrink-0"
                  style={{ backgroundColor: house.color }}
                  aria-hidden
                />
                <span className="font-bold text-sm text-primary">{house.name}</span>
              </div>
            ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
