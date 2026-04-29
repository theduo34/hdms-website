import { Metadata } from 'next'
import { UploadClient } from '@/features/admin/gallery/upload-client'

export const metadata: Metadata = {
  title: 'Upload Photos | Admin',
  description: 'Upload images to the website gallery.',
}

export default function GalleryUploadPage() {
  return <UploadClient />
}
