"use client"

import React, {useEffect, useRef} from "react"
import gsap from "gsap"
import {Physics2DPlugin} from "gsap/Physics2DPlugin"
import {cn} from "@/lib/utils"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {observer} from "mobx-react-lite"

gsap.registerPlugin(Physics2DPlugin)

interface Props {
    className?: string
    text: string
    dropText: string
}

export const PhysicsText: React.FC<Props> = observer(({className, text, dropText}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    const [play, {stop}] = useSound("/sounds/tick-sprite.mp3", {soundEnabled: soundStore.soundEnabled})

    useEffect(() => {
        const container = containerRef.current

        if (!container) return

        const safeToAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches

        if (!safeToAnimate || window.innerWidth < 768) return

        const handleMouseEnter = () => {
            timelineRef.current?.kill()

            container.querySelectorAll(".emoji").forEach(el => el.remove())

            const tl = gsap.timeline()
            const count = 20

            for (let i = 0; i < count; i++) {
                const span = document.createElement("span")

                span.textContent = dropText
                span.className = cn(
                    "emoji absolute opacity-0 pointer-events-none select-none z-10 left-1/2 top-1/2 transform",
                    "-translate-x-1/2 -translate-y-1/2"
                )

                container.appendChild(span)

                tl.to(
                    span,
                    {
                        keyframes: [
                            {opacity: 1, duration: 0.01},
                            {
                                duration: 3,
                                physics2D: {
                                    velocity: Math.random() * 400 + 150,
                                    angle: Math.random() * 40 + 250,
                                    gravity: 600
                                }
                            },
                            {opacity: 0, duration: 0.3, delay: -0.3}
                        ],
                        clearProps: "all",
                        onComplete: () => span.remove()
                    },
                    Math.random()
                )
            }

            timelineRef.current = tl
        }

        container.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter)

            timelineRef.current?.kill()

            container.querySelectorAll(".emoji").forEach(el => el.remove())
        }
    }, [dropText, play])

    return (
        <div
            ref={containerRef}
            className={cn(className, "relative inline-block z-20 cursor-pointer select-none")}
            onMouseEnter={() => {
                play()
            }}
            onMouseLeave={() => {
                stop()
            }}
        >
            <strong className={"relative z-10"}>{text}</strong>
        </div>
    )
})
