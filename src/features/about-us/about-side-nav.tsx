'use client'

import { useEffect, useState } from 'react'
import { sideNavSections } from './about'

export function AboutSideNav() {
    const [activeId, setActiveId] = useState('story')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        )

        sideNavSections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top, behavior: 'smooth' })
    }

    return (
        <aside className="hidden md:block sticky top-24 self-start">
            <span className="block text-[0.65rem] tracking-[0.25em] uppercase mb-4 font-medium">
                On this page
            </span>

            <nav className="flex flex-col space-y-1">
                {sideNavSections.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`
                            flex items-center w-full text-left bg-transparent
                            px-4 py-3 text-[0.82rem] tracking-[0.04em]
                            border-l-2 transition-all duration-300 cursor-pointer
                            hover:text-primary hover:bg-black/2
                            ${activeId === id
                            ? 'text-primary border-l-secondary font-semibold'
                            : 'border-l-transparent font-normal'
                        }
                        `}
                    >
                        {label}
                    </button>
                ))}
            </nav>
        </aside>
    )
}