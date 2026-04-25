import { AnimateInView } from "@/components/shared/animate-in-view"
import { philosophy } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"

export function OurPhilosophy() {
    return (
        <section id="philosophy" aria-labelledby="philosophy-heading" className="section-half">

            <AnimateInView yOffset={20} duration={1.0} delay={0.08} className="mb-14">
                <div className="relative rounded-2xl bg-primary overflow-hidden px-8 md:px-14 py-14 md:py-18">
                    <div
                        className="absolute -top-6 left-4 select-none pointer-events-none leading-none opacity-[0.06]"
                        style={{ ...headingStyle, fontSize: '18rem', color: 'white' }}
                        aria-hidden
                    >&ldquo;</div>

                    <span className="block w-10 h-[3px] rounded-full bg-secondary mb-8" aria-hidden />

                    <div className="section-tag">
                        <span className="block w-4 h-px bg-secondary/50 shrink-0" aria-hidden />
                        <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-primary-foreground/60">{philosophy.tag}</span>
                    </div>

                    <blockquote className="relative z-10">
                        <p
                            className="font-black italic leading-[1.1] text-primary-foreground tracking-[-0.02em]"
                            style={{ ...headingStyle, fontSize: 'clamp(1.75rem,4.5vw,3.5rem)' }}
                        >
                            &ldquo;{philosophy.pullQuote}&rdquo;
                        </p>
                        <footer className="mt-6 text-[0.62rem] tracking-[0.3em] uppercase text-primary-foreground/45">
                            {philosophy.pullAuthor}
                        </footer>
                    </blockquote>
                </div>
            </AnimateInView>

            <AnimateInView xOffset={-20} yOffset={0} duration={0.9} delay={0.1} className="mb-8">
                <h2 id="philosophy-heading" className="about-heading">
                    We Believe in the <span className="text-secondary">Whole Child.</span>
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={16} duration={0.85} delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                    {philosophy.paragraphs.map((para, i) => (
                        <p key={i} className="text-[1.03rem] leading-[1.85] text-foreground/80">{para}</p>
                    ))}
                </div>
            </AnimateInView>
        </section>
    )
}