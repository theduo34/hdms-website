import { Activity } from 'lucide-react'
import { DashboardRecentNews } from './dashboard-recent-news'
import { DashboardRecentUploads } from './dashboard-recent-uploads'
import type { DashboardActivity } from './dashboard-types'

interface DashboardRecentActivityProps {
  activity: DashboardActivity
}

export function DashboardRecentActivity({ activity }: DashboardRecentActivityProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DashboardRecentNews posts={activity.recentNews} />
        <DashboardRecentUploads assets={activity.recentPhotos} />
      </div>
    </section>
  )
}
