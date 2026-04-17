'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  ImageIcon,
  Newspaper,
  CalendarDays,
  Users2,
  HelpCircle,
  UsersRound,
  GraduationCap,
  LogOut,
  UserCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AdminRole } from '@/lib/admin/types'
import { can } from '@/lib/admin/permissions'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  resource?: Parameters<typeof can>[1]
}

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Gallery', href: '/admin/gallery', icon: ImageIcon, resource: 'gallery' },
  { title: 'News & Posts', href: '/admin/news', icon: Newspaper, resource: 'news' },
  { title: 'Calendar', href: '/admin/calendar', icon: CalendarDays, resource: 'calendar' },
  { title: 'Staff', href: '/admin/staff', icon: Users2, resource: 'staff' },
  { title: 'Admissions FAQs', href: '/admin/faqs', icon: HelpCircle, resource: 'faqs' },
  { title: 'Users', href: '/admin/users', icon: UsersRound, resource: 'users' },
]

interface AdminSidebarProps {
  role: AdminRole
  displayName: string
  email: string
}

export function AdminSidebar({ role, displayName, email }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  function isActive(href: string) {
    return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
  }

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const visible = NAV_ITEMS.filter(
    (item) => !item.resource || can(role, item.resource, 'read'),
  )

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Brand */}
      <SidebarHeader className="bg-primary p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-white/10 text-primary-foreground group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-secondary">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                <span className="font-semibold text-sm text-primary-foreground">Heaven&apos;s Dew</span>
                <span className="text-[11px] text-primary-foreground/60">Admin Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="bg-primary/90 mx-0" />

      {/* Navigation */}
      <SidebarContent className="bg-primary px-2 py-2">
        <SidebarMenu>
          {visible.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={active}
                  className={cn(
                    'rounded-sm h-9 transition-all duration-150 border-none',
                    active
                      ? 'bg-secondary text-primary font-medium'
                      : 'text-primary-foreground hover:bg-secondary/40 hover:text-primary-foreground',
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0',
                        active
                          ? 'text-secondary'
                          : 'text-primary-foreground/55 group-hover/menu-button:text-primary-foreground',
                      )}
                    />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Profile footer */}
      <SidebarSeparator className="bg-primary/90 mx-0" />
      <SidebarFooter className="bg-primary p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  tooltip={displayName}
                  className="hover:bg-white/10 text-primary-foreground rounded-sm transition group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center border-none"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                    {initials}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0 group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium text-primary-foreground truncate">{displayName}</span>
                    <span className="text-[11px] text-primary-foreground/50 truncate">{email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" align="start" className="w-56 mb-1">
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center gap-2 cursor-pointer">
                    <UserCircle className="w-4 h-4" />
                    My account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center gap-2 cursor-pointer">
                    <GraduationCap className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
