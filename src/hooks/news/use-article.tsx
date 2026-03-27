'use client';

import {allPosts, Post} from "@/features/news/news";
import {useState, useEffect} from "react";

export function useArticle(slug: string) {
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        // Replace with fetch(api.hdm.edu.gh/news/${slug}) when API is ready
        const t = setTimeout(() => {
            setPost(allPosts.find((p) => p.slug === slug) ?? null)
            setLoading(false)
        }, 600)
        return () => clearTimeout(t)
    }, [slug])

    return { loading, post }
}
