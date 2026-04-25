import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"
import type { ClassInfo } from "@/features/programmes"

type Props = {
  classes: ClassInfo[]
}

export function ProgrammeClassesSection({ classes }: Props) {
  if (classes.length === 0) return null

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <AnimateInView yOffset={20}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] rounded-full bg-secondary" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-secondary">
              CLASS STRUCTURE
            </span>
          </div>
        </AnimateInView>

        <AnimateInView yOffset={20} delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-12 text-foreground"
            style={headingStyle}
          >
            Our Class{" "}
            <span style={{ fontStyle: "italic" }} className="text-secondary-foreground">
              Structure
            </span>
          </h2>
        </AnimateInView>

        <div className="space-y-0">
          {classes.map((cls, i) => (
            <AnimateInView key={cls.name} yOffset={10} delay={i * 0.05}>
              <div className="flex items-center justify-between py-5 border-b border-border">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {cls.name}
                  </h3>
                  {cls.gemName && (
                    <span className="text-sm text-muted-foreground">
                      ({cls.gemName})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {cls.sectionCount && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full border border-primary text-primary">
                      {cls.sectionCount} Sections
                    </span>
                  )}
                  {cls.sections && (
                    <div className="hidden sm:flex items-center gap-2">
                      {cls.sections.map((section) => (
                        <span
                          key={section}
                          className="text-[10px] tracking-wider font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
