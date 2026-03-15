import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Gallery",
    description: "Browse photos from life at Heaven's Dew Montessori — classrooms, events, campus moments, and the faces of our thriving school community in Koforidua, Ghana.",
    openGraph: {
        title: "Gallery",
        description: "A picture is worth a thousand words. See the joy, curiosity, and community that defines everyday life at Heaven's Dew Montessori.",
        url: "https://www.hdm.edu.gh/gallery",
    },
    twitter: {
        title: "Gallery",
        description: "A picture is worth a thousand words. See the joy, curiosity, and community that defines everyday life at Heaven's Dew Montessori.",
    },
}

import { GalleryPage } from "@/components/pages/gallery/gallery-page";

export default function Gallery() {
    return <GalleryPage />
}