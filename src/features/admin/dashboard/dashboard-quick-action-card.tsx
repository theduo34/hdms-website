import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ComponentType } from 'react'

interface DashboardQuickActionCardProps {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export function DashboardQuickActionCard({ label, href, icon: Icon }: DashboardQuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 hover:border-primary/30 hover:bg-primary/[0.03] transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary/50 group-hover:translate-x-0.5 transition-all" />
    </Link>
  )
}
