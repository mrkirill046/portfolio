"use client"

import React, {JSX, ReactNode, useEffect, useRef, useState} from "react"
import ReactDOM from "react-dom"
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

const EmojiPortal: React.FC<{ children: ReactNode }> = ({children}) => {
    const [mounted, setMounted] = useState(false)

    const el = useRef<HTMLDivElement | null>(null)

    if (!el.current && typeof document !== "undefined") {
        el.current = document.createElement("div")

        el.current.className = "[&>span]:text-6xl absolute top-0 left-0 w-screen h-screen pointer-events-none overflow-visible z-[9999]"
    }

    useEffect(() => {
        setMounted(true)

        if (!el.current) return

        document.body.appendChild(el.current)

        return () => {
            if (el.current && document.body.contains(el.current)) {
                document.body.removeChild(el.current)
            }
        }
    }, [])

    if (!mounted || !el.current) return null

    return ReactDOM.createPortal(children, el.current)
}

export const PhysicsText: React.FC<Props> = observer(({className, text, dropText}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    const [play, {stop}] = useSound("/sounds/tick-sprite.mp3", {soundEnabled: soundStore.soundEnabled})

    const [emojis, setEmojis] = useState<JSX.Element[]>([])

    useEffect(() => {
        const container = containerRef.current

        if (!container) return

        const safeToAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches

        if (!safeToAnimate || window.innerWidth < 768) return

        const handleMouseEnter = () => {
            timelineRef.current?.kill()

            setEmojis([])

            const count = 20
            const newEmojis: JSX.Element[] = []
            const tl = gsap.timeline()

            const rect = container.getBoundingClientRect()

            for (let i = 0; i < count; i++) {
                const id = `emoji-${Date.now()}-${i}`
                const emojiRef = React.createRef<HTMLSpanElement>()

                newEmojis.push(
                    <span
                        key={id}
                        ref={emojiRef}
                        className={
                            "emoji absolute opacity-0 z-50 transform -translate-x-1/2 -translate-y-1/2 scale-100 " +
                            "select-none pointer-events-none"
                        }
                        style={{
                            left: `${rect.left + rect.width / 2}px`,
                            top: `${rect.top + rect.height / 2}px`
                        }}
                    >
                        {dropText}
                    </span>
                )

                setTimeout(() => {
                    if (!emojiRef.current) return

                    tl.to(
                        emojiRef.current,
                        {
                            keyframes: [
                                {opacity: 1, duration: 0.01},
                                {
                                    duration: 3.3,
                                    physics2D: {
                                        velocity: Math.random() * 300 + 100,
                                        angle: Math.random() * 100 + 220,
                                        gravity: 350
                                    },
                                    ease: "power1.out"
                                },
                                {opacity: 0, duration: 0.1, delay: -0.3}
                            ],
                            clearProps: "all",
                            onComplete: () => {
                                setEmojis((prev) => prev.filter((e) => e.key !== id))
                            }
                        }, 0.05 * i
                    )

                }, 10 * i)
            }

            setEmojis(newEmojis)
            timelineRef.current = tl
        }

        container.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter)
            timelineRef.current?.kill()

            setEmojis([])
        }
    }, [dropText, className])

    return (
        <div
            ref={containerRef}
            className={cn(className, "relative inline-block z-20 cursor-pointer")}
            onMouseEnter={() => play()}
            onMouseLeave={() => stop()}
        >
            <strong className={"relative z-10"}>{text}</strong>

            <EmojiPortal>{emojis}</EmojiPortal>
        </div>
    )
})
