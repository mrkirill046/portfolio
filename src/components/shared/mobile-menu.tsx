"use client"

import React, {useState} from "react"
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import {Menu} from "lucide-react"
import Link from "next/link"

const menuItems = [
    {title: "Home", href: "/#top"},
    {title: "Projects", href: "/#projects"},
    {title: "About", href: "/#about"},
    {title: "Contact", href: "/#contact"},
    {title: "Goodies", href: "/goodies"},
    {title: "Categories", href: "/blog/categories"}
]

interface Props {
    className?: string
}

export const MobileMenu: React.FC<Props> = ({className}) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={className}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size={"icon"} className={"lg:hidden"}>
                        <Menu className={"h-6 w-6"}/>
                        <span className={"sr-only"}>Toggle Menu</span>
                    </Button>
                </SheetTrigger>

                <SheetContent side={"left"} className={"w-72 flex flex-col gap-6 backdrop-blur-lg bg-background/80"}>
                    <SheetTitle className={"text-xl font-bold pt-2 pl-4"}>Mobile Menu</SheetTitle>

                    <nav className={"flex flex-col items-center gap-4 w-full h-full justify-center"}>
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={"text-base font-medium hover:underline"}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}
