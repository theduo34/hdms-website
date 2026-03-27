import { AnimateInView } from "@/components/shared/animate-in-view"
import { headingStyle } from "@/styles/font"

export function ProgrammesHeroSection() {
  return (
    <section
      className="relative overflow-hidden py-28 md:py-28 lg:py-36 px-4 md:px-8"
      style={{ background: "var(--hdm-green-dark)" }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] leading-none opacity-[0.07] tracking-tight translate-x-[5%] translate-y-[10%]"
          style={{
            ...headingStyle,
            fontWeight: 900,
            fontStyle: "italic",
            color: "var(--hdm-white)",
          }}
        >
          Programmes
        </span>
      </div>

      <div className="relative z-10 max-w-3xl ml-0 md:ml-[8%]">
        <AnimateInView yOffset={20}>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-8 h-0.5 rounded-full"
              style={{ background: "var(--hdm-yellow)" }}
            />
            <span
              className="text-[10px] tracking-[0.3em] font-bold"
              style={{ color: "var(--hdm-yellow)" }}
            >
              OUR PROGRAMMES
            </span>
          </div>
        </AnimateInView>

        <AnimateInView yOffset={30} delay={0.1}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6"
            style={{ color: "var(--hdm-white)" }}
          >
            Learning At{" "}
            <br />
            <span
              style={{
                ...headingStyle,
                fontStyle: "italic",
                color: "var(--hdm-yellow)",
              }}
            >
              Every Stage
            </span>
          </h1>
        </AnimateInView>

        <AnimateInView yOffset={20} delay={0.2}>
          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl opacity-80"
            style={{ color: "var(--hdm-cream)" }}
          >
            From our youngest Little Angels to our Upper Primary leaders, every
            programme at HDM is designed around the child — nurturing independence,
            curiosity, and a genuine love of learning.
          </p>
        </AnimateInView>
      </div>
    </section>
  )
}
