'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { CTAButton } from '@/components/shared/cta-button'
import { programmeOptions } from './admissions'
import { FormInput, FormSelect, FormTextarea } from '../../components/shared/FormField'

const ADM_EMAIL = process.env.NEXT_PUBLIC_ADMISSIONS_EMAIL ?? 'admissions@hdms.edu.gh'

const sectionTag = "flex items-center gap-3 mb-5 text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-secondary before:content-[''] before:block before:w-6 before:h-px before:bg-secondary before:shrink-0"

export default function ApplyNow() {
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [fields, setFields] = useState({
        childFirstName: '', childLastName: '', dob: '',
        programme: '', parentName: '', phone: '', email: '', notes: '',
    })
    const [errors, setErrors] = useState<Record<string, boolean>>({})

    const required = ['childFirstName', 'childLastName', 'dob', 'programme', 'parentName', 'phone', 'email']

    const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFields((prev) => ({ ...prev, [key]: e.target.value }))

    const setProgramme = (value: string) =>
        setFields((prev) => ({ ...prev, programme: value }))

    const handleSubmit = async () => {
        const newErrors: Record<string, boolean> = {}
        required.forEach((key) => {
            if (!fields[key as keyof typeof fields].trim()) newErrors[key] = true
        })
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        setIsSubmitting(true)
        setSubmitError(false)
        try {
            const res = await fetch('/api/admissions/apply', {
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
        <section id="apply-now" className="">
            <span className={sectionTag}>Apply Now</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                Start Your <strong className="font-semibold italic">Application Today</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-8">
                Choose how you&apos;d like to apply - submit online for the fastest response,
                or download the PDF form to complete at your own pace.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-secondary">
                <div className="bg-muted p-6 md:p-8">
                    <span className="block text-[1.4rem] font-semibold text-primary mb-2" style={headingStyle}>
                        Apply Online
                    </span>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-8">
                        Complete and submit your application directly from this page. Our admissions
                        team will respond within 3 working days.
                    </p>

                    {submitted ? (
                        <div className="flex items-start gap-4 bg-primary/5 border border-primary/15 px-6 py-5 text-[0.88rem] text-primary">
                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-green-600" />
                            <span>
                                Thank you! Your application has been received. Our admissions team will be
                                in touch within 3 working days.
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormInput
                                    label="Child's First Name *"
                                    type="text"
                                    placeholder="e.g. Abena"
                                    error={errors.childFirstName}
                                    value={fields.childFirstName}
                                    onChange={set('childFirstName')}
                                />
                                <FormInput
                                    label="Child's Last Name *"
                                    type="text"
                                    placeholder="e.g. Mensah"
                                    error={errors.childLastName}
                                    value={fields.childLastName}
                                    onChange={set('childLastName')}
                                />
                                <FormInput
                                    label="Date of Birth *"
                                    type="date"
                                    error={errors.dob}
                                    value={fields.dob}
                                    onChange={set('dob')}
                                />
                                <FormSelect
                                    label="Programme Applying For *"
                                    error={errors.programme}
                                    value={fields.programme}
                                    onValueChange={setProgramme}
                                    placeholder="Select a programme"
                                    options={programmeOptions}
                                />
                                <FormInput
                                    label="Parent / Guardian Name *"
                                    type="text"
                                    placeholder="Full name"
                                    error={errors.parentName}
                                    value={fields.parentName}
                                    onChange={set('parentName')}
                                />
                                <FormInput
                                    label="Phone Number *"
                                    type="tel"
                                    placeholder="+233 XX XXX XXXX"
                                    error={errors.phone}
                                    value={fields.phone}
                                    onChange={set('phone')}
                                />
                                <div className="col-span-full">
                                    <FormInput
                                        label="Email Address *"
                                        type="email"
                                        placeholder="your@email.com"
                                        error={errors.email}
                                        value={fields.email}
                                        onChange={set('email')}
                                    />
                                </div>
                                <div className="col-span-full">
                                    <FormTextarea
                                        label="Additional Notes"
                                        placeholder="Any additional information about your child or questions for our admissions team..."
                                        value={fields.notes}
                                        onChange={set('notes')}
                                    />
                                </div>
                            </div>

                            {submitError && (
                                <div className="flex items-start gap-3 bg-destructive/5 border border-destructive/20 px-4 py-3 mt-4 text-[0.82rem] text-destructive">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span>Something went wrong. Please try again or email us directly at <strong>{ADM_EMAIL}</strong>.</span>
                                </div>
                            )}

                            <CTAButton
                                onClick={handleSubmit}
                                variant="primary"
                                disabled={isSubmitting}
                                className="w-full mt-5 rounded-none"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                                ) : (
                                    'Submit Application'
                                )}
                            </CTAButton>
                        </>
                    )}
                </div>

                <div className="bg-muted p-6 md:p-8 flex flex-col">
                    <span className="block text-[1.4rem] font-semibold text-primary mb-2" style={headingStyle}>
                        Download Form
                    </span>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-8">
                        Prefer to complete the form offline? Download our PDF application form,
                        fill it in, and return it to us in person or by email.
                    </p>
                    <div className="flex items-center justify-center w-16 h-16 bg-background mb-6">
                        <FileText className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-4">
                        Our PDF application form covers all the information we need to process
                        your child&apos;s application. Once completed, you can either bring it to
                        the school in person or email it to{' '}
                        <strong>{ADM_EMAIL}</strong>.
                    </p>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-6">
                        Forms are also available to collect from the school&apos;s front office
                        Monday to Friday, 7:30 AM – 3:30 PM.
                    </p>
                    <CTAButton
                        href="/api/admissions/form"
                        external
                        variant="secondary"
                        className="mt-auto self-start rounded-none"
                    >
                        <Download className="w-4 h-4" />
                        Download Application Form
                    </CTAButton>
                    <p className="text-[0.72rem] mt-4 font-light">
                        PDF format · Approx. 2 pages · English
                    </p>
                </div>
            </div>
        </section>
    )
}
