'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Plus, Trash2, Images } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { getMediaUrl } from '@/lib/media'

interface GalleryEvent {
  id: string
  title: string
  description: string | null
  event_date: string
  photo_count: number
  cover: { id: string; storage_path: string | null; alt: string } | null
}

interface GalleryEventsGridProps {
  canDelete: boolean
  canCreate: boolean
}

export function GalleryEventsGrid({ canDelete, canCreate }: GalleryEventsGridProps) {
  const [events, setEvents] = useState<GalleryEvent[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/gallery?type=events')
    const json = await res.json()
    setEvents(json.data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function deleteEvent(id: string) {
    const res = await fetch(`/api/admin/gallery?id=${id}&type=event`, { method: 'DELETE' })
    if (res.ok) { toast.success('Event deleted'); load() }
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

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
          <CalendarDays className="w-7 h-7 text-primary/30" />
        </div>
        <p className="text-sm font-semibold text-foreground">No event albums yet</p>
        <p className="text-xs text-muted-foreground mt-1 mb-5">Create your first event album.</p>
        {canCreate && (
          <Link href="/admin/gallery/events/new">
            <Button size="sm">
              <Plus className="w-3.5 h-3.5 mr-2" /> New Event Album
            </Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="group relative aspect-video rounded-xl overflow-hidden bg-muted ring-1 ring-border/50 hover:ring-primary/20 hover:shadow-lg transition-all duration-300"
        >
          {/* Cover image */}
          {event.cover?.storage_path ? (
            <Image
              src={getMediaUrl(event.cover.storage_path)}
              alt={event.cover.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <CalendarDays className="w-10 h-10 text-muted-foreground/20" />
            </div>
          )}

          {/* Persistent gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Photo count badge — top right */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
            <Images className="w-3 h-3" />
            {event.photo_count}
          </div>

          {/* Event info — bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold text-sm truncate leading-tight">
                {event.title}
              </p>
              <p className="text-white/60 text-[11px] mt-0.5">
                {new Date(event.event_date).toLocaleDateString('en-GH', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Action buttons — appear on hover */}
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 flex-shrink-0">
              {/*<Link href={`/admin/gallery/events/${event.id}`}>*/}
              {/*  <Button*/}
              {/*    size="sm"*/}
              {/*    className="h-7 text-xs bg-white/20 hover:bg-white/35 text-white border-0 backdrop-blur-sm"*/}
              {/*  >*/}
              {/*    View Album*/}
              {/*  </Button>*/}
              {/*</Link>*/}

              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="h-7 w-7 rounded-lg bg-destructive/80 hover:bg-destructive flex items-center justify-center transition backdrop-blur-sm"
                      aria-label={`Delete ${event.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete &quot;{event.title}&quot;?</AlertDialogTitle>
                      <AlertDialogDescription>
                        The event album will be removed. Photos already in the gallery remain.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
