"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [
  { label: 'School Day',     href: '/campus-life/school-day'       },
  { label: 'Sports & Clubs', href: '/campus-life/sports-and-clubs'  },
  { label: 'Facilities',     href: '/campus-life/facilities'        },
  { label: 'Wellbeing',      href: '/campus-life/wellbeing'         },
]

export function CampusLifeSubNav() {
  const pathname = usePathname()

  return (
    <nav
      className="sticky top-0 z-40 bg-primary/95 backdrop-blur-md border-b border-white/10"
      aria-label="Campus Life navigation"
    >
      <div className="flex items-center overflow-x-auto scrollbar-none px-4 md:px-16">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-shrink-0 py-4 px-4 md:px-5 text-[0.6rem] tracking-[0.22em] uppercase font-bold border-b-2 transition-all duration-300 whitespace-nowrap',
              pathname === item.href
                ? 'text-secondary border-secondary'
                : 'text-white/35 border-transparent hover:text-white/65 hover:border-white/15'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
