import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Visit Our Campus",
    description: "See Heaven's Dew Montessori for yourself. Schedule a campus visit-campus and experience our nurturing learning environment in Koforidua, Ghana firsthand.",
    openGraph: {
        title: "Visit Our Campus",
        description: "Words can only say so much. Come visit-campus our campus in Koforidua and see why families across the Eastern Region choose Heaven's Dew Montessori.",
        url: "https://www.hdm.edu.gh/admissions/visit-campus",
    },
    twitter: {
        title: "Visit Our Campus",
        description: "Words can only say so much. Come visit-campus our campus in Koforidua and see why families across the Eastern Region choose Heaven's Dew Montessori.",
    },
}

import { VisitCampusPage } from "@/components/pages/admissions/visit-campus-page";

export default function VisitCampus() {
    return <VisitCampusPage />
}