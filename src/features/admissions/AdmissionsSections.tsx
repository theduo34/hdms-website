'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { headingStyle } from '@/styles/font'
import { feesData, faqs, openDay, admissionsContact } from './admissions'

const sectionTag = "flex items-center gap-3 mb-5 text-[0.65rem] tracking-[0.25em] uppercase text-secondary before:content-[''] before:block before:w-6 before:h-px before:bg-secondary before:shrink-0"
const inputBase = "bg-background border border-border px-4 py-3 text-[0.88rem] font-light outline-none w-full transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"

// ── Fees & Tuition ─────────────────────────────────
export function FeesSection() {
    return (
        <section id="fees" className="py-20">
            <span className={sectionTag}>Fees &amp; Tuition</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                Transparent <strong className="font-semibold italic">Fee Structure</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-8">
                We are committed to transparency in our fee structure. All fees are reviewed
                annually and communicated to families well in advance of each academic year.
            </p>
            <p className="text-[0.85rem] font-light leading-[1.7] mb-8 border-l-2 border-secondary pl-4 max-w-145">
                The figures below are indicative for the 2025/2026 academic year. Please contact
                our admissions office for a detailed breakdown including optional extras,
                after-school fees, and payment plan options.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-background min-w-120">
                    <thead>
                        <tr>
                            <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-left">Programme</th>
                            <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-right">Registration</th>
                            <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-right">Termly</th>
                            <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-right">Annual (Est.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feesData.map((row) => (
                            <tr key={row.programme} className="border-b border-border last:border-b-0">
                                <td className="px-6 py-[1.1rem]">
                                    <span className="block font-semibold text-primary" style={headingStyle}>{row.programme}</span>
                                    <span className="block text-[0.7rem] mt-[0.1rem]">{row.range}</span>
                                </td>
                                <td className="px-6 py-[1.1rem] text-right text-[0.88rem] font-light">{row.registration}</td>
                                <td className="px-6 py-[1.1rem] text-right text-[0.88rem] font-light">{row.termly}</td>
                                <td className="px-6 py-[1.1rem] text-right text-[0.88rem] font-light">{row.annual}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-[0.72rem] font-light mt-5 leading-[1.6]">
                * Fees quoted are in Ghana Cedis (GHS) and are subject to annual review.
                Registration fee is a one-time, non-refundable payment. Termly tuition is
                payable at the start of each term. Sibling discounts available — contact our
                office for details.
            </p>
        </section>
    )
}

// ── FAQs ──────────────────────────────────────────
export function FAQsSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null)
    const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i)

    return (
        <section id="faqs" className="">
            <span className={sectionTag}>Frequently Asked Questions</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                Your Questions <strong className="font-semibold italic">Answered</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-8">
                Can&apos;t find what you&apos;re looking for? Contact our admissions team directly
                and we&apos;ll be happy to help.
            </p>
            <div className="flex flex-col gap-px bg-border">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-background overflow-hidden">
                        <button
                            className="flex items-center justify-between px-6 py-5 gap-4 w-full bg-transparent border-0 text-left transition-colors hover:bg-muted cursor-pointer"
                            onClick={() => toggle(i)}
                            aria-expanded={openIdx === i}
                        >
                            <span className="text-[1rem] font-semibold text-primary leading-[1.3]" style={headingStyle}>
                                {faq.question}
                            </span>
                            <span
                                className={cn(
                                    'w-6 h-6 border border-border flex items-center justify-center shrink-0 text-[0.7rem] transition-all duration-300',
                                    openIdx === i && 'bg-primary border-primary text-primary-foreground rotate-45'
                                )}
                                aria-hidden="true"
                            >
                                +
                            </span>
                        </button>
                        <div className={cn('overflow-hidden transition-all duration-300', openIdx === i ? 'max-h-100' : 'max-h-0')}>
                            <div className="px-6 pb-6 text-[0.88rem] font-light leading-[1.8]">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ── Open Day ──────────────────────────────────────
export function OpenDaySection() {
    const [rsvpSent, setRsvpSent] = useState(false)
    const [rsvpFields, setRsvpFields] = useState({ name: '', phone: '', email: '', children: '1 child' })

    return (
        <section id="open-day" className="py-20 border-b border-border">
            <span className={sectionTag}>Open Day</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                Come and <strong className="font-semibold italic">See Us in Action</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-12">
                Our Open Days are the perfect opportunity to experience HDM first-hand — tour
                the campus, meet our teachers, observe classes, and ask all the questions you have.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                {/* Date & details panel */}
                <div className="bg-primary p-10">
                    <div className="mb-8">
                        <span className="text-[0.7rem] tracking-[0.25em] uppercase text-secondary block mb-1">{openDay.month}</span>
                        <span className="text-[5rem] font-light text-primary-foreground leading-none block" style={headingStyle}>{openDay.day}</span>
                        <span className="text-2xl font-light text-primary-foreground/40 block" style={headingStyle}>{openDay.year}</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {openDay.details.map((detail) => (
                            <div key={detail.label} className="flex items-start gap-3">
                                <span className="text-base shrink-0 mt-[0.1rem]">{detail.icon}</span>
                                <div>
                                    <span className="text-[0.62rem] tracking-[0.18em] uppercase text-secondary block mb-[0.1rem]">{detail.label}</span>
                                    <span className="text-[0.85rem] font-light leading-[1.6] text-primary-foreground/75">{detail.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* RSVP panel */}
                <div className="bg-background p-10">
                    <span className="block text-[1.4rem] font-semibold text-primary mb-[0.4rem]" style={headingStyle}>
                        Reserve Your Place
                    </span>
                    <p className="text-[0.85rem] font-light mb-7 leading-[1.6]">
                        Spaces are limited — RSVP below to secure your family&apos;s spot and receive
                        a confirmation with directions and schedule.
                    </p>
                    {rsvpSent ? (
                        <div className="bg-primary/5 border border-primary/15 px-5 py-4 text-[0.88rem] text-primary">
                            ✓ You&apos;re on the list! We&apos;ll send a confirmation to your email shortly.
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                {([
                                    { label: 'Parent / Guardian Name *', type: 'text',  key: 'name',  placeholder: 'Full name'        },
                                    { label: 'Phone Number *',            type: 'tel',   key: 'phone', placeholder: '+233 XX XXX XXXX' },
                                    { label: 'Email Address *',           type: 'email', key: 'email', placeholder: 'your@email.com'   },
                                ] as const).map(({ label, type, key, placeholder }) => (
                                    <div key={key} className="flex flex-col gap-[0.4rem]">
                                        <label className="text-[0.65rem] tracking-[0.15em] uppercase">{label}</label>
                                        <input
                                            className={inputBase}
                                            type={type}
                                            placeholder={placeholder}
                                            value={rsvpFields[key]}
                                            onChange={(e) => setRsvpFields({ ...rsvpFields, [key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                                <div className="flex flex-col gap-[0.4rem]">
                                    <label className="text-[0.65rem] tracking-[0.15em] uppercase">Number of Children Attending</label>
                                    <select
                                        className={cn(inputBase, 'cursor-pointer')}
                                        value={rsvpFields.children}
                                        onChange={(e) => setRsvpFields({ ...rsvpFields, children: e.target.value })}
                                    >
                                        <option>1 child</option>
                                        <option>2 children</option>
                                        <option>3 or more children</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                className="bg-primary text-primary-foreground text-[0.75rem] font-medium tracking-wider uppercase px-8 py-[0.9rem] block w-full mt-5 transition hover:-translate-y-px hover:bg-primary/90 cursor-pointer border-0"
                                onClick={() => setRsvpSent(true)}
                            >
                                Reserve My Place
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

// ── Contact Admissions ────────────────────────────
export function ContactAdmissions() {
    return (
        <section id="contact" className="py-20">
            <span className={sectionTag}>Contact Admissions</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                We&apos;re Here to <strong className="font-semibold italic">Help</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-12">
                Our admissions team is available Monday to Friday, 7:30 AM – 3:30 PM. We&apos;d
                love to hear from you and answer any questions about joining our community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div className="flex flex-col gap-8">
                    {admissionsContact.map((item) => (
                        <div key={item.label} className="flex items-start gap-5">
                            <div className="w-10 h-10 bg-primary flex items-center justify-center text-base shrink-0 text-primary-foreground">
                                {item.icon}
                            </div>
                            <div>
                                <span className="text-[0.62rem] tracking-[0.2em] uppercase text-secondary block mb-1">{item.label}</span>
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
                    <a
                        href="https://wa.me/233244974052"
                        className="inline-flex items-center gap-3 bg-[#25D366] text-white text-[0.75rem] font-medium tracking-wider uppercase px-7 py-[0.85rem] transition hover:bg-[#1ebe5a] hover:-translate-y-px self-start"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        💬 Chat on WhatsApp
                    </a>
                </div>
                <div className="aspect-4/3 overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.259!3d6.094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDUnNDAuMCJOIDDCsDE1JzMyLjQiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                        className="w-full h-full border-0 block"
                        style={{ filter: 'grayscale(20%)' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="HDM Location — Koforidua, Ghana"
                    />
                </div>
            </div>
        </section>
    )
}
