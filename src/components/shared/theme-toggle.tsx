"use client"

import React, {useEffect, useState} from "react"
import {useTheme} from "next-themes"
import {cn} from "@/lib/utils"
import {Moon, Sun} from "lucide-react"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {observer} from "mobx-react-lite"
import {motion, useAnimate} from "motion/react"

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
    const [isAnimating, setIsAnimating] = useState(false)

    const [btnRef, animateBtn] = useAnimate()

    const [playOn] = useSound("/sounds/switch-on.mp3", {soundEnabled: soundStore.soundEnabled})
    const [playOff] = useSound("/sounds/switch-off.mp3", {soundEnabled: soundStore.soundEnabled})

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleClick = () => {
        setIsAnimating(true)

        if (resolvedTheme === "light") {
            playOn()
        } else {
            playOff()
        }

        animateBtn(btnRef.current, {
            scale: [1, 1.3, 1],
            rotate: [0, 15, 0]
        }, {duration: 0.5, ease: "easeInOut"})

        setTheme(resolvedTheme === "dark" ? "light" : "dark")
        setTimeout(() => setIsAnimating(false), 500)
    }

    const handleHover = () => {
        if (isAnimating) return

        animateBtn(btnRef.current, {
            scale: [1, 1.1, 0.9, 1.05, 1],
            rotate: [0, -6, 4, -2, 0]
        }, {duration: 0.5, ease: "easeInOut"})
    }

    return (
        <motion.button
            ref={btnRef}
            onClick={handleClick}
            onMouseEnter={handleHover}
            aria-label={"Toggle theme"}
            type={"button"}
            className={cn(className, "p-2 bg-buttons rounded cursor-pointer")}
        >
            {resolvedTheme === "light" ? <Sun className={svgStyle}/> : <Moon className={svgStyle}/>}
        </motion.button>
    )
})
