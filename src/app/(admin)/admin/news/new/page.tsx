import { Metadata } from 'next'
import { NewPostClient } from '@/features/admin/news/new-post-client'

export const metadata: Metadata = {
  title: 'New Post | Admin',
  description: 'Create a new news or press post.',
}

export default function NewNewsPostPage() {
  return <NewPostClient />
}
