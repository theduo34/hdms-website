export type PostCategory = 'news' | 'announcement' | 'event' | 'press'

export interface ArticleContent {
    type: 'paragraph' | 'pullquote'
    text: string
}

export interface Post {
    id: string
    slug: string
    category: PostCategory
    categoryLabel: string
    date: string
    image: string
    imageAlt: string
    headline: string
    excerpt: string
    author: string
    author_tag: string
    content: ArticleContent[]
}

export interface Announcement {
    id: string
    slug: string
    headline: string
    excerpt: string
    date: string
}

export interface TermRow {
    name: string
    start: string
    end: string
    duration: string
    isCurrent?: boolean
    isBreak?: boolean
}

export function categoryBadgeClass(cat: PostCategory): string {
    const map: Record<PostCategory, string> = {
        news:         'bg-accent text-accent-foreground',
        announcement: 'bg-destructive text-destructive-foreground',
        event:        'bg-primary text-primary-foreground',
        press:        'bg-muted text-foreground',
    }
    return map[cat]
}
