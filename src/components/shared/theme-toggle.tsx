"use client"

import React, {useEffect, useRef, useState} from "react"
import {useTheme} from "next-themes"
import {cn} from "@/lib/utils"
import {Moon, Sun} from "lucide-react"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {observer} from "mobx-react-lite"
import {animate} from "motion"

interface Props {
    className?: string
    svgStyle?: string
}

export const ThemeToggle: React.FC<Props> = observer((
    {
        className,
        svgStyle = "transition-opacity duration-300 ease-in-out hover:opacity-80 select-none"
    }
) => {
    const {setTheme, resolvedTheme} = useTheme()

    const [mounted, setMounted] = useState(false)

    const buttonRef = useRef<HTMLButtonElement>(null)
    const isAnimatingRef = useRef(false)

    const [play] = useSound("/sounds/button.wav", {
        volume: soundStore.volume,
        interrupt: true
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const handleClick = () => {
        if (isAnimatingRef.current) return

        play()

        isAnimatingRef.current = true

        if (buttonRef.current) {
            animate(buttonRef.current, {
                transform: [
                    "scale(1) rotate(0deg)",
                    "scale(1.3) rotate(15deg)",
                    "scale(1) rotate(0deg)"
                ]
            }, {
                duration: 0.5,
                ease: "easeInOut",
                onComplete: () => {
                    isAnimatingRef.current = false
                }
            })
        }

        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    const handleHover = () => {
        if (isAnimatingRef.current) return

        if (buttonRef.current) {
            animate(buttonRef.current, {
                transform: [
                    "scale(1) rotate(0deg)",
                    "scale(1.1) rotate(-6deg)",
                    "scale(0.9) rotate(4deg)",
                    "scale(1.05) rotate(-2deg)",
                    "scale(1) rotate(0deg)"
                ]
            }, {duration: 0.5, ease: "easeInOut"})
        }
    }

    return (
        <button
            ref={buttonRef}
            className={cn(className, "p-2 bg-buttons rounded")}
            onClick={handleClick}
            onMouseEnter={handleHover}
            aria-label={"Toggle theme"}
        >
            {resolvedTheme === "light" ? <Sun className={svgStyle}/> : <Moon className={svgStyle}/>}
        </button>
    )
})
