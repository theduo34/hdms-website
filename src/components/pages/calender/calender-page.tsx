import { Suspense } from "react"
import { SmoothScroll } from "@/components/layout/smooth-scroll"
import CalenderClient from "@/features/calender/calender-client"

export function CalenderPage() {
    return (
        <main className="flex items-start justify-start w-full min-h-screen bg-background font-sans">
            <SmoothScroll>
                <div className="flex w-full flex-col bg-background">
                    <Suspense>
                        <CalenderClient />
                    </Suspense>
                </div>
            </SmoothScroll>
        </main>
    )
}
