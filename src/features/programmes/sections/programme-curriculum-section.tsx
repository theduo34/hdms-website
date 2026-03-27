import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"
import type { CurriculumItem } from "@/features/programmes"

type Props = {
  curriculum: CurriculumItem[]
}

export function ProgrammeCurriculumSection({ curriculum }: Props) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <AnimateInView yOffset={20}>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-8 h-[2px] rounded-full"
              style={{ background: "var(--hdm-yellow)" }}
            />
            <span
              className="text-[10px] tracking-[0.3em] font-bold"
              style={{ color: "var(--hdm-yellow)" }}
            >
              CURRICULUM
            </span>
          </div>
        </AnimateInView>

        <AnimateInView yOffset={20} delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-12 text-foreground"
            style={headingStyle}
          >
            What Your Child{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--hdm-yellow-dark)",
              }}
            >
              Will Explore
            </span>
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {curriculum.map((item, i) => (
            <AnimateInView key={item.title} yOffset={15} delay={i * 0.06}>
              <div className="py-4 border-t border-border">
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
