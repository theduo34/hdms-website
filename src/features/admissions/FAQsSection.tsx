'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { headingStyle } from '@/styles/font'
import { sectionTag } from './admissions-ui'
import { faqs } from './admissions'

export function FAQsSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(null)
    const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i)

    return (
        <section id="faqs">
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
                            className={cn(
                                'flex items-center justify-between px-6 py-5 gap-4 w-full bg-transparent border-0 text-left transition-colors hover:bg-muted cursor-pointer',
                                openIdx === i && 'border-l-2 border-secondary bg-secondary/5'
                            )}
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
                            <div className="px-6 pb-6 pt-1 text-[0.88rem] font-light leading-[1.8] border-l-2 border-secondary/30 ml-6">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
