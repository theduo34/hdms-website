import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { PhotoStripClient } from '@/features/admin/campus/photo-strip-client'

export const metadata: Metadata = {
    title: 'Photo Strip | Admin',
    description: 'Manage the home page photo strip images.',
}

export default async function PhotoStripPage() {
    const admin = await getCurrentAdmin()
    if (!admin) redirect('/login')
    return <PhotoStripClient role={admin.profile.role} />
}
