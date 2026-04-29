import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { FacilitiesClient } from '@/features/admin/campus/facilities-client'

export const metadata: Metadata = {
    title: 'Campus Facilities | Admin',
    description: 'Manage campus facility images and descriptions.',
}

export default async function FacilitiesAdminPage() {
    const admin = await getCurrentAdmin()
    if (!admin) redirect('/login')
    return <FacilitiesClient role={admin.profile.role} />
}
