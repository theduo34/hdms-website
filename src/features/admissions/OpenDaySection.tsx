'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { CTAButton } from '@/components/shared/cta-button'
import { openDay } from './admissions'
import { FormInput, FormSelect } from '../../components/shared/FormField'
import { sectionTag, SectionIcon } from './admissions-ui'

export function OpenDaySection() {
    const [rsvpSent, setRsvpSent] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [rsvpFields, setRsvpFields] = useState({ name: '', phone: '', email: '', children: '' })
    const [errors, setErrors] = useState<Record<string, boolean>>({})

    const set = (key: keyof typeof rsvpFields) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setRsvpFields((prev) => ({ ...prev, [key]: e.target.value }))

    const handleRsvp = async () => {
        const newErrors: Record<string, boolean> = {}
        if (!rsvpFields.name.trim())  newErrors.name  = true
        if (!rsvpFields.phone.trim()) newErrors.phone = true
        if (!rsvpFields.email.trim()) newErrors.email = true
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        setIsSubmitting(true)
        await new Promise((r) => setTimeout(r, 1200))
        setIsSubmitting(false)
        setRsvpSent(true)
    }

    return (
        <section id="open-day">
            <span className={sectionTag}>Open Day</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                Come and <strong className="font-semibold italic">See Us in Action</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-10">
                Our Open Days are the perfect opportunity to experience HDM first-hand - tour
                the campus, meet our teachers, observe classes, and ask all the questions you have.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-secondary">
                <div className="bg-primary p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
                    <div className="mb-8">
                        <span className="text-[0.7rem] tracking-[0.25em] uppercase text-secondary block mb-1">{openDay.month}</span>
                        <span className="text-[5rem] font-light text-primary-foreground leading-none block" style={headingStyle}>{openDay.day}</span>
                        <span className="text-2xl font-light text-primary-foreground/40 block" style={headingStyle}>{openDay.year}</span>
                    </div>
                    <div className="flex flex-col gap-5">
                        {openDay.details.map((detail) => (
                            <div key={detail.label} className="flex items-start gap-3">
                                <div className="mt-[0.15rem] shrink-0">
                                    <SectionIcon name={detail.icon} className="text-secondary" />
                                </div>
                                <div>
                                    <span className="text-[0.62rem] tracking-[0.18em] uppercase text-secondary block mb-[0.15rem]">{detail.label}</span>
                                    <span className="text-[0.85rem] font-light leading-[1.6] text-primary-foreground/80">{detail.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-muted p-8 md:p-10">
                    <span className="block text-[1.4rem] font-semibold text-primary mb-2" style={headingStyle}>
                        Reserve Your Place
                    </span>
                    <p className="text-[0.85rem] font-light mb-7 leading-[1.6]">
                        Spaces are limited - RSVP below to secure your family&apos;s spot and receive
                        a confirmation with directions and schedule.
                    </p>

                    {rsvpSent ? (
                        <div className="flex items-start gap-4 bg-primary/5 border-l-4 border-secondary px-5 py-4 text-[0.88rem]">
                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                            <span>You&apos;re on the list! We&apos;ll send a confirmation to your email shortly.</span>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                <FormInput label="Parent / Guardian Name *" type="text"  placeholder="Full name"        error={errors.name}  value={rsvpFields.name}  onChange={set('name')}  />
                                <FormInput label="Phone Number *"            type="tel"   placeholder="+233 XX XXX XXXX" error={errors.phone} value={rsvpFields.phone} onChange={set('phone')} />
                                <FormInput label="Email Address *"           type="email" placeholder="your@email.com"   error={errors.email} value={rsvpFields.email} onChange={set('email')} />
                                <FormSelect
                                    label="Number of Children Attending"
                                    value={rsvpFields.children}
                                    onValueChange={(v) => setRsvpFields((prev) => ({ ...prev, children: v }))}
                                    placeholder="Select"
                                    options={['1 child', '2 children', '3 or more children']}
                                />
                            </div>
                            <CTAButton
                                onClick={handleRsvp}
                                variant="primary"
                                disabled={isSubmitting}
                                className="w-full mt-6 rounded-none"
                            >
                                {isSubmitting
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Reserving…</>
                                    : 'Reserve My Place'
                                }
                            </CTAButton>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
