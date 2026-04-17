import { Metadata } from 'next'
import { NewsClient } from '@/features/admin/news/news-client'

export const metadata: Metadata = {
  title: 'News & Posts | Admin',
  description: 'Manage news articles, announcements, and press releases.',
}

export default function NewsAdminPage() {
  return <NewsClient />
}
