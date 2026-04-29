'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Video, Upload, Trash2, Play, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { useAdminBase } from '@/hooks/use-admin-base'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { getMediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'

interface GalleryVideo {
  id: string
  title: string
  alt: string
  video_url: string
  duration: string | null
  created_at: string
  category: { id: string; slug: string; label: string } | null
  thumbnail: { id: string; storage_path: string | null; alt: string } | null
}

interface GalleryVideosListProps {
  canDelete: boolean
  canCreate: boolean
}

export function GalleryVideosList({ canDelete, canCreate }: GalleryVideosListProps) {
  const base = useAdminBase()
  const [videos, setVideos] = useState<GalleryVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/gallery/videos?page=${page}`)
    const json = await res.json()
    setVideos(json.data ?? [])
    setTotal(json.total ?? 0)
    setLoading(false)
  }, [page])

  useEffect(() => { load() }, [load])

  async function deleteVideo(id: string) {
    const res = await fetch(`/api/admin/gallery/videos?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Video removed'); load() }
    else { const j = await res.json(); toast.error(j.error ?? 'Delete failed') }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-video rounded-xl" />
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
          <Video className="w-7 h-7 text-primary/30" />
        </div>
        <p className="text-sm font-semibold text-foreground">No videos yet</p>
        <p className="text-xs text-muted-foreground mt-1 mb-5">Add your first video to get started.</p>
        {canCreate && (
          <Link href={`${base}/gallery/upload`}>
            <Button size="sm">
              <Upload className="w-3.5 h-3.5 mr-2" /> Add Video
            </Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground tabular-nums">
        {total} video{total !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative rounded-xl overflow-hidden bg-muted ring-1 ring-border/50 hover:ring-primary/20 transition-all duration-300"
          >
            <div className="relative aspect-video">
              {video.thumbnail?.storage_path ? (
                <Image
                  src={getMediaUrl(video.thumbnail.storage_path)}
                  alt={video.thumbnail.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-primary/5">
                  <Video className="w-10 h-10 text-primary/20" />
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                  'w-10 h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm transition-transform duration-300',
                  'group-hover:scale-110',
                )}>
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
              </div>

              {video.duration && (
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white rounded px-1.5 py-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  <span className="text-[10px] font-mono">{video.duration}</span>
                </div>
              )}

              {video.category && (
                <div className="absolute top-2 left-2 bg-primary/80 text-primary-foreground rounded px-1.5 py-0.5 text-[10px] font-semibold">
                  {video.category.label}
                </div>
              )}
            </div>

            <div className="p-3 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-foreground truncate">{video.title}</p>

              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex-shrink-0 w-6 h-6 rounded-lg bg-muted hover:bg-destructive/10 flex items-center justify-center transition-colors group/del"
                      aria-label="Delete video"
                    >
                      <Trash2 className="w-3 h-3 text-muted-foreground group-hover/del:text-destructive transition-colors" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove this video?</AlertDialogTitle>
                      <AlertDialogDescription>
                        The video entry and its thumbnail (if any) will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => deleteVideo(video.id)}
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ))}
      </div>

      {total > 24 && (
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
            Page {page} of {Math.ceil(total / 24)}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page * 24 >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
