import {AboutUsPage} from "@/components/pages/about-us/about-us-page";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the story, mission, and values behind Heaven's Dew Montessori. Rooted in Faith, Diligence, and Excellence, we've been shaping young minds in Koforidua, Ghana since our founding.",
  openGraph: {
    title: "About Us",
    description: "Discover how Heaven's Dew Montessori is redefining education in the Eastern Region of Ghana through child-centered learning and timeless Montessori principles.",
    url: "https://www.hdm.edu.gh/about-us",
  },
  twitter: {
    title: "About Us",
    description: "Discover how Heaven's Dew Montessori is redefining education in the Eastern Region of Ghana through child-centered learning and timeless Montessori principles.",
  },
}

export default function AboutUs() {
  return(
    <AboutUsPage/>
  )
}