import { redirect } from 'next/navigation'

export default function NewGalleryEventPage() {
  redirect('/admin/gallery/upload?tab=events')
}
