export function GridSkeleton() {
    return (
        <div className="max-w-[var(--max-width,1400px)] mx-auto px-4 md:px-16 py-8">
            <div className="overflow-x-auto">
                <div className="min-w-[700px] max-w-[960px] mx-auto">
                    <div
                        className="grid border-l border-t border-border rounded-xl overflow-hidden"
                        style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
                    >
                        {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className="border-r border-b border-border h-[120px] md:h-[136px] p-1.5">
                                <div className="w-5 h-5 bg-muted rounded-full ml-auto mb-2 animate-pulse" />
                                <div className="h-6 bg-muted rounded-[3px] animate-pulse mb-1" />
                                {i % 3 === 0 && <div className="h-5 bg-muted/60 rounded-[3px] animate-pulse" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ListSkeleton() {
    return (
        <div className="max-w-[var(--max-width,1400px)] mx-auto px-4 md:px-16 py-8">
            <div className="flex gap-8 items-start">
                <div className="flex-1 min-w-0">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-[72px_1fr] md:grid-cols-[96px_1fr] gap-4 md:gap-8 py-7 border-b border-border"
                        >
                            <div className="flex flex-col items-center gap-2 pt-1">
                                <div className="h-3 w-8 bg-muted rounded animate-pulse" />
                                <div className="h-11 w-11 bg-muted rounded-lg animate-pulse" />
                                <div className="h-3 w-8 bg-muted rounded animate-pulse" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="h-20 bg-muted rounded-xl animate-pulse" />
                                {i % 2 === 0 && <div className="h-16 bg-muted/70 rounded-xl animate-pulse" />}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Sidebar skeleton (desktop only) */}
                <div className="hidden lg:flex w-[300px] xl:w-[320px] shrink-0 flex-col gap-5">
                    <div className="h-52 bg-muted rounded-2xl animate-pulse" />
                    <div className="h-36 bg-muted/70 rounded-2xl animate-pulse" />
                    <div className="h-24 bg-muted/50 rounded-2xl animate-pulse" />
                </div>
            </div>
        </div>
    )
}
