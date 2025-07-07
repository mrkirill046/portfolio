"use client"

import React, {useEffect, useRef, useState} from "react"
import {Volume} from "lucide-react"
import {animate} from "motion"
import {clsx} from "clsx"
import {cn} from "@/lib/utils"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {observer} from "mobx-react-lite"

interface Props {
    className?: string
}

export const SoundToggle: React.FC<Props> = observer(({className}) => {
    useEffect(() => {
        soundStore.hydrate()
    }, [])

    const [isMuted, setIsMuted] = useState(!soundStore.soundEnabled)

    const wrapperRef = useRef<HTMLButtonElement>(null)
    const arcsRef = useRef<SVGGElement>(null)
    const crossRef = useRef<SVGGElement>(null)
    const isAnimatingRef = useRef(false)

    const [playOn] = useSound("/sounds/enable-sound.mp3", {
        volume: 0.4
    })

    const [playOff] = useSound("/sounds/disable-sound.mp3", {
        volume: 0.25
    })

    const handleClick = () => {
        if (isAnimatingRef.current) return

        if (soundStore.soundEnabled) {
            playOff()
        } else {
            playOn()
        }

        isAnimatingRef.current = true

        if (wrapperRef.current) {
            animate(wrapperRef.current, {
                transform: [
                    "scale(1) rotate(0deg)",
                    "scale(1.3) rotate(-10deg)",
                    "scale(0.9) rotate(5deg)",
                    "scale(1) rotate(0deg)"
                ]
            }, {
                duration: 0.6,
                ease: "easeInOut",
                onComplete: () => {
                    isAnimatingRef.current = false
                }
            })
        }

        if (arcsRef.current && crossRef.current) {
            if (!isMuted) {
                animate(arcsRef.current, {opacity: 0, scale: 0}, {duration: 0.5, ease: "easeInOut"})
                animate(crossRef.current, {opacity: 1, scale: 1}, {duration: 0.5, ease: "easeInOut"})
            } else {
                animate(arcsRef.current, {opacity: 1, scale: 1}, {duration: 0.5, ease: "easeInOut"})
                animate(crossRef.current, {opacity: 0, scale: 0}, {duration: 0.5, ease: "easeInOut"})
            }
        }

        setIsMuted(!isMuted)

        soundStore.toggleSound()
    }

    const handleHover = () => {
        if (isAnimatingRef.current) return

        if (wrapperRef.current) {
            animate(wrapperRef.current, {
                transform: [
                    "rotate(0deg)",
                    "rotate(-6deg)",
                    "rotate(4deg)",
                    "rotate(-2deg)",
                    "rotate(0deg)"
                ]
            }, {duration: 0.5, ease: "easeInOut"})
        }
    }

    return (
        <button
            ref={wrapperRef}
            onClick={handleClick}
            onMouseEnter={handleHover}
            aria-label={isMuted ? "Sound on" : "Sound off"}
            className={cn(className,
                "w-8 h-8 relative flex items-center justify-center select-none transition-opacity duration-300 ease-in-out hover:opacity-80"
            )}
        >
            <Volume/>

            <svg
                width={32}
                height={32}
                viewBox={"0 0 32 32"}
                fill={"none"}
                className={"absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none text-current w-8 h-8"}
            >
                <g
                    ref={arcsRef}
                    opacity={isMuted ? 0 : 1}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={clsx("origin-[1rem_1rem]", {
                        "scale-0": isMuted,
                        "scale-100": !isMuted
                    })}
                >
                    <path d={"M13 12C15 14 15 18 13 20"}/>
                    <path d={"M17 10C20 13 20 19 17 22"}/>
                </g>

                <g
                    ref={crossRef}
                    opacity={isMuted ? 1 : 0}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={clsx("origin-[1rem_1rem]", {
                        "scale-100": isMuted,
                        "scale-0": !isMuted
                    })}
                >
                    <line x1={13} y1={12} x2={21} y2={20}/>
                    <line x1={21} y1={12} x2={13} y2={20}/>
                </g>
            </svg>
        </button>
    )
})
