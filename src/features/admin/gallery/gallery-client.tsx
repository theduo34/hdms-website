'use client'

import Link from 'next/link'
import { Upload } from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { can } from '@/lib/admin/permissions'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GalleryPhotoGrid } from './gallery-photo-grid'
import { GalleryEventsGrid } from './gallery-events-grid'
import { GalleryVideosList } from './gallery-videos-list'

export function GalleryClient() {
  const { admin, loading: authLoading } = useAdminUser()
  if (authLoading) return null

  const role = admin?.profile.role ?? 'support_admin'
  const canCreate = can(role, 'gallery', 'create')
  const canDelete = can(role, 'gallery', 'delete')

  return (
    <>
      <AdminHeader title="Gallery" />

      <main className="admin-page space-y-6 w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Gallery</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage photos, videos, and event albums displayed on the website.
            </p>
          </div>
          {canCreate && (
            <Link href="/admin/gallery/upload" className="flex-shrink-0">
              <Button size="sm">
                <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload
              </Button>
            </Link>
          )}
        </div>

        <Tabs defaultValue="photos">
          <TabsList>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="events">Event Albums</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-6">
            <GalleryPhotoGrid canDelete={canDelete} canCreate={canCreate} />
          </TabsContent>
          <TabsContent value="videos" className="mt-6">
            <GalleryVideosList canDelete={canDelete} canCreate={canCreate} />
          </TabsContent>
          <TabsContent value="events" className="mt-6">
            <GalleryEventsGrid canDelete={canDelete} canCreate={canCreate} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
