import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { contactInfo } from './contact'

interface InfoCardProps {
    icon: React.ReactNode
    label: string
    lines: string[]
    linkHref?: string
    linkLabel?: string
    delay?: number
}

function InfoCard({ icon, label, lines, linkHref, linkLabel, delay = 0 }: InfoCardProps) {
    return (
        <AnimateInView yOffset={30} duration={0.8} delay={delay}>
            <div className="group flex flex-col gap-4 bg-muted/50 hover:bg-muted rounded-2xl p-7 border border-border/40 hover:border-secondary/40 transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] tracking-[0.25em] font-bold uppercase text-secondary mb-1">
                        {label}
                    </p>
                    {lines.map((line, i) => (
                        <p key={i} className="text-[0.875rem] text-foreground/80 leading-relaxed font-medium">
                            {line}
                        </p>
                    ))}
                </div>
                {linkHref && linkLabel && (
                    <a
                        href={linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-[0.72rem] font-bold uppercase tracking-widest text-primary underline underline-offset-4 hover:text-secondary transition-colors duration-200"
                    >
                        {linkLabel} →
                    </a>
                )}
            </div>
        </AnimateInView>
    )
}

export function ContactInfoSection() {
    return (
        <section aria-labelledby="contact-info-heading" className="section-container bg-background">
            <AnimateInView yOffset={10} duration={0.7} className="mb-12">
                <div className="section-tag">
                    <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">How to Reach Us</span>
                </div>
                <h2
                    id="contact-info-heading"
                    className="about-heading max-w-md"
                >
                    We&apos;re always <span className="text-secondary">available.</span>
                </h2>
            </AnimateInView>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <InfoCard
                    icon={<MapPin />}
                    label="Our Location"
                    lines={[
                        contactInfo.address.street,
                        `${contactInfo.address.city}, ${contactInfo.address.region}`,
                        contactInfo.address.country,
                    ]}
                    linkHref={contactInfo.address.mapsUrl}
                    linkLabel="Get Directions"
                    delay={0}
                />
                <InfoCard
                    icon={<Phone />}
                    label="Call Us"
                    lines={[contactInfo.phone.primary, contactInfo.phone.secondary]}
                    delay={0.1}
                />
                <InfoCard
                    icon={<Mail />}
                    label="Email Us"
                    lines={[contactInfo.email.general, contactInfo.email.admissions]}
                    delay={0.2}
                />
                <InfoCard
                    icon={<Clock />}
                    label="Office Hours"
                    lines={[
                        contactInfo.hours.weekdays,
                        contactInfo.hours.time,
                        contactInfo.hours.note,
                    ]}
                    delay={0.3}
                />
            </div>
        </section>
    )
}
