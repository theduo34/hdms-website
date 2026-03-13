import { motion } from "motion/react"
import Image from "next/image"
import { StudentsInterface } from "@/features/home"

export function StudentCard({ student, index }: { student: StudentsInterface; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -6 }}
            className={`group relative rounded-2xl overflow-hidden bg-primary-foreground md:rotate-0 ${index % 2 === 0 ? "rotate-3" : "-rotate-3"}`}
            style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
        >
            <div className="absolute inset-0 z-10 bg-secondary opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-20 px-5 pt-5 pb-3">
                <h3 className="text-xl font-black uppercase leading-[0.9] text-primary">
                    {student.name.split("\n").map((line, i) => (
                        <span key={i} className="block">{line}</span>
                    ))}
                </h3>
                <p className="text-xs text-foreground/40 mt-2">{student.role}</p>
            </div>

            <div className="relative h-62 md:h-54 w-full">
                <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    className="object-cover object-top"
                />
            </div>
        </motion.article>
    )
}