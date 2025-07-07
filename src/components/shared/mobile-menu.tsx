"use client"

import React, {useEffect, useRef, useState} from "react"
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import Link from "next/link"
import {observer} from "mobx-react-lite"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {animate} from "motion"

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

export const MobileMenu: React.FC<Props> = observer(({className}) => {
    const [open, setOpen] = useState(false)

    const topRef = useRef<SVGRectElement>(null)
    const middleRef = useRef<SVGRectElement>(null)
    const bottomRef = useRef<SVGRectElement>(null)
    const wasOpen = useRef(false)

    const [play] = useSound("/sounds/glug-b.mp3", {
        volume: 0.25,
        soundEnabled: soundStore.soundEnabled
    })

    const handleHover = () => {
        if (topRef.current && middleRef.current && bottomRef.current) {
            const allLines = [topRef.current, middleRef.current, bottomRef.current]

            allLines.forEach((line, i) => {
                animate(line,
                    {x: [0, 3, -3, 2, -2, 0]},
                    {duration: 0.4, delay: i * 0.05, ease: "easeInOut"}
                )
            })
        }
    }

    useEffect(() => {
        if (open) {
            wasOpen.current = true
        } else if (wasOpen.current) {
            play()

            wasOpen.current = false
        }
    }, [open, play])

    return (
        <div className={className}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button
                        className={
                            "lg:hidden w-10 h-10 items-center justify-center flex transition-opacity duration-300 " +
                            "ease-in-out hover:opacity-80"
                        }
                        onMouseEnter={handleHover}
                        onClick={() => play()}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect ref={topRef} x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
                            <rect ref={middleRef} x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
                            <rect ref={bottomRef} x="3" y="16" width="18" height="2" rx="1" fill="currentColor"/>
                        </svg>

                        <span className={"sr-only"}>Toggle Menu</span>
                    </button>
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
})
