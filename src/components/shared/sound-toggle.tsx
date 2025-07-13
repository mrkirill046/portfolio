"use client"

import React, {useCallback, useEffect, useState} from "react"
import {Volume} from "lucide-react"
import {cn} from "@/lib/utils"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {observer} from "mobx-react-lite"
import {motion, useAnimate} from "motion/react"

interface Props {
    className?: string
}

export const SoundToggle: React.FC<Props> = observer(({className}) => {
    const [isMuted, setIsMuted] = useState(!soundStore.soundEnabled)
    const [isAnimating, setIsAnimating] = useState(false)

    const [playOn] = useSound("/sounds/enable-sound.mp3", {volume: 0.4})
    const [playOff] = useSound("/sounds/disable-sound.mp3", {volume: 0.25})

    const [btnRef, animateBtn] = useAnimate()
    const [arcsRef, animateArcs] = useAnimate()
    const [crossRef, animateCross] = useAnimate()

    useEffect(() => {
        soundStore.hydrate()
    }, [])

    const animateToggle = useCallback((muted: boolean) => {
        if (muted) {
            animateArcs(arcsRef.current, {
                opacity: 0,
                scale: 0
            }, {duration: 0.4, ease: "easeInOut"})

            animateCross(crossRef.current, {
                opacity: 1,
                scale: 1
            }, {duration: 0.4, ease: "easeInOut"})
        } else {
            animateArcs(arcsRef.current, {
                opacity: 1,
                scale: 1
            }, {duration: 0.4, ease: "easeInOut"})

            animateCross(crossRef.current, {
                opacity: 0,
                scale: 0
            }, {duration: 0.4, ease: "easeInOut"})
        }
    }, [animateArcs, animateCross, arcsRef, crossRef])

    const handleClick = () => {
        setIsAnimating(true)

        if (soundStore.soundEnabled) {
            playOff()
        } else {
            playOn()
        }

        animateBtn(btnRef.current, {
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, -10, 5, 0]
        }, {duration: 0.5, ease: "easeInOut"})

        animateToggle(!isMuted)

        setIsMuted(prev => !prev)
        setTimeout(() => setIsAnimating(false), 500)

        soundStore.toggleSound()
    }

    const handleHover = () => {
        if (isAnimating) return

        animateBtn(btnRef.current, {
            rotate: [0, -6, 4, -2, 0]
        }, {duration: 0.5, ease: "easeInOut"})
    }

    return (
        <motion.button
            ref={btnRef}
            onClick={handleClick}
            onMouseEnter={handleHover}
            aria-label={isMuted ? "Sound on" : "Sound off"}
            className={cn(
                className,
                "w-8 h-8 relative flex items-center justify-center select-none transition-opacity duration-300 " +
                "ease-in-out hover:opacity-80 cursor-pointer"
            )}
        >
            <Volume/>

            <motion.svg
                width={32}
                height={32}
                viewBox={"0 0 32 32"}
                fill={"none"}
                className={"absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none text-current w-8 h-8"}
            >
                <motion.g
                    ref={arcsRef}
                    initial={{opacity: isMuted ? 0 : 1, scale: isMuted ? 0 : 1}}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={"origin-[1rem_1rem]"}
                >
                    <path d={"M13 12C15 14 15 18 13 20"}/>
                    <path d={"M17 10C20 13 20 19 17 22"}/>
                </motion.g>

                <motion.g
                    ref={crossRef}
                    initial={{opacity: isMuted ? 1 : 0, scale: isMuted ? 1 : 0}}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={"origin-[1rem_1rem]"}
                >
                    <line x1={13} y1={12} x2={21} y2={20}/>
                    <line x1={21} y1={12} x2={13} y2={20}/>
                </motion.g>
            </motion.svg>
        </motion.button>
    )
})
