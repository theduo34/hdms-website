import { AnimateInView } from "@/components/shared/animate-in-view"
import { HDMLetters } from "@/components/shared/hdm-letters"
import { CTAButton } from "@/components/shared/cta-button"
import { headingStyle } from "@/styles/font"
import type { Programme } from "@/features/programmes"

type Props = {
  programme: Programme
}

export function ProgrammeCtaSection({ programme }: Props) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 px-4 md:px-8 bg-secondary"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <HDMLetters
          variant="centered"
          size="2xl"
          filled={false}
          strokeColor="var(--color-secondary-foreground)"
          animate={false}
          className="opacity-[0.05]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <AnimateInView yOffset={20}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-4 text-primary-foreground italic"
            >
              Ready to Give Your Child the
              <br />
              <span style={{ ...headingStyle, fontStyle: "italic" }} className="text-primary">
                Perfect Start?
              </span>
            </h2>
          </AnimateInView>

          <AnimateInView yOffset={15} delay={0.1}>
            <p className="text-sm sm:text-base opacity-70 text-primary">
              Admissions open for the 2025/2026 academic year. Limited spaces available.
            </p>
          </AnimateInView>
        </div>

        <AnimateInView yOffset={15} delay={0.2}>
          <CTAButton
            href={programme.ctaHref}
            className="border-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/80 whitespace-nowrap transition-transform duration-300 ease-in-out hover:scale-105"
          >
            {programme.ctaLabel}
          </CTAButton>
        </AnimateInView>
      </div>
    </section>
  )
}
