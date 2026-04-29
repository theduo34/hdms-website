import { Metadata } from 'next'
import { StaffClient } from '@/features/admin/staff/staff-client'

export const metadata: Metadata = {
  title: 'Staff | Admin',
  description: 'Manage teachers and staff members displayed on the website.',
}

export default function StaffAdminPage() {
  return <StaffClient />
}
