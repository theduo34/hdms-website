import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getCurrentAdmin } from '@/lib/admin/auth'

export const metadata: Metadata = {
  title: 'Dashboard | Admin',
  description: "Heaven's Dew Montessori admin dashboard overview.",
}
import { AdminHeader } from '@/components/admin/admin-header'
import { getDashboardStats, getDashboardActivity } from '@/features/admin/dashboard/dashboard-queries'
import { DashboardWelcome } from '@/features/admin/dashboard/dashboard-welcome'
import { DashboardStatsGrid } from '@/features/admin/dashboard/dashboard-stats-grid'
import { DashboardQuickActions } from '@/features/admin/dashboard/dashboard-quick-actions'
import { DashboardRecentActivity } from '@/features/admin/dashboard/dashboard-recent-activity'

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/login')

  const [stats, activity] = await Promise.all([
    getDashboardStats(),
    getDashboardActivity(),
  ])

  const { profile } = admin
  const firstName = profile.display_name.split(' ')[0]
  const totalItems = stats.photos + stats.news + stats.events

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="admin-page space-y-8">
        <DashboardWelcome
          firstName={firstName}
          totalItems={totalItems}
        />
        <DashboardStatsGrid stats={stats} />
        <DashboardQuickActions role={profile.role} />
        <DashboardRecentActivity activity={activity} />
      </main>
    </>
  )
}
