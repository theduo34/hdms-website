"use client"

import Link from "next/link"
import {navItems, topNavItems} from "./nav-data"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type Props = { onClose: () => void }

export function MobileMenu({onClose}: Props) {
    return (
        <div className="md:hidden w-full flex flex-col gap-8 h-full pt-28 px-6">

            <Accordion type="single" collapsible>

                {navItems.map((item) => {

                    if (!item.children) {
                        return (
                            <Link
                                key={item.title}
                                href={item.href ?? "#"}
                                onClick={onClose}
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

            <div className={"w-ful flex flex-wrap items-center justify-between gap-2"}>
                {topNavItems.map((item) => {
                    return (
                        <div
                            key={item.title}
                            className={"font-sans text-primary"}
                            onClick={onClose}
                        >
                            {item.title}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}