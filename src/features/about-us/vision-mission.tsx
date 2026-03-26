import { AnimateInView } from "@/components/shared/animate-in-view"
import { visionMission } from "@/features/about-us/about"
import { headingStyle } from "@/styles/font"

export function VisionMission() {
    return (
        <section id="vision" aria-labelledby="vision-heading" className="section-half">

            <AnimateInView yOffset={10} duration={0.8} delay={0.05} className="mb-12">
                <div className="section-tag">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Vision &amp; Mission</span>
                </div>
                <h2 id="vision-heading" className="about-heading">
                    Guided by <span className="text-secondary">Purpose</span> &amp; Principle.
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={20} duration={0.9} delay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
                <div className="group relative rounded-2xl bg-primary overflow-hidden p-8 min-h-[300px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500">
                    <div
                        className="absolute -bottom-4 -right-4 font-black italic leading-none select-none pointer-events-none opacity-[0.06]"
                        style={{ ...headingStyle, fontSize: '12rem', color: 'white' }}
                        aria-hidden
                    >V</div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[0.62rem] tracking-[0.3em] uppercase text-secondary font-bold">
                                {visionMission.cards[0].title}
                            </span>
                            <div className="w-8 h-8 rounded-full border border-secondary/40 flex items-center justify-center">
                                <span className="text-secondary text-xs">✦</span>
                            </div>
                        </div>
                        <h3
                            className="font-black italic leading-[1.05] text-secondary mb-4"
                            style={{ ...headingStyle, fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}
                        >
                            Leading Montessori<br />excellence in Ghana.
                        </h3>
                    </div>
                    <p className="relative z-10 text-[0.88rem] leading-[1.8] text-primary-foreground/65">
                        {visionMission.cards[0].body}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary/30 group-hover:bg-secondary/70 transition-colors duration-500" aria-hidden />
                </div>

                <div className="group relative rounded-2xl bg-secondary overflow-hidden p-8 min-h-[300px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500">
                    <div
                        className="absolute -bottom-4 -right-4 font-black italic leading-none select-none pointer-events-none opacity-[0.07]"
                        style={{ ...headingStyle, fontSize: '12rem', color: 'var(--hdm-navy-dark)' }}
                        aria-hidden
                    >M</div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[0.62rem] tracking-[0.3em] uppercase text-secondary-foreground/70 font-bold">
                                {visionMission.cards[1].title}
                            </span>
                            <div className="w-8 h-8 rounded-full border border-secondary-foreground/30 flex items-center justify-center">
                                <span className="text-secondary-foreground text-xs">✦</span>
                            </div>
                        </div>
                        <h3
                            className="font-black italic leading-[1.05] text-secondary-foreground mb-4"
                            style={{ ...headingStyle, fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}
                        >
                            Every child seen,<br />valued, and empowered.
                        </h3>
                    </div>
                    <p className="relative z-10 text-[0.88rem] leading-[1.8] text-secondary-foreground/70">
                        {visionMission.cards[1].body}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-foreground/20 group-hover:bg-secondary-foreground/50 transition-colors duration-500" aria-hidden />
                </div>
            </AnimateInView>

            <AnimateInView yOffset={15} duration={0.8} delay={0.2}>
                <div className="flex items-center gap-3 mb-8">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold">{visionMission.valuesLabel}</h3>
                </div>
                <div>
                    {visionMission.values.map((value, i) => (
                        <div key={value.title} className="num-row group">
                            <span className="hidden md:block absolute inset-0 bg-secondary/6 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden />
                            <span className="relative font-serif tracking-[0.06em] text-border group-hover:text-secondary transition-colors duration-300 z-10">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="relative z-10 md:contents">
                                <span
                                    className="block font-black italic leading-none group-hover:tracking-[-0.025em] transition-all duration-300"
                                    style={{ ...headingStyle, fontSize: 'clamp(1.75rem,4vw,3rem)' }}
                                >
                                    {value.title}
                                </span>
                                <span className="block md:hidden leading-relaxed mt-1.5 text-[0.875rem] text-foreground/65">
                                    {value.desc}
                                </span>
                            </div>
                            <span className="hidden md:block relative max-w-xs text-right leading-relaxed opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10 text-[0.875rem] text-foreground/65">
                                {value.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </AnimateInView>
        </section>
    )
}