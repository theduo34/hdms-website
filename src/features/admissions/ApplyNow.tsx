'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { headingStyle } from '@/styles/font'
import { programmeOptions } from './admissions'

const inputBase = 'bg-background border px-4 py-3 text-[0.88rem] font-light outline-none w-full transition-all focus:ring-2 focus:ring-primary/10'

export default function ApplyNow() {
    const [submitted, setSubmitted] = useState(false)
    const [fields, setFields] = useState({
        childFirstName: '', childLastName: '', dob: '',
        programme: '', parentName: '', phone: '', email: '', notes: '',
    })
    const [errors, setErrors] = useState<Record<string, boolean>>({})

    const required = ['childFirstName', 'childLastName', 'dob', 'programme', 'parentName', 'phone', 'email']

    const handleSubmit = () => {
        const newErrors: Record<string, boolean> = {}
        required.forEach((key) => { if (!fields[key as keyof typeof fields].trim()) newErrors[key] = true })
        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) setSubmitted(true)
    }

    const inputCls = (key: string) => cn(
        inputBase,
        errors[key] ? 'border-destructive' : 'border-border focus:border-primary'
    )

    return (
        <section id="apply-now" className="">
            <span className="flex items-center gap-3 mb-5 text-[0.65rem] tracking-[0.25em] uppercase text-secondary before:content-[''] before:block before:w-6 before:h-px before:bg-secondary before:shrink-0">
                Apply Now
            </span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-muted">
                {/* ── Online Form ── */}
                <div className="p-4">
                    <span className="block text-[1.4rem] font-semibold text-primary mb-2" style={headingStyle}>
                        Apply Online
                    </span>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-8">
                        Complete and submit your application directly from this page. Our admissions
                        team will respond within 3 working days.
                    </p>

                    {submitted ? (
                        <div className="bg-primary/5 border border-primary/15 px-6 py-5 text-[0.88rem] text-primary mt-4">
                            ✓ Thank you! Your application has been received. Our admissions team will be
                            in touch within 3 working days.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Child&apos;s First Name *</label>
                                    <input className={inputCls('childFirstName')} type="text" placeholder="e.g. Abena"
                                        value={fields.childFirstName} onChange={(e) => setFields({ ...fields, childFirstName: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Child&apos;s Last Name *</label>
                                    <input className={inputCls('childLastName')} type="text" placeholder="e.g. Mensah"
                                        value={fields.childLastName} onChange={(e) => setFields({ ...fields, childLastName: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Date of Birth *</label>
                                    <input className={inputCls('dob')} type="date"
                                        value={fields.dob} onChange={(e) => setFields({ ...fields, dob: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Programme Applying For *</label>
                                    <select
                                        className={cn(inputCls('programme'), 'cursor-pointer')}
                                        value={fields.programme}
                                        onChange={(e) => setFields({ ...fields, programme: e.target.value })}
                                    >
                                        <option value="">Select a programme</option>
                                        {programmeOptions.map((p) => <option key={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Parent / Guardian Name *</label>
                                    <input className={inputCls('parentName')} type="text" placeholder="Full name"
                                        value={fields.parentName} onChange={(e) => setFields({ ...fields, parentName: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Phone Number *</label>
                                    <input className={inputCls('phone')} type="tel" placeholder="+233 XX XXX XXXX"
                                        value={fields.phone} onChange={(e) => setFields({ ...fields, phone: e.target.value })} />
                                </div>
                                <div className="col-span-full flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Email Address *</label>
                                    <input className={inputCls('email')} type="email" placeholder="your@email.com"
                                        value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} />
                                </div>
                                <div className="col-span-full flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Additional Notes</label>
                                    <textarea
                                        className={cn(inputBase, 'border-border focus:border-primary resize-y min-h-25')}
                                        placeholder="Any additional information about your child or questions for our admissions team..."
                                        value={fields.notes} onChange={(e) => setFields({ ...fields, notes: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                className="bg-primary text-primary-foreground text-[0.75rem] font-medium tracking-wider uppercase px-8 py-[0.9rem] block w-full mt-5 transition hover:-translate-y-px hover:bg-primary/90 cursor-pointer border-0"
                                onClick={handleSubmit}
                            >
                                Submit Application
                            </button>
                        </>
                    )}
                </div>

                {/* ── PDF Download ── */}
                <div className="p-4 flex flex-col">
                    <span className="block text-[1.4rem] font-semibold text-primary mb-2" style={headingStyle}>
                        Download Form
                    </span>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-8">
                        Prefer to complete the form offline? Download our PDF application form,
                        fill it in, and return it to us in person or by email.
                    </p>
                    <span className="text-5xl mb-5">📄</span>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-4">
                        Our PDF application form covers all the information we need to process
                        your child&apos;s application. Once completed, you can either bring it to
                        the school in person or email it to{' '}
                        <strong>admissions@hdm.edu.gh</strong>.
                    </p>
                    <p className="text-[0.85rem] font-light leading-[1.7] mb-4">
                        Forms are also available to collect from the school&apos;s front office
                        Monday to Friday, 7:30 AM – 3:30 PM.
                    </p>
                    <Link
                        href="/hdm-application-form.pdf"
                        className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground text-[0.75rem] font-medium tracking-wider uppercase px-7 py-[0.9rem] transition hover:-translate-y-px hover:bg-secondary/80 mt-auto self-start"
                        target="_blank"
                    >
                        <span>⬇</span> Download Application Form
                    </Link>
                    <p className="text-[0.72rem] mt-4 font-light">
                        PDF format · Approx. 2 pages · English
                    </p>
                </div>
            </div>
        </section>
    )
}
