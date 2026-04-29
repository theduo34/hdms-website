'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Pencil, Trash2, Newspaper, Plus, Star, Loader2 } from 'lucide-react'
import { useAdminBase } from '@/hooks/use-admin-base'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { CATEGORY_STYLES } from './news-data'

interface Post {
  id: string
  slug: string
  headline: string
  category: string
  category_label: string
  author: string
  featured: boolean
  published_at: string
}

interface NewsListProps {
  canDelete: boolean
  canCreate: boolean
  canEdit: boolean
}

const PAGE_SIZE = 10

export function NewsList({ canDelete, canCreate, canEdit }: NewsListProps) {
  const base = useAdminBase()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchPage = useCallback(async (pageNum: number, append: boolean) => {
    const res = await fetch(`/api/admin/news?page=${pageNum}&limit=${PAGE_SIZE}`)
    const json = await res.json()
    const incoming = json.data ?? []
    if (append) {
      setPosts((prev) => [...prev, ...incoming])
    } else {
      setPosts(incoming)
    }
    setTotal(json.count ?? 0)
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchPage(1, false).finally(() => setLoading(false))
    setPage(1)
  }, [fetchPage])

  async function handleLoadMore() {
    const next = page + 1
    setLoadingMore(true)
    await fetchPage(next, true)
    setPage(next)
    setLoadingMore(false)
  }

  async function deletePost(id: string) {
    const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Post deleted')
      setPosts((prev) => prev.filter((p) => p.id !== id))
      setTotal((t) => t - 1)
    } else {
      const j = await res.json()
      toast.error(j.error ?? 'Delete failed')
    }
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
          <Newspaper className="w-7 h-7 text-primary/30" />
        </div>
        <p className="text-sm font-semibold text-foreground">No posts yet</p>
        <p className="text-xs text-muted-foreground mt-1 mb-5">Write your first news post to get started.</p>
        {canCreate && (
          <Link href={`${base}/news/new`}>
            <Button size="sm"><Plus className="w-3.5 h-3.5 mr-2" /> Write First Post</Button>
          </Link>
        )}
      </div>
    )
  }

  const hasMore = posts.length < total

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground tabular-nums">{total} post{total !== 1 ? 's' : ''}</p>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {posts.map((post, i) => (
          <div
            key={post.id}
            className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-border' : ''} hover:bg-accent/30 transition-colors`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {post.featured && (
                  <Star className="w-3 h-3 text-secondary flex-shrink-0" fill="currentColor" />
                )}
                <span className="font-medium text-sm text-foreground line-clamp-1">{post.headline}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className={`inline-flex items-center rounded-full px-1.5 py-0 text-[10px] font-medium ${CATEGORY_STYLES[post.category] ?? 'bg-muted text-muted-foreground'}`}>
                  {post.category_label || post.category}
                </span>
                <span className="text-[11px] text-muted-foreground hidden sm:inline">
                  {post.author}
                </span>
                <span className="text-border hidden sm:inline">·</span>
                <span className="text-[11px] text-muted-foreground hidden sm:inline">
                  {new Date(post.published_at).toLocaleDateString('en-GH', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {canEdit && (
                <Link href={`${base}/news/${post.id}`}>
                  <button
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
                    aria-label="Edit post"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </Link>
              )}
              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                      aria-label="Delete post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                      <AlertDialogDescription>
                        &quot;{post.headline}&quot; will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => deletePost(post.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore
              ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Loading...</>
              : `Load more (${total - posts.length} remaining)`}
          </Button>
        </div>
      )}
    </div>
  )
}
