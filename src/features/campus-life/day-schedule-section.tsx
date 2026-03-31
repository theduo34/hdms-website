"use client"

import { useSchoolDay } from "@/hooks/use-campus-life"
import { SectionIntro } from "@/components/shared/section-intro"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function DayScheduleSection() {
  const { schedule } = useSchoolDay()

  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="section-container bg-white">
      <SectionIntro
        tag="Monday to Friday"
        heading={
          <>
            The Day,{" "}
            <span className="text-primary/30 not-italic">Hour by Hour.</span>
          </>
        }
      />

      <div className="relative mt-14 max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-border" aria-hidden />

        <ol className="space-y-0">
          {schedule.map((item, i) => (
            <AnimateInView key={i} yOffset={16} delay={i * 0.04} duration={0.6}>
              <li className="relative flex gap-6 group pb-8">
                {/* Time column */}
                <div className="w-20 shrink-0 text-right pt-1">
                  <span
                    className="text-[0.65rem] font-bold tracking-widest uppercase text-secondary"
                    style={headingStyle}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Dot on the line */}
                <div className="relative z-10 flex flex-col items-center shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full border-2 border-secondary bg-white group-hover:bg-secondary group-focus:bg-secondary transition-colors duration-200" />
                </div>

                {/* Content */}
                <div className="pb-2 flex-1">
                  <p className="font-bold text-primary text-sm leading-snug mb-1">{item.label}</p>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            </AnimateInView>
          ))}
        </ol>
      </div>
    </section>
  )
}
