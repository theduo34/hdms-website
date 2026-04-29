import { ImageIcon, Newspaper, CalendarDays, Users2, HelpCircle } from 'lucide-react'
import type { ComponentType } from 'react'
import type { AdminResource } from '@/lib/admin/types'
import type { DashboardStats } from './dashboard-types'

export interface StatCardConfig {
  label: string
  statKey: keyof DashboardStats
  path: string
  icon: ComponentType<{ className?: string }>
}

export interface QuickActionConfig {
  label: string
  path: string
  icon: ComponentType<{ className?: string }>
  resource: AdminResource
}

export const STAT_CARD_CONFIGS: StatCardConfig[] = [
  { label: 'Gallery Photos',  statKey: 'photos', path: 'gallery',       icon: ImageIcon },
  { label: 'News Posts',      statKey: 'news',   path: 'news',          icon: Newspaper },
  { label: 'Event Albums',    statKey: 'events', path: 'gallery',       icon: CalendarDays },
  { label: 'Active Staff',    statKey: 'staff',  path: 'staff',         icon: Users2 },
  { label: 'Admissions FAQs', statKey: 'faqs',   path: 'faqs',          icon: HelpCircle },
]

export const QUICK_ACTION_CONFIGS: QuickActionConfig[] = [
  { label: 'Upload Photos',      path: 'gallery/upload', icon: ImageIcon,   resource: 'gallery' },
  { label: 'Write News Post',    path: 'news/new',       icon: Newspaper,   resource: 'news' },
  { label: 'Add Calendar Event', path: 'calendar',       icon: CalendarDays, resource: 'calendar' },
]
