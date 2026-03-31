"use client"

import { useSchoolDay } from "@/hooks/use-campus-life"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function MealsSection() {
  const { meals } = useSchoolDay()

  return (
    <section id="meals" aria-labelledby="meals-heading" className="bg-muted">
      <div className="px-4 md:px-16 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <div className="md:sticky md:top-28 md:self-start">
          <AnimateInView yOffset={20} duration={0.7}>
            <span className="section-label">Nutrition at HDM</span>
            <h2
              id="meals-heading"
              className="font-black italic text-primary leading-[0.95] tracking-[-0.02em] mb-6"
              style={{ ...headingStyle, fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Good Food,
              <br />
              Every Day.
            </h2>
            <p className="leading-relaxed text-sm max-w-sm">
              Every meal served at Heaven&#39;s Dew is freshly prepared on campus. We believe good nutrition is the foundation of a productive and happy school day.
            </p>
          </AnimateInView>
        </div>

        <div>
          <ol>
            {meals.map((meal, i) => (
              <AnimateInView key={i} yOffset={16} delay={i * 0.08} duration={0.6}>
                <li className="group relative py-8 border-b border-border last:border-b-0 hover:pl-3 transition-all duration-300">
                  <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-full" aria-hidden />
                  <span className="text-[0.62rem] tracking-[0.28em] uppercase font-bold text-secondary block mb-2">
                    {meal.time}
                  </span>
                  <h3 className="font-bold text-xl text-primary mb-2">{meal.label}</h3>
                  <p className="text-sm leading-relaxed">{meal.description}</p>
                </li>
              </AnimateInView>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
