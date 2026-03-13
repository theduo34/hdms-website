"use client";

import {motion} from "motion/react";
import {useState} from "react";
import {NewsSection} from "@/features/home/new-section";
import {HDMLetters} from "@/components/shared/hdm-letters";
import {PhotoStrip} from "@/features/home/photo-strip";


export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [stripPaused, setStripPaused] = useState(false);

  return (
    <section
      id={"hero"}
      aria-labelledby="hero-heading"
      className="relative overflow-visible"
    >
      <div className="relative w-full min-h-[60vh] md:min-h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{background: "var(--hdm-navy-dark)"}}
        />

        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{opacity: videoLoaded ? 1 : 0}}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
        </video>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{background: "oklch(0.12 0.08 275 / 0.60)"}}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 55% 45%, oklch(0.38 0.18 255 / 0.10) 0%, oklch(0.12 0.08 275 / 0.55) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-primary opacity-10 pointer-events-none" />

        <HDMLetters
          size="full"
          filled
          color="oklch(from var(--color-primary) l c h / 0.10)"
          className="bg-primary"
        />

        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.3, duration: 1}}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8 text-center"
        >

          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col font-bold gap-4 items-center mb-8 uppercase text-white text-[clamp(2rem,3vw,3rem)]  md:text-[clamp(3rem,4.5vw,4.5rem)] tracking-[-0.03em]"
            style={{lineHeight: 0.9}}
          >
            <h1
              className="flex fle-row gap-4 "
              style={{fontFamily: "'Georgia', 'Times New Roman', serif"}}
            >
              <span>{`We are where`}</span>
            </h1>
            <h1
              className="flex flex-row gap-4"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              <span className={"text-secondary"}>futures</span>
              <span> are </span>
              <span className={"text-secondary"}>formed</span>
            </h1>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{opacity: 0, y: 60}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1]}}
        className="relative z-20 -mt-40"
      >
        <PhotoStrip externalPaused={stripPaused} />
        <NewsSection onToggleStrip={() => setStripPaused(p => !p)} stripPaused={stripPaused} />
      </motion.div>
    </section>
  );
}