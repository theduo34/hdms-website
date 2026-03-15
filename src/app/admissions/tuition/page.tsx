import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Tuition & Fees",
    description: "Explore tuition and fee structures at Heaven's Dew Montessori. Transparent pricing for a world-class Montessori education in Koforidua, Ghana.",
    openGraph: {
        title: "Tuition & Fees",
        description: "Investing in your child's future starts here. View our tuition and fees for all programmes from Little Angels to Year 7.",
        url: "https://www.hdm.edu.gh/admissions/tuition",
    },
    twitter: {
        title: "Tuition & Fees",
        description: "Investing in your child's future starts here. View our tuition and fees for all programmes from Little Angels to Year 7.",
    },
}

import { TuitionPage } from "@/components/pages/admissions/tuition-page";

export default function Tuition() {
    return <TuitionPage />
}