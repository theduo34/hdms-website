'use client';

import {categoryBadgeClass, Post} from "@/features/news/news";
import Image from "next/image";
import Link from "next/link";
import {headingStyle} from "@/styles/font";

export function RelatedCard({ post }: { post: Post }) {
    return (
        <Link
            href={`/news-&-announcements/${post.slug}`}
            className="group flex flex-col bg-card rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, 33vw"
                    loading="lazy"
                    className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span className={`absolute bottom-3 left-3 text-[0.58rem] font-bold tracking-[0.18em] uppercase px-3 py-1 ${categoryBadgeClass(post.category)}`}>
                    {post.categoryLabel}
                </span>
            </div>
            <div className="p-5">
                <span className="text-[0.65rem] font-light text-muted-foreground mb-2 block">{post.date}</span>
                <h3 className="text-[1rem] font-semibold text-foreground leading-[1.3] line-clamp-2" style={headingStyle}>
                    {post.headline}
                </h3>
            </div>
        </Link>
    )
}
