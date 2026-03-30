import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Apply for Admission",
    description: "Start your child's Montessori journey today. Apply for admissions to Heaven's Dew Montessori in Koforidua, Ghana - from Little Angels to Year 7.",
    openGraph: {
        title: "Apply for Admission",
        description: "Ready to enrol? Submit an application and take the first step toward a world-class Montessori education for your child in Koforidua, Ghana.",
        url: "https://www.hdm.edu.gh/admissions",
    },
    twitter: {
        title: "Apply for Admission",
        description: "Ready to enrol? Submit an application and take the first step toward a world-class Montessori education for your child in Koforidua, Ghana.",
    },
}

import { ApplyPage } from "@/components/pages/admissions/apply-page";

export default function Apply() {
    return <ApplyPage />
}