'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Section { id: string; label: string }

export default function AdmissionsSideNav({ sections }: { sections: Section[] }) {
    const [activeId, setActiveId] = useState(sections[0].id)
    const tickingRef = useRef(false)

    useEffect(() => {
        const updateActive = () => {
            const threshold = 160
            let current = sections[0].id
            for (const { id } of sections) {
                const el = document.getElementById(id)
                if (el && el.getBoundingClientRect().top <= threshold) current = id
            }
            setActiveId(current)
            tickingRef.current = false
        }
        const onScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true
                requestAnimationFrame(updateActive)
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        updateActive()
        return () => window.removeEventListener('scroll', onScroll)
    }, [sections])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
    }

    return (
        <aside className="hidden md:block sticky top-24 self-start py-10 pr-6">
            <div className="flex items-center gap-3 mb-6">
                <span className="block w-4 h-px bg-secondary shrink-0" />
                <p className="text-[0.6rem] tracking-[0.3em] uppercase font-bold text-foreground/40">
                    On this page
                </p>
            </div>
            <nav className="flex flex-col gap-2" aria-label="Page sections">
                {sections.map(({ id, label }, i) => (
                    <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={cn(
                            'group relative flex items-center gap-3 w-full text-left py-2.5 pl-4 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                            activeId === id
                                ? 'text-foreground font-semibold'
                                : 'text-foreground/40 hover:text-foreground/75'
                        )}
                    >
                        <span
                            className={cn(
                                'absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-secondary transition-opacity duration-300',
                                activeId === id ? 'opacity-100' : 'opacity-0'
                            )}
                        />
                        <span
                            className={cn(
                                'text-[0.8rem] tabular-nums shrink-0 transition-colors duration-300',
                                activeId === id ? 'text-secondary' : 'text-foreground/25 group-hover:text-foreground/45'
                            )}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[0.9rem] tracking-[0.02em]">{label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}
