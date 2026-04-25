import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"
import { clubActivities } from "@/features/programmes"
import { Check } from "lucide-react"

export function ProgrammeClubsSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <AnimateInView yOffset={20}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] rounded-full bg-secondary" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-secondary">
              CLUB ACTIVITIES
            </span>
          </div>
        </AnimateInView>

        <AnimateInView yOffset={20} delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-12 text-foreground"
            style={headingStyle}
          >
            Club{" "}
            <span style={{ fontStyle: "italic" }} className="text-secondary-foreground">
              Activities
            </span>
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clubActivities.map((category, catIndex) => (
            <AnimateInView key={category.title} yOffset={20} delay={catIndex * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                    {category.day}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-black text-foreground"
                    style={headingStyle}
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.clubs.map((club) => (
                    <div key={club.name} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
                      <div>
                        <p className="text-sm sm:text-base font-bold text-foreground">
                          {club.name}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {club.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
