'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Save, Loader2, Upload, X, CalendarDays, Images, Calendar } from 'lucide-react'
import Image from 'next/image'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { UploadPhotosClient } from './upload-photos-client'
import { signAndUpload } from './upload-helpers'

const EVENT_TYPES = [
  { slug: 'term-1',  label: 'Term 1' },
  { slug: 'term-2',  label: 'Term 2' },
  { slug: 'term-3',  label: 'Term 3' },
  { slug: 'special', label: 'Special / Annual' },
]

const eventSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  event_date: z.string().min(1, 'Event date is required').regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  description: z.string().optional(),
  category_slug: z.string().optional(),
})

type EventValues = z.infer<typeof eventSchema>

export function UploadEventClient() {
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [createdEventId, setCreatedEventId] = useState<string | null>(null)
  const [createdTitle, setCreatedTitle] = useState('')

  const form = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: '', event_date: '', description: '', category_slug: '' },
  })

  const { isSubmitting } = form.formState
  const selectedType = form.watch('category_slug')

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (coverPreview) URL.revokeObjectURL(coverPreview)
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  function removeCover() {
    if (coverPreview) URL.revokeObjectURL(coverPreview)
    setCoverFile(null)
    setCoverPreview(null)
    if (coverInputRef.current) coverInputRef.current.value = ''
  }

  async function onSubmit(values: EventValues) {
    // 1. Upload cover photo first if provided
    let coverAssetId: string | null = null

    if (coverFile) {
      try {
        const { assetId } = await signAndUpload({
          file: coverFile,
          folder: 'gallery/events/covers',
          alt: `Cover for ${values.title}`,
          title: values.title,
          skipGalleryEntry: true,
        })
        coverAssetId = assetId
      } catch (err) {
        toast.error((err as Error).message ?? 'Cover upload failed')
        return
      }
    }

    // 2. Create the event
    const res = await fetch('/api/admin/gallery/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: values.title,
        event_date: values.event_date,
        description: values.description || null,
        category_slug: values.category_slug || null,
        cover_asset_id: coverAssetId,
      }),
    })

    const resJson = await res.json()
    if (res.ok) {
      setCreatedTitle(values.title)
      setCreatedEventId(resJson.id)
      toast.success('Event album created!')
    } else {
      toast.error(resJson.error ?? 'Failed to create event')
    }
  }

  function resetAll() {
    form.reset()
    removeCover()
    setCreatedEventId(null)
    setCreatedTitle('')
  }

  // After event creation — show photo uploader for this album
  if (createdEventId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Images className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Album created</p>
              <p className="text-xs text-muted-foreground">{createdTitle} - now add photos below</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={resetAll}>
            New Event
          </Button>
        </div>

        <UploadPhotosClient eventId={createdEventId} eventTitle={createdTitle} />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Speech and Prize Giving Day 2025" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="event_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date *</FormLabel>
                <FormControl>
                  {/*
                    Hide the browser's native calendar indicator, then overlay our
                    own Calendar icon pinned to the right. The transparent indicator
                    still covers the full input so clicking the icon opens the picker.
                  */}
                  <div className="relative">
                    <Input
                      type="date"
                      {...field}
                      className="pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Brief description shown on the public gallery page..."
                  rows={3}
                />
              </FormControl>
              <FormDescription className="text-[11px]">
                Optional. Shown beneath the event title on the public gallery.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Event Type <span className="font-normal normal-case text-muted-foreground">(optional)</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EVENT_TYPES.map((type) => {
              const active = selectedType === type.slug
              return (
                <button
                  key={type.slug}
                  type="button"
                  onClick={() => form.setValue('category_slug', active ? '' : type.slug)}
                  className={cn(
                    'rounded-xl border p-3 text-left transition-all',
                    active
                      ? 'border-primary bg-primary/8 ring-1 ring-primary/20'
                      : 'border-border bg-card hover:border-primary/30 hover:bg-primary/[0.02]',
                  )}
                >
                  <CalendarDays className={cn('w-4 h-4 mb-2', active ? 'text-primary' : 'text-muted-foreground')} />
                  <p className={cn('text-xs font-semibold', active ? 'text-primary' : 'text-foreground')}>
                    {type.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Cover Photo <span className="font-normal normal-case text-muted-foreground">(optional)</span>
          </p>
          {coverPreview ? (
            <div className="relative w-48 aspect-[3/2] rounded-xl overflow-hidden border bg-muted group">
              <Image src={coverPreview} alt="Cover preview" fill className="object-cover" sizes="192px" />
              <button
                type="button"
                onClick={removeCover}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove cover photo"
              >
                <X className="w-3.5 h-3.5 text-foreground" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload cover photo
            </button>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
          <p className="text-[10px] text-muted-foreground">
            Used as the album thumbnail on the public gallery events page.
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Creating...</>
              : <><Save className="w-3.5 h-3.5 mr-2" /> Create Event Album</>}
          </Button>
        </div>
      </form>
    </Form>
  )
}
