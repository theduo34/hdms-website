"use client"

import { motion } from "motion/react"
import { AnimateInView } from "@/components/shared/animate-in-view"
import { SectionLabel } from "@/components/shared/section-label"
import { StudentCard } from "@/features/home/cards/students-card"
import { students } from "@/features/home"
import { CTAButton } from "@/components/shared/cta-button"
import { headingStyle } from "@/styles/font";
import {Button} from "@/components/ui/button";

const col1 = [students[0], students[2], students[4]]
const col2 = [students[1], students[3]]

function SectionText({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`flex flex-col gap-6 ${mobile ? "items-center text-center" : ""}`}>
      <SectionLabel label="OUR STUDENTS" />
      <h2
        className={`section-header text-center flex flex-col gap-1 mt-6`}
        style={headingStyle}
      >
        <span>GET TO KNOW</span>
        <span> A HDM</span>
      </h2>
      <p className="text-primary-foreground/60 text-sm max-w-sm">
        Rooted in faith, shaped by diligence, and striving for excellence,
        our students are empowered to grow, learn, and reach their full potential.
      </p>
    </div>
  )
}

export function StudentsSection() {
  return (
    <section id="students" className="section relative bg-primary overflow-hidden">

      <div className="hidden md:flex items-start gap-8 section-left">

        <div className="flex flex-col gap-4 w-52 shrink-0">
          {col1.map((student, i) => (
            <StudentCard key={student.name} student={student} index={i} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-52 shrink-0 mt-20">
          {col2.map((student, i) => (
            <StudentCard key={student.name} student={student} index={i + 1} />
          ))}
        </div>

        <AnimateInView
          xOffset={5}
          yOffset={0}
          duration={0.8}
          className="sticky top-32 self-start pl-10 flex flex-col gap-6"
        >
          <SectionText />
          <CTAButton href="/students" className="w-full py-6 mt-8">
            Read More Stories
          </CTAButton>
        </AnimateInView>
      </div>

      <div className="md:hidden flex flex-col gap-12">
        <AnimateInView yOffset={5} duration={0.6}>
          <SectionText mobile />
        </AnimateInView>

        <div className="flex flex-col px-4">
          {students.map((student, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={student.name}
                initial={{ opacity: 0, x: isEven ? -60 : 60, rotate: isEven ? -3 : 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className={`w-[75%] ${isEven ? "mr-auto" : "ml-auto"} ${i !== 0 ? "-mt-4" : ""}`}
              >
                <StudentCard student={student} index={i} />
              </motion.div>
            )
          })}
        </div>
        <div className="flex mx-auto md:hidden">
          <CTAButton href="/students" className="w-fit py-6">
            Read More Stories
          </CTAButton>
        </div>
      </div>
    </section>
  )
}