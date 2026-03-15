import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "School Calendar",
    description: "View the Heaven's Dew Montessori school calendar. Stay on top of term dates, holidays, events, and important academic dates for the school year in Koforidua, Ghana.",
    openGraph: {
        title: "School Calendar",
        description: "Never miss an important date. Browse the full Heaven's Dew Montessori school calendar — term dates, holidays, and key events all in one place.",
        url: "https://www.hdm.edu.gh/calender",
    },
    twitter: {
        title: "School Calendar",
        description: "Never miss an important date. Browse the full Heaven's Dew Montessori school calendar — term dates, holidays, and key events all in one place.",
    },
}

import { CalenderPage } from "@/components/pages/calender/calender-page";

export default function Calender() {
    return <CalenderPage />
}