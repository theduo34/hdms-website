"use client"

import { clubActivities } from "@/features/programmes"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function ClubsSection() {
  return (
    <section id="clubs" aria-labelledby="clubs-heading" className="section-container bg-muted">
      <AnimateInView yOffset={20} duration={0.7}>
        <h2
          id="clubs-heading"
          className="font-black italic text-primary leading-[0.95] tracking-[-0.02em] mb-14"
          style={{ ...headingStyle, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          After School.
        </h2>
      </AnimateInView>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {clubActivities.map((category, ci) => (
          <AnimateInView key={ci} yOffset={16} delay={ci * 0.1} duration={0.7}>
            <div>
              <div className="flex items-baseline gap-3 mb-6 border-b-2 border-secondary pb-3">
                <h3 className="font-black italic text-xl text-primary" style={headingStyle}>
                  {category.title}
                </h3>
                <span className="text-[0.62rem] tracking-[0.28em] uppercase font-bold text-secondary">
                  {category.day}
                </span>
              </div>
              <ul>
                {category.clubs.map((club, i) => (
                  <li
                    key={i}
                    className="group py-5 border-b border-border last:border-b-0 cursor-default"
                  >
                    <p className="font-bold text-sm group-hover:text-secondary transition-colors duration-200 mb-1">
                      {club.name}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {club.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
