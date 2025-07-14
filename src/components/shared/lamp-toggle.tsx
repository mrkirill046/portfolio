"use client"

import {useTheme} from "next-themes"
import React, {useEffect, useState} from "react"
import {Lightbulb} from "lucide-react"
import {motion, useAnimate} from "motion/react"
import {cn} from "@/lib/utils"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {observer} from "mobx-react-lite"
import {clsx} from "clsx"

interface Props {
    className?: string
}

export const LampToggle: React.FC<Props> = observer(({className}) => {
    const {resolvedTheme, setTheme} = useTheme()

    const [mounted, setMounted] = useState(false)
    const [scope, animate] = useAnimate()

    const [playOn] = useSound("/sounds/switch-on.mp3", {soundEnabled: soundStore.soundEnabled})
    const [playOff] = useSound("/sounds/switch-off.mp3", {soundEnabled: soundStore.soundEnabled})

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        requestAnimationFrame(() => {
            if (!scope.current) return

            animate(scope.current, {rotate: [3, -3, 3]}, {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                repeatDelay: 0
            })
        })
    }, [animate, scope])

    if (!mounted) return null

    const handleClick = () => {
        if (resolvedTheme === "light") {
            playOn()
        } else {
            playOff()
        }

        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        <div className={cn(className, "relative flex flex-col items-center z-50")}>
            <div className={"w-1 h-40 bg-lamp-foreground"}/>

            <motion.div
                className={"relative flex flex-col items-center cursor-pointer"}
                onClick={handleClick}
                ref={scope}
                style={{originX: "50%", originY: 0}}
            >
                <div className={"relative z-10 flex flex-col items-center"}>
                    <div
                        className={"relative w-20 h-10 overflow-hidden rounded-t-full z-10 bg-lamp shadow-md"}
                    >
                        <div className={"absolute bottom-0 w-full h-2 bg-lamp-secondary-foreground z-10"}/>
                    </div>

                    <Lightbulb
                        className={clsx(
                            "-mt-5 h-10 w-10 rotate-180 z-0",
                            resolvedTheme === "dark" ? "text-yellow-300 fill-yellow-300" : "text-gray-400 fill-gray-400"
                        )}
                    />
                </div>

                {resolvedTheme === "dark" && (
                    <div
                        className="absolute z-0 top-[0.1rem] left-1/2 -translate-x-1/2 w-[48rem] h-[35rem] pointer-events-none"
                        style={{
                            background: "linear-gradient(to bottom, rgba(253,224,71,0.5), transparent 80%)",
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                        }}
                    />
                )}
            </motion.div>
        </div>
    )
})
