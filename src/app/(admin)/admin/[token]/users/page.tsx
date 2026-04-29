import { Metadata } from 'next'
import { UsersClient } from '@/features/admin/users/users-client'

export const metadata: Metadata = {
  title: 'Admin Users | Admin',
  description: 'Manage admin accounts and their access levels.',
}

export default function UsersAdminPage() {
  return <UsersClient />
}
