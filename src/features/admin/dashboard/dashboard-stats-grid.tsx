import { BarChart2 } from 'lucide-react'
import { DashboardStatCard } from './dashboard-stat-card'
import { STAT_CARD_CONFIGS } from './dashboard-data'
import type { DashboardStats } from './dashboard-types'

interface DashboardStatsGridProps {
  stats: DashboardStats
  base: string
}

export function DashboardStatsGrid({ stats, base }: DashboardStatsGridProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Overview</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAT_CARD_CONFIGS.map((config, i) => (
          <DashboardStatCard
            key={config.label}
            label={config.label}
            value={stats[config.statKey]}
            href={`${base}/${config.path}`}
            icon={config.icon}
            accent={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}
