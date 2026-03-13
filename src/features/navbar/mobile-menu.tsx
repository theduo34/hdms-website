"use client"

import Link from "next/link"
import { navItems } from "./nav-data"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function MobileMenu() {
  return (
    <div className="md:hidden w-full h-full pt-28 px-6">

      <Accordion type="single" collapsible>

        {navItems.map((item) => {

          if (!item.children) {
            return (
              <Link
                key={item.title}
                href={item.href ?? "#"}
                className="block py-4 border-b text-lg font-semibold"
              >
                {item.title}
              </Link>
            )
          }

          return (
            <AccordionItem value={item.title} key={item.title}>

              <AccordionTrigger className="text-lg font-semibold">
                {item.title}
              </AccordionTrigger>

              <AccordionContent>

                <div className="flex flex-col gap-3 pb-4 pl-4">

                  {item.children.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      className="text-base opacity-80"
                    >
                      {child.title}
                    </Link>
                  ))}

                </div>

              </AccordionContent>

            </AccordionItem>
          )
        })}

      </Accordion>

    </div>
  )
}