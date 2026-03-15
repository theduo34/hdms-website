import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Heaven's Dew Montessori in Koforidua, Ghana. We'd love to answer your questions about admissions, programmes, or anything else.",
    openGraph: {
        title: "Contact Us",
        description: "Have a question? Reach out to our admissions team or visit us at our campus in Koforidua. We're here to help your child find their place at Heaven's Dew Montessori.",
        url: "https://www.hdm.edu.gh/contact",
    },
    twitter: {
        title: "Contact Us",
        description: "Have a question? Reach out to our admissions team or visit us at our campus in Koforidua. We're here to help your child find their place at Heaven's Dew Montessori.",
    },
}

import { ContactPage } from "@/components/pages/contact/contact-page";

export default function Contact() {
    return <ContactPage />
}