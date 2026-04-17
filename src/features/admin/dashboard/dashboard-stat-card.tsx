import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentType } from 'react'

interface DashboardStatCardProps {
  label: string
  value: number
  href: string
  icon: ComponentType<{ className?: string }>
  accent?: boolean
}

export function DashboardStatCard({ label, value, href, icon: Icon, accent }: DashboardStatCardProps) {
  return (
    <Link href={href} aria-label={`Go to ${label}`}>
      <div className="rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/20 transition-all group h-full">
        <div
          className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors',
            accent
              ? 'bg-secondary/15 group-hover:bg-secondary/25'
              : 'bg-primary/8 group-hover:bg-primary/12',
          )}
        >
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{label}</p>
      </div>
    </Link>
  )
}
