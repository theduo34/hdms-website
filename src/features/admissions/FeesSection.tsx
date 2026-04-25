'use client'

import { AlertCircle, Loader2 } from 'lucide-react'
import { headingStyle } from '@/styles/font'
import { sectionTag } from './admissions-ui'
import { useFees } from '../../hooks/admissions/use-fees'

export function FeesSection() {
    const { fees, loading, error } = useFees()

    return (
        <section id="fees">
            <span className={sectionTag}>Fees &amp; Tuition</span>
            <h2
                className="font-light leading-[1.1] mb-8 text-primary"
                style={{ ...headingStyle, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
                Transparent <strong className="font-semibold italic">Fee Structure</strong>
            </h2>
            <p className="text-[0.95rem] font-light leading-[1.85] max-w-150 mb-6">
                We are committed to transparency in our fee structure. All fees are reviewed
                annually and communicated to families well in advance of each academic year.
            </p>
            <p className="text-[0.85rem] font-light leading-[1.7] mb-8 border-l-2 border-secondary pl-4 max-w-145">
                The figures below are indicative for the 2025/2026 academic year. Please contact
                our admissions office for a detailed breakdown including optional extras,
                after-school fees, and payment plan options.
            </p>

            {error ? (
                <div className="flex items-center gap-3 text-[0.88rem] text-destructive py-6">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            ) : loading ? (
                <div className="flex items-center gap-3 text-[0.88rem] py-6">
                    <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                    Loading fees…
                </div>
            ) : (
                <div className="overflow-x-auto rounded-none">
                    <table className="w-full border-collapse min-w-120">
                        <thead>
                            <tr>
                                <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-left">Programme</th>
                                <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-right">Registration</th>
                                <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-right">Termly</th>
                                <th className="bg-primary text-primary-foreground text-[0.65rem] font-normal tracking-[0.18em] uppercase px-6 py-[1.1rem] text-right">Annual (Est.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((row, i) => (
                                <tr
                                    key={row.programme}
                                    className="border-b border-border last:border-b-0 hover:bg-secondary/5 transition-colors"
                                    style={{ background: i % 2 === 0 ? undefined : 'var(--muted)' }}
                                >
                                    <td className="px-6 py-[1.1rem]">
                                        <span className="block font-semibold text-primary" style={headingStyle}>{row.programme}</span>
                                        <span className="block text-[0.7rem] mt-[0.1rem]">{row.range}</span>
                                    </td>
                                    <td className="px-6 py-[1.1rem] text-right text-[0.88rem] font-light">{row.registration}</td>
                                    <td className="px-6 py-[1.1rem] text-right text-[0.88rem] font-light">{row.termly}</td>
                                    <td className="px-6 py-[1.1rem] text-right text-[0.88rem] font-semibold text-primary">{row.annual}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <p className="text-[0.72rem] font-light mt-5 leading-[1.6] max-w-145">
                * Fees are in Ghana Cedis (GHS) and subject to annual review. Registration is a
                one-time non-refundable payment. Termly tuition is payable at the start of each
                term. Sibling discounts available - contact our office for details.
            </p>
        </section>
    )
}
