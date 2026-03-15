"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { NewsSection } from "@/features/home/sections/new-section";
import { PhotoStrip } from "@/features/home/cards/photo-strip";
import { AnimateInView } from "@/components/shared/animate-in-view";
import {headingStyle} from "@/styles/font";


export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [stripPaused, setStripPaused] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax effect for the hero text and video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-visible bg-background w-full"
    >
      <div className="relative w-full h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary" />

        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 scale-105"
          style={{ opacity: videoLoaded ? 0.7 : 0 }}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
        </video>

        <div className="absolute inset-0 bg-primary/40 pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/20 pointer-events-none" />

        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 w-full max-w-7xl mx-auto -mt-16"
        >
          <AnimateInView yOffset={10} duration={1.2}>
            <div className="flex flex-col gap-2 md:gap-4 items-center">
              <h1
                  className="text-[clamp(2.5rem,6vw,5.5rem)] italic font-black uppercase text-primary-foreground leading-[0.9] tracking-tight flex flex-row flex-wrap justify-center gap-[clamp(0.5rem,1.5vw,1rem)]"
                  style={headingStyle}
              >
                <span className={"text-secondary"}>where</span>
                <span className={""}>the</span>
                <span className={"text-secondary"}>dew</span>
              </h1>
              <h1
                className="text-[clamp(2.5rem,6vw,5.5rem)] italic font-black uppercase text-primary-foreground leading-[0.9] tracking-tight flex flex-row flex-wrap justify-center gap-[clamp(0.5rem,1.5vw,1rem)]"
                style={headingStyle}
              >
                <span>of</span>
                <span  className="text-secondary ">heaven</span>
                <span >falls</span>
              </h1>
            </div>
          </AnimateInView>
          
          <AnimateInView yOffset={5} delay={0.3} duration={1}>
            <p className="mt-8 md:mt-10 text-primary-foreground/90 max-w-2xl text-base md:text-lg lg:text-xl font-medium tracking-wide">
              A private Montessori school cultivating young minds with Faith, Diligence, and Excellence.
            </p>
          </AnimateInView>
        </motion.div>
      </div>

      <AnimateInView yOffset={5} duration={1} className="relative z-20 -mt-24 md:-mt-32">
        <PhotoStrip externalPaused={stripPaused} />
        <NewsSection
            onToggleStrip={() => setStripPaused(p => !p)}
            stripPaused={stripPaused}
        />
      </AnimateInView>
    </section>
  );
}