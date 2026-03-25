'use client'

import { useEffect, useState } from 'react'
import { sideNavSections } from './about'

const NAV_SECTIONS = sideNavSections.filter(s => s.id !== 'team')

export function AboutScrollNav() {
    const [activeId, setActiveId] = useState('story')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 350)
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        )
        NAV_SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
    }

    return (
        <div
            className={`sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center overflow-x-auto">
                {NAV_SECTIONS.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`
                            relative flex-shrink-0 px-4 py-4 text-[0.68rem] tracking-[0.18em] uppercase
                            transition-colors duration-300 cursor-pointer focus-visible:outline-none
                            ${activeId === id
                                ? 'text-primary font-semibold'
                                : 'text-foreground/45 font-medium hover:text-foreground/80'
                            }
                        `}
                    >
                        {label}
                        {activeId === id && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary" aria-hidden />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}