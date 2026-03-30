'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { headingStyle } from '@/styles/font'
import { requirementsChild, requirementsParent } from './admissions'

const ADM_EMAIL = process.env.NEXT_PUBLIC_ADMISSIONS_EMAIL ?? 'admissions@hdm.edu.gh'

function Checklist({ items }: { items: string[] }) {
    const [checked, setChecked] = useState<boolean[]>(items.map(() => false))
    const toggle = (i: number) =>
        setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

    return (
        <ul className="flex flex-col gap-3">
            {items.map((item, i) => (
                <li key={item} className="flex items-start gap-4 text-[0.85rem] font-light leading-[1.6]">
                    <button
                        type="button"
                        aria-checked={checked[i]}
                        role="checkbox"
                        className={cn(
                            'w-5 h-5 border flex items-center justify-center shrink-0 mt-[0.1rem] cursor-pointer transition-colors',
                            checked[i]
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-transparent hover:border-primary/60'
                        )}
                        onClick={() => toggle(i)}
                    >
                        {checked[i] && <Check className="w-3 h-3" strokeWidth={3} />}
                    </button>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

export default function Requirements() {
    return (
        <section id="requirements" className="">
            <span className="flex items-center gap-3 mb-5 text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-secondary before:content-[''] before:block before:w-6 before:h-px before:bg-secondary before:shrink-0">
                Requirements &amp; Documents
            </span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                What You&apos;ll <strong className="font-semibold italic">Need to Provide</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-12">
                Please ensure all documents are submitted in their original or certified copy form.
                Incomplete applications may delay processing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-secondary">
                <div className="bg-muted p-10">
                    <h3
                        className="flex items-center gap-3 mb-6 text-xl font-semibold text-primary before:content-[''] before:block before:w-8 before:h-0.5 before:bg-secondary before:shrink-0"
                        style={headingStyle}
                    >
                        For the Child
                    </h3>
                    <Checklist items={requirementsChild} />
                </div>
                <div className="bg-muted p-10">
                    <h3
                        className="flex items-center gap-3 mb-6 text-xl font-semibold text-primary before:content-[''] before:block before:w-8 before:h-0.5 before:bg-secondary before:shrink-0"
                        style={headingStyle}
                    >
                        For the Parent / Guardian
                    </h3>
                    <Checklist items={requirementsParent} />
                    <p className="mt-8 text-[0.78rem] font-light leading-[1.6] border-l-2 border-secondary pl-4">
                        All documents should be submitted in person or emailed to{' '}
                        <strong>{ADM_EMAIL}</strong>. Originals will be verified and
                        returned on the day of your school visit.
                    </p>
                </div>
            </div>
        </section>
    )
}
