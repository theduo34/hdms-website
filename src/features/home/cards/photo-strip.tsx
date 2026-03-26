import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { headingStyle } from "@/styles/font";


const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=85",
    caption: "Early Learners · Discovery Room",
  },
  {
    src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=700&q=85",
    caption: "Hands-On Materials · Primary Class",
  },
  {
    src: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=700&q=85",
    caption: "Nature Study · Garden Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&q=85",
    caption: "Quiet Reading · Library Corner",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&q=85",
    caption: "Creative Work · Art Atelier",
  },
  {
    src: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=700&q=85",
    caption: "Science Wonder · Lab Day",
  },
];

const loopedPhotos = [...galleryPhotos, ...galleryPhotos];


export function PhotoStrip({ externalPaused }: { externalPaused: boolean }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const hoverPausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const SPEED = 0.48;

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const tick = () => {
      if (!hoverPausedRef.current && !externalPaused && strip) {
        posRef.current += SPEED;
        const half = strip.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        strip.scrollLeft = posRef.current;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [externalPaused]);

  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  return (
    <div className="z-30 relative">

      <div
        ref={stripRef}
        className="flex gap-4 items-center overflow-x-hidden py-8"
        style={{ scrollbarWidth: "none", userSelect: "none" }}
        onMouseEnter={() => {
          hoverPausedRef.current = true;
        }}
        onMouseLeave={() => {
          hoverPausedRef.current = false;
        }}
        onTouchStart={(e) => {
          hoverPausedRef.current = true;
          touchStartX.current = e.touches[0].clientX;
          touchScrollLeft.current = posRef.current;
        }}
        onTouchMove={(e) => {
          if (!stripRef.current) return;
          const dx = touchStartX.current - e.touches[0].clientX;
          posRef.current = touchScrollLeft.current + dx;
          stripRef.current.scrollLeft = posRef.current;
        }}
        onTouchEnd={() => {
          hoverPausedRef.current = false;
        }}
      >
        {loopedPhotos.map((photo, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={`group relative shrink-0 w-77.5 h-77.5 border-6 rounded-lg border-secondary overflow-hidden transition-transform duration-500 ${isEven ? "-translate-y-7" : "translate-y-7"}`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="310px"
                loading="lazy"
                draggable={false}
                className="object-cover"
              />

              <div className="absolute inset-3 rounded-md flex flex-col items-center justify-center gap-5 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ background: "var(--color-secondary)" }}
              >
                <p
                  className="text-xl font-bold text-center uppercase tracking-[0.15em] text-white"
                  style={headingStyle}
                >
                  {photo.caption.split("·")[0].trim()}
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/60">
                  {photo.caption.split("·")[1]?.trim()}
                </p>
                <Button className={"flex items-center justify-center border border-primary-foreground bg-secondary hover:bg-primary rounded-full"}>
                  Learn More
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
