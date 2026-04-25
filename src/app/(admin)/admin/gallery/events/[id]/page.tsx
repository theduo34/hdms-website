import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { can } from '@/lib/admin/permissions'
import { EventAlbumClient } from '@/features/admin/gallery/event-album-client'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EventAlbumPage({ params }: Props) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/login?error=not_admin')

  const { id } = await params
  const role = admin.profile.role

  return (
    <EventAlbumClient
      eventId={id}
      canDelete={can(role, 'gallery', 'delete')}
      canCreate={can(role, 'gallery', 'create')}
    />
  )
}
