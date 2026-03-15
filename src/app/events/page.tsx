import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Events",
    description: "Stay up to date with upcoming events at Heaven's Dew Montessori. From open days to school celebrations, there's always something happening in our Koforidua community.",
    openGraph: {
        title: "Events ",
        description: "Join us for open days, graduation ceremonies, community outreach and more. See what's coming up at Heaven's Dew Montessori, Koforidua.",
        url: "https://www.hdm.edu.gh/events",
    },
    twitter: {
        title: "Events",
        description: "Join us for open days, graduation ceremonies, community outreach and more. See what's coming up at Heaven's Dew Montessori, Koforidua.",
    },
}

import { EventsPage } from "@/components/pages/events/events-page";

export default function Events() {
    return <EventsPage />
}