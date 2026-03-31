"use client"

import { AnimateInView } from "@/components/shared/animate-in-view"
import { CTAButton } from "@/components/shared/cta-button"
import { headingStyle } from "@/styles/font"

export function ServiceCTASection() {
  return (
    <section aria-label="Service and community call to action" className="section-container bg-muted">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <AnimateInView yOffset={20} duration={0.7}>
          <h2
            className="font-black italic text-primary leading-[0.95] tracking-[-0.02em] mb-6"
            style={{ ...headingStyle, fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Be Part of the HDM Community.
          </h2>
          <p className="text-sm leading-relaxed max-w-md">
            Whether you are a prospective family, a current parent, or someone who shares our values, there is a place for you at Heaven&#39;s Dew Montessori.
          </p>
        </AnimateInView>

        <AnimateInView yOffset={16} delay={0.15} duration={0.6}>
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
            <CTAButton href="/admissions" variant="primary">
              Contact Us
            </CTAButton>
            <CTAButton
              href="/community/parents"
              variant="primary"
              className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground"
            >
              Join the PTA
            </CTAButton>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
