import { anthemAndPledge } from './about'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { headingStyle } from '@/styles/font'

export function AnthemPledge() {
    const { anthem, pledge } = anthemAndPledge

    return (
        <section id="anthem" aria-labelledby="anthem-heading" className="py-16 md:py-24 border-t border-border">
            <AnimateInView yOffset={20} duration={0.7}>
                <span className="section-tag">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[0.7rem] tracking-[0.28em] uppercase font-bold text-secondary">
                        Anthem & Pledge
                    </span>
                </span>
                <h2
                    id="anthem-heading"
                    className="about-heading text-primary mb-14"
                    style={headingStyle}
                >
                    Words We
                    <br />
                    <span className="text-secondary">Live By.</span>
                </h2>
            </AnimateInView>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                <AnimateInView yOffset={16} delay={0.1} duration={0.7}>
                    <div className="bg-muted rounded-2xl p-8 md:p-10">
                        <div className="flex items-baseline gap-3 mb-8 pb-4 border-b border-border">
                            <h3
                                className="font-black italic text-primary text-xl"
                                style={headingStyle}
                            >
                                {anthem.title}
                            </h3>
                            <span className="text-[0.58rem] tracking-[0.22em] uppercase font-bold text-secondary">
                                {anthem.note}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {anthem.verses.map((verse, vi) => (
                                <div key={vi}>
                                    <span className="text-[0.58rem] tracking-[0.22em] uppercase font-bold text-foreground/30 block mb-3">
                                        Verse {vi + 1}
                                    </span>
                                    <p className="leading-[2] text-sm">
                                        {verse.lines.map((line, li) => (
                                            <span key={li}>
                                                {line}
                                                {li < verse.lines.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimateInView>

                <AnimateInView yOffset={16} delay={0.2} duration={0.7}>
                    <div className="bg-primary rounded-2xl p-8 md:p-10">
                        <div className="flex items-baseline gap-3 mb-8 pb-4 border-b border-white/10">
                            <h3
                                className="font-black italic text-primary-foreground text-xl"
                                style={headingStyle}
                            >
                                {pledge.title}
                            </h3>
                            <span className="text-[0.58rem] tracking-[0.22em] uppercase font-bold text-secondary">
                                {pledge.note}
                            </span>
                        </div>

                        <ol className="space-y-5">
                            {pledge.lines.map((line, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <span
                                        className="shrink-0 font-black italic text-secondary/40 leading-none mt-0.5 select-none"
                                        style={{ ...headingStyle, fontSize: '1.4rem' }}
                                        aria-hidden
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="text-primary-foreground/80 text-sm leading-relaxed">
                                        {line}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </AnimateInView>
            </div>
        </section>
    )
}
