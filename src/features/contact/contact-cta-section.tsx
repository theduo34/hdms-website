import Link from 'next/link'
import { ArrowRight, ClipboardList, MapPin, BookOpen } from 'lucide-react'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { headingStyle } from '@/styles/font'
import { quickLinks } from './contact'

const QUICK_LINK_ICONS = [ClipboardList, MapPin, BookOpen]

export function ContactCtaSection() {
    return (
        <section aria-labelledby="contact-links-heading" className="section-container bg-muted/30">
            <AnimateInView yOffset={10} duration={0.7} className="mb-12">
                <div className="section-tag">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">
                        Explore Further
                    </span>
                </div>
                <h2
                    id="contact-links-heading"
                    className="about-heading max-w-lg"
                >
                    Where would you like{' '}
                    <span className="text-secondary">to go next?</span>
                </h2>
            </AnimateInView>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickLinks.map((link, i) => {
                    const Icon = QUICK_LINK_ICONS[i]
                    return (
                        <AnimateInView key={i} yOffset={20} duration={0.7} delay={i * 0.1}>
                            <Link
                                href={link.href}
                                className="group flex flex-col gap-4 bg-background rounded-2xl border border-border/50 p-7 md:p-8 hover:border-secondary/50 hover:shadow-sm transition-all duration-300 h-full"
                            >
                                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                                    <Icon className="w-5 h-5 text-secondary" aria-hidden />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-foreground/40 mb-2">
                                        {`0${i + 1}`}
                                    </p>
                                    <h3
                                        className="text-lg font-black italic text-primary leading-tight mb-2"
                                        style={headingStyle}
                                    >
                                        {link.label}
                                    </h3>
                                    <p className="text-[0.85rem] text-foreground/60 leading-relaxed">
                                        {link.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-secondary">
                                        Go there
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </Link>
                        </AnimateInView>
                    )
                })}
            </div>
        </section>
    )
}
