import { headingStyle } from '@/styles/font'
import { applicationSteps } from './admissions'

export default function HowToApply() {
    return (
        <section id="how-to-apply" className="">
            <span className="flex items-center gap-3 mb-5 text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-secondary before:content-[''] before:block before:w-6 before:h-px before:bg-secondary before:shrink-0">
                How to Apply
            </span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                A Simple <strong className="font-semibold italic">Four-Step Process</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-8">
                We&apos;ve made the admissions process as straightforward and stress-free as
                possible. Here&apos;s everything you need to know to get started.
            </p>

            <div className="flex flex-col relative before:content-[''] before:absolute before:left-7 before:top-8 before:bottom-8 before:w-px before:bg-secondary/25 before:z-0">
                {applicationSteps.map((step) => (
                    <div key={step.stepNum} className="group grid grid-cols-[3.5rem_1fr] gap-6 py-8 relative">
                        <div className="w-14 h-14 bg-background border border-border flex items-center justify-center text-xl font-semibold shrink-0 relative z-10 transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-secondary">
                            {step.stepNum}
                        </div>
                        <div className="pt-[0.4rem]">
                            <span className="block text-xl font-semibold text-primary mb-2" style={headingStyle}>
                                {step.title}
                            </span>
                            <p className="text-[0.88rem] font-light leading-[1.75]">
                                {step.desc}
                            </p>
                            <span className="inline-block mt-3 text-[0.68rem] tracking-wider uppercase text-secondary bg-secondary/10 px-3 py-1">
                                {step.note}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
