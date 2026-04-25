import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"
import type { ProgrammeStats } from "@/features/programmes"

type Props = {
  stats: ProgrammeStats
}

const statKeys: { key: keyof ProgrammeStats; label: string }[] = [
  { key: "ageRange", label: "AGE RANGE" },
  { key: "classes", label: "CLASSES" },
  { key: "hours", label: "SCHOOL HOURS" },
  { key: "perClass", label: "PER CLASS" },
]

export function ProgrammeStatsBar({ stats }: Props) {
  return (
    <section className="py-10 md:py-14 px-4 md:px-8 bg-primary">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {statKeys.map(({ key, label }, i) => (
          <AnimateInView key={key} yOffset={15} delay={i * 0.08}>
            <div className="text-center">
              <p
                className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-secondary"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}
              >
                {stats[key]}
              </p>
              <p className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-primary-foreground/70">
                {label}
              </p>
            </div>
          </AnimateInView>
        ))}
      </div>
    </section>
  )
}
