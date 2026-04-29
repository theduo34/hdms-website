import { notFound, redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { SessionGuard } from '@/components/admin/session-guard'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

export default async function AdminTokenLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  if (!process.env.ADMIN_PORTAL_TOKEN || token !== process.env.ADMIN_PORTAL_TOKEN) {
    notFound()
  }

  const admin = await getCurrentAdmin()
  if (!admin) redirect(`/login/${token}`)

  const { profile } = admin

  return (
    <SidebarProvider defaultOpen={true}>
      <SessionGuard />
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar
          role={profile.role}
          displayName={profile.display_name}
          email={profile.email}
          token={token}
        />
        <SidebarInset className="flex-1 min-w-0">
          {children}
        </SidebarInset>
      </div>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  )
}
