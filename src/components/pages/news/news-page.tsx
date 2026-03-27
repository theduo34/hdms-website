"use client";

import { Suspense } from 'react'
import NewsClient from "@/features/news/news-client";

export function NewsPage() {
    return (
        <main className="flex flex-col w-full min-h-screen">
            <Suspense>
                <NewsClient />
            </Suspense>
        </main>
    );
}
