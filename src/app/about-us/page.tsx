import {AboutUsPage} from "@/components/pages/about-us/about-us-page";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Heaven's Dew Montessori - our mission, values, and the passionate educators dedicated to raising confident, curious, and capable children in Koforidua, Ghana. Rooted in Faith, Diligence, and Excellence.",
};

export default function AboutUs() {
  return(
    <AboutUsPage/>
  )
}