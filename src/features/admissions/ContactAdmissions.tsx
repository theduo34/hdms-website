'use client'

import { useState } from 'react'
import { MapPin, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { CTAButton } from '@/components/shared/cta-button'
import { admissionsContact } from './admissions'
import { FormInput, FormTextarea } from '../../components/shared/FormField'
import { sectionTag, SectionIcon } from './admissions-ui'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '233244974052'
const HDM_LAT  = process.env.NEXT_PUBLIC_HDM_LAT ?? '6.094'
const HDM_LNG  = process.env.NEXT_PUBLIC_HDM_LNG ?? '-0.259'

const MAP_SRC = `https://maps.google.com/maps?q=${HDM_LAT},${HDM_LNG}&t=k&z=17&ie=UTF8&output=embed`

export function ContactAdmissions() {
    const [msgSent, setMsgSent]     = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [msgFields, setMsgFields] = useState({ name: '', email: '', message: '' })
    const [msgErrors, setMsgErrors] = useState<Record<string, boolean>>({})

    const setMsg = (key: keyof typeof msgFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setMsgFields((prev) => ({ ...prev, [key]: e.target.value }))

    const handleSend = async () => {
        const errs: Record<string, boolean> = {}
        if (!msgFields.name.trim())    errs.name    = true
        if (!msgFields.email.trim())   errs.email   = true
        if (!msgFields.message.trim()) errs.message = true
        setMsgErrors(errs)
        if (Object.keys(errs).length > 0) return

        setIsSending(true)
        await new Promise((r) => setTimeout(r, 1200))
        setIsSending(false)
        setMsgSent(true)
    }

    return (
        <section id="contact">
            <span className={sectionTag}>Contact Admissions</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                We&apos;re Here to <strong className="font-semibold italic">Help</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-10">
                Our admissions team is available Monday to Friday, 7:30 AM – 3:30 PM. We&apos;d
                love to hear from you and answer any questions about joining our community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 items-start mb-14">
                <div className="flex flex-col gap-7">
                    {admissionsContact.map((item) => (
                        <div key={item.label} className="flex items-start gap-4">
                            <div className="w-11 h-11 bg-primary flex items-center justify-center shrink-0">
                                <SectionIcon name={item.icon} className="text-secondary" />
                            </div>
                            <div>
                                <span className="text-[0.62rem] tracking-[0.2em] uppercase font-semibold text-secondary block mb-1">{item.label}</span>
                                <div className="text-[0.92rem] font-light leading-[1.7]">
                                    {item.lines.map((line, i) =>
                                        'href' in line ? (
                                            <span key={i}>
                                                <a href={line.href} className="transition-colors hover:text-secondary">{line.text}</a>
                                                {i < item.lines.length - 1 && <br />}
                                            </span>
                                        ) : (
                                            <span key={i}>
                                                {line.text}
                                                {i < item.lines.length - 1 && <br />}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <CTAButton
                        href={`https://wa.me/${WHATSAPP}`}
                        external
                        variant="primary"
                        className="bg-[#25D366] hover:bg-[#1ebe5a] self-start rounded-none mt-1"
                        aria-label="Chat with us on WhatsApp"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp
                    </CTAButton>
                </div>

                <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: '4/3' }}>
                    <iframe
                        src={MAP_SRC}
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Heaven's Dew Montessori - Koforidua, Ghana"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/85 backdrop-blur-sm px-4 py-2.5">
                        <p className="text-primary-foreground text-[0.72rem] tracking-wide flex items-center gap-2">
                            <MapPin className="w-3 h-3 shrink-0 text-secondary" />
                            Heaven&apos;s Dew Montessori · Koforidua, Eastern Region
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-muted p-8 md:p-10">
                <span className={sectionTag}>Send Us a Message</span>
                <h3
                    className="font-light leading-[1.1] mb-4 text-primary"
                    style={{ ...headingStyle, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                >
                    Have a question? <strong className="font-semibold italic">Drop us a note.</strong>
                </h3>
                <p className="text-[0.88rem] font-light leading-[1.85] max-w-130 mb-8">
                    Use the form below to get in touch with our admissions team and we&apos;ll
                    respond within one working day.
                </p>

                {msgSent ? (
                    <div className="flex items-start gap-4 bg-primary/5 border-l-4 border-secondary px-6 py-5 text-[0.88rem] max-w-xl">
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                        <span>Message received! We&apos;ll get back to you within one working day.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                        <FormInput label="Your Name *"     type="text"  placeholder="Full name"      error={msgErrors.name}  value={msgFields.name}  onChange={setMsg('name')}  />
                        <FormInput label="Email Address *" type="email" placeholder="your@email.com" error={msgErrors.email} value={msgFields.email} onChange={setMsg('email')} />
                        <div className="col-span-full">
                            <FormTextarea
                                label="Message *"
                                placeholder="How can we help you?"
                                error={msgErrors.message}
                                value={msgFields.message}
                                onChange={setMsg('message')}
                            />
                        </div>
                        <div className="col-span-full">
                            <CTAButton
                                onClick={handleSend}
                                variant="primary"
                                disabled={isSending}
                                className="rounded-none"
                            >
                                {isSending
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                                    : 'Send Message'
                                }
                            </CTAButton>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
