import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Programmes",
    description: "Discover the full range of programmes at Heaven's Dew Montessori. From Little Angels to Year 7, every stage of your child's education is thoughtfully designed around Montessori principles in Koforidua, Ghana.",
    openGraph: {
        title: "Programmes",
        description: "Explore our world-class Montessori programmes designed to nurture every child from early childhood through upper primary. Faith, Diligence, and Excellence at every stage.",
        url: "https://www.hdm.edu.gh/programmes",
    },
    twitter: {
        title: "Programmes",
        description: "Explore our world-class Montessori programmes designed to nurture every child from early childhood through upper primary. Faith, Diligence, and Excellence at every stage.",
    },
}

import { ProgrammesPage } from "@/components/pages/programmes/programmes-page";

export default function Programmes() {
    return <ProgrammesPage />
}