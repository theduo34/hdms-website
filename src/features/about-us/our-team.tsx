import Image from 'next/image'
import { team } from './about'
import { headingStyle } from '@/styles/font'
import { AnimateInView } from '@/components/shared/animate-in-view'

export function OurTeam() {
    const [principal, director, ...rest] = team.members

    return (
        <section id="team" aria-labelledby="team-heading" className="">

            <AnimateInView yOffset={10} duration={0.8} delay={0.05} className="mb-8">
                <div className="section-tag">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Our Leadership</span>
                </div>
                <h2 id="team-heading" className="about-heading">
                    Meet Our <span className="text-secondary">Leaders.</span>
                </h2>
            </AnimateInView>

            <AnimateInView yOffset={20} duration={0.9} delay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {[principal, director].map((member) => (
                    <div key={member.name} className="group relative rounded-2xl overflow-hidden bg-muted">
                        <div className="relative aspect-3/4 w-full overflow-hidden">
                            <Image
                                src={member.image}
                                alt={`${member.name}, ${member.role}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover', objectPosition: 'top' }}
                                className="transition-transform duration-1200 ease-in-out group-hover:scale-[1.04]"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)' }}
                                aria-hidden
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-secondary font-bold mb-1">
                                    {member.role}
                                </p>
                                <h3
                                    className="font-black italic leading-tight text-white"
                                    style={{ ...headingStyle, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                                >
                                    {member.name}
                                </h3>
                            </div>
                        </div>
                        <div className="px-6 py-5">
                            <p className="text-[0.88rem] leading-[1.75] text-foreground/65">{member.bio}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary/20 group-hover:bg-secondary/60 transition-colors duration-500" aria-hidden />
                    </div>
                ))}
            </AnimateInView>

            {rest.length > 0 && (
                <AnimateInView yOffset={15} duration={0.8} delay={0.2}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-foreground/50">School Leadership</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {rest.map((member) => (
                            <div key={member.name} className="group relative rounded-xl overflow-hidden bg-muted">
                                <div className="relative aspect-3/4 w-full overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={`${member.name}, ${member.role}`}
                                        fill
                                        sizes="(max-width: 640px) 50vw, 25vw"
                                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                                        className="transition-transform duration-1200 ease-in-out group-hover:scale-[1.04]"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
                                        aria-hidden
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <p className="text-[0.58rem] tracking-[0.22em] uppercase text-secondary font-semibold leading-none mb-0.5">
                                            {member.role}
                                        </p>
                                        <p className="text-[0.78rem] font-bold text-white leading-snug">{member.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimateInView>
            )}
        </section>
    )
}
