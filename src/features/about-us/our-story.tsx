import Image from 'next/image'
import { story } from './about'
import { headingStyle } from "@/styles/font"
import { AnimateInView } from "@/components/shared/animate-in-view"

export function OurStory() {
    return (
        <section id="story" aria-labelledby="story-heading">

            <AnimateInView xOffset={-20} yOffset={0} duration={0.9} delay={0.1} className="flex flex-col items-start mb-8">
                <h2
                    id="story-heading"
                    className="text-[clamp(2.75rem,6.5vw,4.75rem)] italic leading-[1.05] tracking-[-0.02em]"
                    style={headingStyle}
                >
                    Where It All Began
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={24} duration={0.9} delay={0.15} className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                <div className="space-y-8">
                    {story.paragraphs.map((p, i) => (
                        <p key={i} className="text-[1.05rem] leading-[1.85]">
                            {p}
                        </p>
                    ))}
                </div>

                <div className="relative overflow-hidden aspect-4/5 rounded-sm group">
                    <Image
                        src={story.image}
                        alt="Heaven's Dew Montessori building"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="transition-transform duration-1000 ease-in-out group-hover:scale-[1.05]"
                    />
                </div>
            </AnimateInView>

        </section>
    )
}