import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEventDateParts(eventDate: string): { month: string; day: string } {
  const date = new Date(eventDate);
  return {
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: String(date.getDate()),
  };
}

export function formatNewsDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getAcademicYear() {
  const now = new Date()
  const year = now.getFullYear()
  const startYear = now.getMonth() >= 8 ? year : year - 1
  return { label: `Academic Year ${year - 1 } / ${year}`, endYear: startYear  }
}
