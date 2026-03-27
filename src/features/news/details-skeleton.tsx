export function DetailSkeleton() {
    return (
        <main className="flex flex-col w-full min-h-screen bg-background">
            <div className="w-full aspect-[21/9] max-h-[560px] bg-muted animate-pulse" />
            <div className="max-w-[760px] mx-auto w-full px-6 py-16">
                <div className="h-4 w-32 bg-muted rounded-full animate-pulse mb-10" />
                <div className="space-y-3 mb-10">
                    <div className="h-10 bg-muted rounded animate-pulse" />
                    <div className="h-10 w-5/6 bg-muted rounded animate-pulse" />
                    <div className="h-10 w-3/5 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-16 h-0.5 bg-muted animate-pulse mb-10" />
                <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={`h-4 bg-muted rounded animate-pulse ${i % 4 === 3 ? 'w-3/4' : 'w-full'}`} />
                    ))}
                </div>
            </div>
        </main>
    )
}
