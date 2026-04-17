import { ImageIcon, Newspaper, CalendarDays, Users2, HelpCircle } from 'lucide-react'
import type { ComponentType } from 'react'
import type { AdminResource } from '@/lib/admin/types'
import type { DashboardStats } from './dashboard-types'

export interface StatCardConfig {
  label: string
  statKey: keyof DashboardStats
  href: string
  icon: ComponentType<{ className?: string }>
}

export interface QuickActionConfig {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
  resource: AdminResource
}

export const STAT_CARD_CONFIGS: StatCardConfig[] = [
  { label: 'Gallery Photos', statKey: 'photos', href: '/admin/gallery', icon: ImageIcon },
  { label: 'News Posts', statKey: 'news', href: '/admin/news', icon: Newspaper },
  { label: 'Event Albums', statKey: 'events', href: '/admin/gallery', icon: CalendarDays },
  { label: 'Active Staff', statKey: 'staff', href: '/admin/staff', icon: Users2 },
  { label: 'Admissions FAQs', statKey: 'faqs', href: '/admin/faqs', icon: HelpCircle },
]

export const QUICK_ACTION_CONFIGS: QuickActionConfig[] = [
  { label: 'Upload Photos', href: '/admin/gallery/upload', icon: ImageIcon, resource: 'gallery' },
  { label: 'Write News Post', href: '/admin/news/new', icon: Newspaper, resource: 'news' },
  { label: 'Add Calendar Event', href: '/admin/calendar', icon: CalendarDays, resource: 'calendar' },
]
