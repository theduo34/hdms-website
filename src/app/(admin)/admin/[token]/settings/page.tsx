import { Metadata } from 'next'
import { SettingsClient } from '@/features/admin/settings/settings-client'

export const metadata: Metadata = {
  title: 'Settings | Admin',
  description: 'Manage global website settings and contact information.',
}

export default function SettingsAdminPage() {
  return <SettingsClient />
}
