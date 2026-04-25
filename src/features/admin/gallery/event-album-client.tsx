'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ImageIcon, Upload, Trash2, Star, CalendarDays, Images } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AdminHeader } from '@/components/admin/admin-header'
import { getMediaUrl } from '@/lib/media'
import { UploadPhotosClient } from './upload-photos-client'

interface EventPhoto {
  id: string
  created_at: string
  featured: boolean
  asset: {
    id: string
    storage_path: string | null
    alt: string
    title: string | null
  } | null
}

interface EventAlbumData {
  id: string
  title: string
  description: string | null
  event_date: string
  photo_count: number
  cover: { storage_path: string | null; alt: string } | null
}

interface EventAlbumClientProps {
  eventId: string
  canDelete: boolean
  canCreate: boolean
}

export function EventAlbumClient({ eventId, canDelete, canCreate }: EventAlbumClientProps) {
  const [event, setEvent] = useState<EventAlbumData | null>(null)
  const [photos, setPhotos] = useState<EventPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [photoTotal, setPhotoTotal] = useState(0)
  const [showUpload, setShowUpload] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const [eventRes, photosRes] = await Promise.all([
      fetch(`/api/admin/gallery?type=events`),
      fetch(`/api/admin/gallery?type=photos&event_id=${eventId}&page=1`),
    ])

    const eventsJson = await eventRes.json()
    const photosJson = await photosRes.json()

    const foundEvent = (eventsJson.data ?? []).find((e: EventAlbumData) => e.id === eventId)
    setEvent(foundEvent ?? null)
    setPhotos(photosJson.data ?? [])
    setPhotoTotal(photosJson.count ?? 0)
    setLoading(false)
  }, [eventId])

  useEffect(() => { load() }, [load])

  async function removePhoto(photoId: string) {
    const res = await fetch(`/api/admin/gallery?id=${photoId}&type=photo`, { method: 'DELETE' })
    if (res.ok) { toast.success('Photo removed'); load() }
    else { const j = await res.json(); toast.error(j.error ?? 'Delete failed') }
  }

  if (loading) {
    return (
      <>
        <AdminHeader title="Event Album" backHref="/admin/gallery" />
        <main className="admin-page space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
            ))}
          </div>
        </main>
      </>
    )
  }

  if (!event) {
    return (
      <>
        <AdminHeader title="Event Album" backHref="/admin/gallery" />
        <main className="admin-page">
          <p className="text-sm text-muted-foreground">Event not found.</p>
        </main>
      </>
    )
  }

  return (
    <>
      <AdminHeader title={event.title} backHref="/admin/gallery" />

      <main className="admin-page space-y-6">
        {/* Event info row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{event.title}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {new Date(event.event_date).toLocaleDateString('en-GH', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Images className="w-3.5 h-3.5" />
                {photoTotal} photo{photoTotal !== 1 ? 's' : ''}
              </span>
            </div>
            {event.description && (
              <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">{event.description}</p>
            )}
          </div>

          {canCreate && (
            <Button
              size="sm"
              onClick={() => setShowUpload((v) => !v)}
              variant={showUpload ? 'outline' : 'default'}
              className="flex-shrink-0 self-start sm:self-auto"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              {showUpload ? 'Hide Uploader' : 'Add Photos'}
            </Button>
          )}
        </div>

        {/* Inline uploader */}
        {showUpload && (
          <div className="rounded-xl border border-border p-5 space-y-4 bg-card">
            <p className="text-sm font-semibold text-foreground">
              Add photos to this album
            </p>
            <UploadPhotosClient
              eventId={eventId}
              eventTitle={event.title}
            />
          </div>
        )}

        {/* Photo grid */}
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
              <ImageIcon className="w-7 h-7 text-primary/30" />
            </div>
            <p className="text-sm font-semibold text-foreground">No photos yet</p>
            <p className="text-xs text-muted-foreground mt-1 mb-5">
              Use the button above to add photos to this album.
            </p>
            {canCreate && (
              <Button size="sm" onClick={() => setShowUpload(true)}>
                <Upload className="w-3.5 h-3.5 mr-2" /> Add Photos
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-muted ring-1 ring-border/50 hover:ring-primary/20 transition-all duration-300"
              >
                {photo.asset?.storage_path ? (
                  <Image
                    src={getMediaUrl(photo.asset.storage_path)}
                    alt={photo.asset.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}

                {/* Featured star */}
                {photo.featured && (
                  <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-secondary flex items-center justify-center shadow-sm">
                    <Star className="w-2.5 h-2.5 text-primary" fill="currentColor" />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 gap-1">
                  <p className="text-white text-[11px] font-medium truncate leading-tight">
                    {photo.asset?.title ?? photo.asset?.alt ?? 'Untitled'}
                  </p>
                  {canDelete && (
                    <div className="flex justify-end">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="w-7 h-7 rounded-lg bg-destructive/90 hover:bg-destructive flex items-center justify-center transition flex-shrink-0"
                            aria-label="Remove photo from album"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-white" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove this photo?</AlertDialogTitle>
                            <AlertDialogDescription>
                              The photo will be permanently deleted from the gallery and storage.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => removePhoto(photo.id)}
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {photoTotal > 20 && (
          <div className="flex justify-center">
            <Link href={`/admin/gallery?tab=events`}>
              <Button variant="outline" size="sm">View all in Gallery</Button>
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
