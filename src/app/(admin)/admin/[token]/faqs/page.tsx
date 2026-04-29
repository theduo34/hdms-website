import { Metadata } from 'next'
import { FAQsClient } from '@/features/admin/faqs/faqs-client'

export const metadata: Metadata = {
  title: 'FAQs | Admin',
  description: 'Manage frequently asked questions on the admissions page.',
}

export default function FAQsAdminPage() {
  return <FAQsClient />
}
