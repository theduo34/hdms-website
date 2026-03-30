"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import Link from "next/link"
import { SchoolLogo } from "@/components/layout/school-logo"
import { InstagramIcon, LinkedinIcon, TiktokIcon, YoutubeIcon } from "@/components/shared/social-icons"
import { headingStyle } from "@/styles/font"

const socials = [
    { icon: TiktokIcon,    href: "https://tiktok.com/@yourhandle", label: "TikTok"    },
    { icon: InstagramIcon, href: "https://instagram.com",          label: "Instagram" },
    { icon: YoutubeIcon,   href: "https://youtube.com",            label: "YouTube"   },
    { icon: LinkedinIcon,  href: "https://linkedin.com",           label: "LinkedIn"  },
]

const exploreLinks = [
    { label: "About Us",        href: "/about-us"    },
    { label: "Our Programmes",  href: "/programmes"  },
    { label: "School Calendar", href: "/calender"    },
    { label: "News & Updates",  href: "/news-&-announcements" },
]

const connectLinks = [
    { label: "Admissions",    href: "/admissions/apply"        },
    { label: "Apply Now",     href: "/admissions/apply"  },
    { label: "Contact Us",    href: "/contact"           },
]

const EASE = [0.16, 1, 0.3, 1] as const

export function Footer() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })
    const [hovered, setHovered] = useState(false)

    return (
        <motion.footer
            ref={ref}
            className="relative bg-secondary overflow-hidden flex flex-col w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ padding: "0rem 0rem 0rem 0rem", marginTop: "0rem" }}
            animate={{
                paddingLeft: hovered ? "1rem" : "0rem",
                paddingRight: hovered ? "1rem" : "0rem",
                paddingBottom: hovered ? "4.5rem" : "0rem",
                marginTop: hovered ? "-2.5rem" : "0rem"
            }}
            transition={{ duration: 0.8, ease: EASE }}
        >
            <div className="absolute bottom-0 left-0 w-full h-[4.5rem] flex items-center justify-center z-0">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="font-black italic uppercase tracking-[0.25em] text-[15px] md:text-[17px] text-primary hover:opacity-75 active:scale-95 transition-all duration-300"
                    style={headingStyle}
                >
                    BACK TO TOP
                </button>
            </div>

            <motion.div
                className="bg-primary w-full relative z-10 flex flex-col justify-between pt-24 pb-12 px-4 md:px-16 2xl:px-24"
                initial={{ borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }}
                animate={{
                    borderBottomLeftRadius: hovered ? "2.5rem" : "0px",
                    borderBottomRightRadius: hovered ? "2.5rem" : "0px",
                }}
                transition={{ duration: 0.8, ease: EASE }}
            >
                <div className="max-w-7xl mx-auto w-full flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row justify-between md:justify-around gap-16 md:gap-8 mb-16 px-4 md:px-0">

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="flex flex-col items-start gap-6 shrink-0"
                        >
                            <SchoolLogo showName size="lg" />
                            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start mt-2">
                                {socials.map(({ icon: Icon, href, label }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground flex-shrink-0 hover:text-primary hover:bg-primary-foreground hover:border-primary-foreground transition-all duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex flex-col md:flex-row justify-between md:justify-around w-full gap-16 md:gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                                className="flex flex-col gap-6 items-start md:text-left"
                            >
                                <h3 className="text-[15px] font-bold text-primary-foreground tracking-widest uppercase mb-1">
                                    Contact
                                </h3>
                                <div className="flex flex-col gap-1.5 text-sm text-primary-foreground/90 font-medium">
                                    <p>Atekyem, New Juaben South</p>
                                    <p>Koforidua, E/R</p>
                                    <p>Ghana</p>
                                    <a href="tel:+233244974052" className="mt-4 hover:opacity-75 transition-opacity">
                                        +233 24 497 4052
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                                className="flex flex-col gap-6 items-start"
                            >
                                <h3 className="text-[15px] font-bold text-primary-foreground tracking-widest uppercase mb-1">
                                    Explore
                                </h3>
                                <ul className="flex flex-col gap-3 text-sm text-primary-foreground/90 font-medium">
                                    {exploreLinks.map(({ label, href }) => (
                                        <li key={label}>
                                            <Link href={href} className="hover:opacity-75 transition-opacity">
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                                className="flex flex-col gap-6 items-start md:text-left"
                            >
                                <h3 className="text-[15px] font-bold text-primary-foreground tracking-widest uppercase mb-1">
                                    Connect
                                </h3>
                                <ul className="flex flex-col gap-3 text-sm text-primary-foreground/90 font-medium">
                                    {connectLinks.map(({ label, href }) => (
                                        <li key={label}>
                                            <Link href={href} className="hover:opacity-75 transition-opacity">
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-primary-foreground/10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                            className="flex-1"
                        >
                            <p className="text-[10px] md:text-[11px] text-primary-foreground/60 leading-relaxed max-w-3xl text-center md:text-left">
                                Heaven&apos;s Dew Montessori School affirms its non-discriminatory policy and is
                                committed to creating and maintaining an inclusive community that welcomes people of
                                diverse backgrounds and beliefs.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                            className="shrink-0 text-center md:text-right"
                        >
                            <p className="text-[10px] md:text-[11px] text-primary-foreground/60">
                                © {new Date().getFullYear()} Heaven&apos;s Dew Montessori. All rights reserved.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.footer>
    )
}