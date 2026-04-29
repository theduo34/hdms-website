import { Plus } from 'lucide-react'
import { can } from '@/lib/admin/permissions'
import { QUICK_ACTION_CONFIGS } from './dashboard-data'
import { DashboardQuickActionCard } from './dashboard-quick-action-card'
import type { AdminRole } from '@/lib/admin/types'

interface DashboardQuickActionsProps {
  role: AdminRole
  base: string
}

export function DashboardQuickActions({ role, base }: DashboardQuickActionsProps) {
  const visibleActions = QUICK_ACTION_CONFIGS.filter((action) =>
    can(role, action.resource, 'create'),
  )

  if (visibleActions.length === 0) return null

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {visibleActions.map((action) => (
          <DashboardQuickActionCard
            key={action.label}
            label={action.label}
            href={`${base}/${action.path}`}
            icon={action.icon}
          />
        ))}
      </div>
    </section>
  )
}
