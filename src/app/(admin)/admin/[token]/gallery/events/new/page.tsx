import { redirect } from 'next/navigation'

export default async function NewGalleryEventPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  redirect(`/admin/${token}/gallery/upload?tab=events`)
}
