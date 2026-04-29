'use client'

import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminBase } from '@/hooks/use-admin-base'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageIcon, Video, CalendarDays } from 'lucide-react'
import { UploadPhotosClient } from './upload-photos-client'
import { UploadVideoClient } from './upload-video-client'
import { UploadEventClient } from './upload-event-client'

export function UploadClient() {
  const base = useAdminBase()
  return (
    <>
      <AdminHeader title="Upload Media" backHref={`${base}/gallery`} />

      <main className="admin-page space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Upload Media</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Add photos, videos, or create an event album for the public gallery.
          </p>
        </div>

        <Tabs defaultValue="photos">
          <TabsList className="">
            <TabsTrigger value="photos" className="gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className=" gap-1.5">
              <Video className="w-3.5 h-3.5" /> Videos
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" /> New Event
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-6">
            <UploadPhotosClient />
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <UploadVideoClient />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <UploadEventClient />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
