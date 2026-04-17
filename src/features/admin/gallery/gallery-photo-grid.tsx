'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ImageIcon, Upload, Trash2, Star } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { getMediaUrl } from '@/lib/media'

interface GalleryPhoto {
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

interface GalleryPhotoGridProps {
  canDelete: boolean
  canCreate: boolean
}

export function GalleryPhotoGrid({ canDelete, canCreate }: GalleryPhotoGridProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/gallery?type=photos&page=${page}`)
    const json = await res.json()
    setPhotos(json.data ?? [])
    setTotal(json.count ?? 0)
    setLoading(false)
  }, [page])

  useEffect(() => { load() }, [load])

  async function deletePhoto(id: string) {
    const res = await fetch(`/api/admin/gallery?id=${id}&type=photo`, { method: 'DELETE' })
    if (res.ok) { toast.success('Photo deleted'); load() }
    else { const j = await res.json(); toast.error(j.error ?? 'Delete failed') }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-4/3 rounded-xl" />
        ))}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
          <ImageIcon className="w-7 h-7 text-primary/30" />
        </div>
        <p className="text-sm font-semibold text-foreground">No photos yet</p>
        <p className="text-xs text-muted-foreground mt-1 mb-5">Upload your first photo to get started.</p>
        {canCreate && (
          <Link href="/admin/gallery/upload">
            <Button size="sm">
              <Upload className="w-3.5 h-3.5 mr-2" /> Upload Photos
            </Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground tabular-nums">
        {total} photo{total !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-4/3 rounded-xl overflow-hidden bg-muted ring-1 ring-border/50 hover:ring-primary/20 transition-all duration-300"
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

            {/* Persistent featured star */}
            {photo.featured && (
              <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-secondary flex items-center justify-center shadow-sm">
                <Star className="w-2.5 h-2.5 text-primary" fill="currentColor" />
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 gap-1">
              <p className="text-white text-[11px] font-medium truncate leading-tight">
                {photo.asset?.title ?? photo.asset?.alt ?? 'Untitled'}
              </p>

              {canDelete && (
                <div className="flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="w-7 h-7 rounded-lg bg-destructive/90 hover:bg-destructive flex items-center justify-center transition shrink-0"
                        aria-label="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this photo?</AlertDialogTitle>
                        <AlertDialogDescription>
                          The photo and its file will be permanently removed from storage.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => deletePhoto(photo.id)}
                        >
                          Delete
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

      {total > 20 && (
        <div className="flex justify-center items-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-xs text-muted-foreground tabular-nums">
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page * 20 >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
