'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { useAdminBase } from '@/hooks/use-admin-base'
import { can } from '@/lib/admin/permissions'
import { Button } from '@/components/ui/button'
import { NewsList } from './news-list'

export function NewsClient() {
  const base = useAdminBase()
  const { admin } = useAdminUser()
  const role = admin?.profile.role ?? 'support_admin'

  const canDelete = can(role, 'news', 'delete')
  const canCreate = can(role, 'news', 'create')
  const canEdit = can(role, 'news', 'update')

  return (
    <>
      <AdminHeader title="News & Posts" />

      <main className="admin-page space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">News & Posts</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Manage articles, announcements, and press releases.</p>
          </div>
          {canCreate && (
            <Link href={`${base}/news/new`}>
              <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" /> New Post</Button>
            </Link>
          )}
        </div>

        <NewsList canDelete={canDelete} canCreate={canCreate} canEdit={canEdit} />
      </main>
    </>
  )
}
