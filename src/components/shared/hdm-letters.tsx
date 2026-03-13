"use client"

import {motion} from "motion/react"
import {cn} from "@/lib/utils"

type LetterCrop =
  | "full"
  | "half-left"
  | "half-right"
  | "peek-left"
  | "peek-right"
  | "hidden"

type HDMVariant =
  | "default"
  | "centered"
  | "edge-left"
  | "edge-right"
  | "scattered"
  | "custom"

type Props = {
  letters?: string
  crops?: LetterCrop[]
  variant?: HDMVariant
  h?: LetterCrop
  d?: LetterCrop
  m?: LetterCrop
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  color?: string
  strokeColor?: string
  filled?: boolean
  animate?: boolean
  className?: string
}

const cropToClip: Record<LetterCrop, string> = {
  "full": "inset(0 0% 0 0%)",
  "half-left": "inset(0 0% 0 50%)",
  "half-right": "inset(0 50% 0 0%)",
  "peek-left": "inset(0 0% 0 75%)",
  "peek-right": "inset(0 75% 0 0%)",
  "hidden": "inset(0 100% 0 0%)",
}

const variantMap: Record<HDMVariant, [LetterCrop, LetterCrop, LetterCrop]> = {
  "default": ["half-left", "full", "half-right"],
  "centered": ["full", "full", "full"],
  "edge-left": ["peek-left", "half-left", "full"],
  "edge-right": ["full", "half-right", "peek-right"],
  "scattered": ["full", "hidden", "full"],
  "custom": ["full", "full", "full"],
}

const defaultCropPattern: LetterCrop[] = ["half-left", "full", "half-right"]

const sizeMap: Record<string, string> = {
  sm: "text-[6rem]  md:text-[8rem]",
  md: "text-[10rem] md:text-[14rem]",
  lg: "text-[14rem] md:text-[20rem]",
  xl: "text-[18rem] md:text-[26rem]",
  "2xl": "text-[22rem] md:text-[32rem]",
  full: "text-[33vw]",
}

function getCropForIndex(
  index: number,
  total: number,
  crops?: LetterCrop[],
  variant?: HDMVariant,
  customH?: LetterCrop,
  customD?: LetterCrop,
  customM?: LetterCrop,
): LetterCrop {
  if (crops && crops[index] !== undefined) return crops[index]
  if (total === 3 && variant) {
    const [hCrop, dCrop, mCrop] = variantMap[variant]
    const map = [customH ?? hCrop, customD ?? dCrop, customM ?? mCrop]
    return map[index]
  }
  if (variant) {
    const [hCrop, dCrop, mCrop] = variantMap[variant]
    return [hCrop, dCrop, mCrop][index % 3]
  }
  return defaultCropPattern[index % defaultCropPattern.length]
}

export function HDMLetters(
  {
    letters = "HDM",
    crops,
    variant = "default",
    h,
    d,
    m,
    size = "lg",
    color = "currentColor",
    strokeColor,
    filled = false,
    animate = true,
    className,
  }: Props) {
  const chars = letters.toUpperCase().split("")
  const isFullSize = size === "full"

  const baseStyle: React.CSSProperties = filled
    ? {color}
    : {
      color: "transparent",
      WebkitTextStroke: `2px ${strokeColor ?? color}`,
    }

  return (
    <div
      aria-label={letters}
      className={cn(
        "flex flex-row select-none pointer-events-none ",
        isFullSize ? "w-screen min-h-screen items-stretch" : "items-center",
        !isFullSize && sizeMap[size],
        className
      )}
    >
      {chars.map((char, i) => {
        const crop = getCropForIndex(i, chars.length, crops, variant, h, d, m)

        return (
          <motion.span
            key={`${char}-${i}`}
            initial={animate ? {clipPath: "inset(0 100% 0 0%)"} : undefined}
            animate={animate ? {clipPath: cropToClip[crop]} : undefined}
            style={{
              ...baseStyle,
              clipPath: animate ? undefined : cropToClip[crop],
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontWeight: 900,
              fontStyle: "italic",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              ...(isFullSize && {
                fontSize: "100vh",
                flex: 1,
                display: "block",
                textAlign: "center" as const,
              }),
            }}
            className={cn(!isFullSize && sizeMap[size])}
            transition={{
              delay: animate ? i * 0.15 : 0,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </div>
  )
}