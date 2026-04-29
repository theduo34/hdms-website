import { Metadata } from 'next'
import { EditPostClient } from '@/features/admin/news/edit-post-client'

export const metadata: Metadata = {
  title: 'Edit Post | Admin',
  description: 'Edit internal or published news and announcements.',
}

export default function EditNewsPostPage() {
  return <EditPostClient />
}
