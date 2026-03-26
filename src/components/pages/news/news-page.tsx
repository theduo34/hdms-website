"use client";

import NewsClient from "@/features/news/news-client";

export function NewsPage() {
    return (
        <main className="flex flex-col w-full min-h-screen">
            <NewsClient />
        </main>
    );
}
