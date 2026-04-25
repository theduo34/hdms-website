'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, Clock, MessageSquare, Phone } from 'lucide-react'
import { AnimateInView } from '@/components/shared/animate-in-view'
import { CTAButton } from '@/components/shared/cta-button'
import { FormInput, FormSelect, FormTextarea } from '@/components/shared/FormField'
import { headingStyle } from '@/styles/font'
import { subjectOptions, contactInfo } from './contact'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? contactInfo.email.general

export function ContactFormSection() {
    const [fields, setFields] = useState({
        name: '', email: '', phone: '', subject: '', message: '',
    })
    const [errors, setErrors] = useState<Record<string, boolean>>({})
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(false)

    const required = ['name', 'email', 'subject', 'message']

    const set = (key: keyof typeof fields) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setFields(prev => ({ ...prev, [key]: e.target.value }))

    const handleSubmit = async () => {
        const newErrors: Record<string, boolean> = {}
        required.forEach(key => {
            if (!fields[key as keyof typeof fields].trim()) newErrors[key] = true
        })
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        setIsSubmitting(true)
        setSubmitError(false)
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields),
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            setSubmitted(true)
        } catch {
            setSubmitError(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section aria-labelledby="contact-form-heading" className="section-container bg-muted/40">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-14 items-start">

                {/* Left: the form */}
                <AnimateInView xOffset={-20} yOffset={0} duration={0.9}>
                    <div className="bg-background rounded-2xl border border-border/60 p-7 md:p-10 shadow-sm">
                        <div className="section-tag mb-2">
                            <span className="block w-4 h-px bg-secondary shrink-0" aria-hidden />
                            <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-secondary">
                                Send a Message
                            </span>
                        </div>
                        <h2
                            id="contact-form-heading"
                            className="font-black italic uppercase leading-[0.9] text-primary mb-8"
                            style={{ ...headingStyle, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                        >
                            We&apos;d love to <span className="text-secondary">hear from you.</span>
                        </h2>

                        {submitted ? (
                            <div className="flex items-start gap-4 bg-primary/5 border border-primary/15 px-6 py-5 rounded-xl text-[0.9rem] text-primary">
                                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-secondary" />
                                <span>
                                    Thank you for reaching out! A member of our team will get back to you within 1–2 working days.
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <FormInput
                                    label="Your Name *"
                                    type="text"
                                    placeholder="e.g. Kwame Mensah"
                                    error={errors.name}
                                    value={fields.name}
                                    onChange={set('name')}
                                />
                                <FormInput
                                    label="Email Address *"
                                    type="email"
                                    placeholder="your@email.com"
                                    error={errors.email}
                                    value={fields.email}
                                    onChange={set('email')}
                                />
                                <FormInput
                                    label="Phone Number (optional)"
                                    type="tel"
                                    placeholder="+233 XX XXX XXXX"
                                    value={fields.phone}
                                    onChange={set('phone')}
                                />
                                <FormSelect
                                    label="Subject *"
                                    error={errors.subject}
                                    value={fields.subject}
                                    onValueChange={v => setFields(p => ({ ...p, subject: v }))}
                                    placeholder="Select a subject"
                                    options={subjectOptions}
                                />
                                <div className="col-span-full">
                                    <FormTextarea
                                        label="Your Message *"
                                        placeholder="Tell us how we can help…"
                                        error={errors.message}
                                        value={fields.message}
                                        onChange={set('message')}
                                        className="min-h-[160px]"
                                    />
                                </div>

                                {submitError && (
                                    <div className="col-span-full flex items-start gap-3 bg-destructive/5 border border-destructive/20 px-4 py-3 rounded-lg text-[0.82rem] text-destructive">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>
                                            Something went wrong. Please try again or email us at{' '}
                                            <strong>{CONTACT_EMAIL}</strong>.
                                        </span>
                                    </div>
                                )}

                                <div className="col-span-full pt-1">
                                    <CTAButton
                                        onClick={handleSubmit}
                                        variant="primary"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto"
                                    >
                                        {isSubmitting ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </CTAButton>
                                </div>
                            </div>
                        )}
                    </div>
                </AnimateInView>

                {/* Right: what to expect + direct contact */}
                <AnimateInView xOffset={20} yOffset={0} duration={0.9} delay={0.15} className="flex flex-col gap-6">
                    <div className="bg-primary rounded-2xl p-7 md:p-8">
                        <p
                            className="text-lg font-black italic text-primary-foreground mb-6"
                            style={headingStyle}
                        >
                            What to expect
                        </p>
                        <div className="space-y-6">
                            {[
                                { icon: <MessageSquare className="w-4 h-4" />, title: 'Personal response', body: "You'll hear from a named member of our team — not a generic inbox reply." },
                                { icon: <Clock className="w-4 h-4" />, title: 'Within 1–2 working days', body: 'We aim to respond to all enquiries promptly during school office hours.' },
                                { icon: <CheckCircle2 className="w-4 h-4" />, title: 'No pressure at all', body: "Asking a question is just that. There's no commitment or obligation." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 text-secondary mt-0.5">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[0.85rem] font-bold text-primary-foreground mb-1">{item.title}</p>
                                        <p className="text-[0.8rem] text-primary-foreground/55 leading-relaxed">{item.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-background rounded-2xl border border-border/60 p-7 space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary">
                            Or reach us directly
                        </p>
                        <a
                            href={`mailto:${contactInfo.email.general}`}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                                <Phone className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-[0.875rem] font-medium text-foreground/80 group-hover:text-primary transition-colors">
                                {contactInfo.phone.primary}
                            </span>
                        </a>
                        <a
                            href={`mailto:${contactInfo.email.general}`}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-[0.875rem] font-medium text-foreground/80 group-hover:text-primary transition-colors">
                                {contactInfo.email.general}
                            </span>
                        </a>
                    </div>
                </AnimateInView>

            </div>
        </section>
    )
}
