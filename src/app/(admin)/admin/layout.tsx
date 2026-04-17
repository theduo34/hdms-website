// src/app/admin/layout.tsx
// Admin layout — server component that checks auth + admin_profiles.
// All /admin/* pages are wrapped here.

import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect('/login?error=not_admin')
  }

  const { profile } = admin

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar
          role={profile.role}
          displayName={profile.display_name}
          email={profile.email}
        />
        <SidebarInset className="flex-1 min-w-0">
          {children}
        </SidebarInset>
      </div>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  )
}
