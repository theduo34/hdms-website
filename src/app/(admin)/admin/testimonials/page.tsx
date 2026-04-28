import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { can } from '@/lib/admin/permissions'
import { TestimonialsClient } from '@/features/admin/testimonials/testimonials-client'

export const metadata = { title: 'Parent Testimonials' }

export default async function TestimonialsPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/login?error=not_admin')
  if (!can(admin.profile.role, 'testimonials', 'read')) redirect('/admin')

  return <TestimonialsClient />
}
