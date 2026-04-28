import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { SessionGuard } from '@/components/admin/session-guard'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/login?error=not_admin')

  const { profile } = admin

  // The portal token is stored in the hdm_portal cookie by the proxy (middleware).
  // Reading it server-side avoids any client-side SSR mismatch.
  const cookieStore = await cookies()
  const portalToken = cookieStore.get('hdm_portal')?.value ?? ''

  return (
    <SidebarProvider defaultOpen={true}>
      <SessionGuard />
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar
          role={profile.role}
          displayName={profile.display_name}
          email={profile.email}
          token={portalToken}
        />
        <SidebarInset className="flex-1 min-w-0">
          {children}
        </SidebarInset>
      </div>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  )
}
