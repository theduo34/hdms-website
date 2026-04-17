import Link from 'next/link'
import { Newspaper, ArrowRight } from 'lucide-react'
import type { RecentPost } from './dashboard-types'

interface DashboardRecentNewsProps {
  posts: RecentPost[]
}

export function DashboardRecentNews({ posts }: DashboardRecentNewsProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 rounded-full bg-primary" />
          <h3 className="text-sm font-semibold text-foreground">Recent News</h3>
        </div>
        <Link
          href="/admin/news"
          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="divide-y divide-border">
        {posts.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Newspaper className="w-8 h-8 mx-auto mb-2 text-muted-foreground/25" />
            <p className="text-sm text-muted-foreground">No news posts yet.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/news/${post.id}`}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-accent/50 transition-colors group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {post.headline}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(post.published_at).toLocaleDateString('en-GH', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {' · '}
                  <span className="capitalize">{post.category_label || post.category}</span>
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
