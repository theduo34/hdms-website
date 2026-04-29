import { Metadata } from 'next'
import { GalleryClient } from '@/features/admin/gallery/gallery-client'

export const metadata: Metadata = {
  title: 'Gallery | Admin',
  description: 'Manage photos and event albums for the website.',
}

export default function GalleryAdminPage() {
  return <GalleryClient />
}
