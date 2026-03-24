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
      className="relative overflow-hidden py-20 md:py-28 px-4 md:px-8"
      style={{ background: "var(--hdm-green-dark)" }}
    >
      {/* HDM Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <HDMLetters
          variant="centered"
          size="2xl"
          filled={false}
          strokeColor="var(--hdm-green-light)"
          animate={false}
          className="opacity-[0.05]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <AnimateInView yOffset={20}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-4"
              style={{ color: "var(--hdm-white)" }}
            >
              Ready to Give Your Child the
              <br />
              <span
                style={{
                  ...headingStyle,
                  fontStyle: "italic",
                  color: "var(--hdm-yellow)",
                }}
              >
                Perfect Start?
              </span>
            </h2>
          </AnimateInView>

          <AnimateInView yOffset={15} delay={0.1}>
            <p
              className="text-sm sm:text-base opacity-70"
              style={{ color: "var(--hdm-cream)" }}
            >
              Admissions open for the 2025/2026 academic year. Limited spaces available.
            </p>
          </AnimateInView>
        </div>

        <AnimateInView yOffset={15} delay={0.2}>
          <CTAButton
            href={programme.ctaHref}
            className="border-[var(--hdm-yellow)] text-[var(--hdm-yellow)] hover:bg-[var(--hdm-yellow)] hover:text-[var(--hdm-green-dark)] whitespace-nowrap"
          >
            {programme.ctaLabel}
          </CTAButton>
        </AnimateInView>
      </div>
    </section>
  )
}
