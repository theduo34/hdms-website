import { Metadata } from 'next'
import { CalendarClient } from '@/features/admin/calendar/calendar-client'

export const metadata: Metadata = {
  title: 'Calendar | Admin',
  description: 'Manage academic calendar events and terms.',
}

export default function CalendarAdminPage() {
  return <CalendarClient />
}
