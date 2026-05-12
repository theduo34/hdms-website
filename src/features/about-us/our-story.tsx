import Image from 'next/image'
import { story } from './about'
import { headingStyle } from "@/styles/font"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { HDMLetters } from '@/components/shared/hdm-letters'

export function OurStory() {
    return (
        <section id="story" aria-labelledby="story-heading" className="section-half relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden opacity-[0.035]">
                <HDMLetters variant="edge-right" size="2xl" filled color="var(--color-primary)" animate={false} />
            </div>

            <AnimateInView yOffset={10} duration={0.8} delay={0.05} className="mb-10">
                <div className="section-tag">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Our Story</span>
                </div>
            </AnimateInView>

            <AnimateInView xOffset={-20} yOffset={0} duration={0.9} delay={0.1} className="mb-12 relative z-10">
                <h2 id="story-heading" className="about-heading">
                    Where It All <span className="text-secondary">Began.</span>
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={20} duration={0.9} delay={0.15} className="relative z-10 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                <div className="space-y-6">
                    {story.paragraphs.map((p, i) => (
                        <p key={i} className="text-[1.03rem] leading-[1.85] text-foreground/80">{p}</p>
                    ))}
                    <div className="inline-flex items-center justify-center gap-5 rounded-xl px-6 py-5 bg-primary w-full">
                        <span className="text-[3.25rem] font-black italic leading-none text-secondary" style={headingStyle}>
                            2017
                        </span>
                        <div className="border-l border-white/20 pl-5 space-y-0.5">
                            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-primary-foreground/50">Founded</p>
                            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-primary-foreground/50">Koforidua, Ghana</p>
                            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-primary-foreground/50">Eastern Region</p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden aspect-4/5 rounded-2xl group">
                    <Image
                        src={story.image}
                        alt="Heaven's Dew Montessori campus, Koforidua"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="transition-transform duration-1200 ease-in-out group-hover:scale-[1.05]"
                        priority
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 px-5 py-4"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
                    >
                        <p className="text-[0.6rem] tracking-[0.22em] uppercase text-white/60">{story.imageCaption}</p>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary opacity-90" aria-hidden />
                </div>
            </AnimateInView>
        </section>
    )
}