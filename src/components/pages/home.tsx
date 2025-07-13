"use client"

import {motion, useAnimate} from "motion/react"
import {useCallback, useEffect} from "react"
import {Typewriter} from "react-simple-typewriter"
import {PhysicsText} from "@/components/shared/physics-text"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"
import {observer} from "mobx-react-lite"
import Lottie from "lottie-react"
import computer from "@/animations/computer.json"
import {FloatingDots} from "@/components/shared/floating-dots"

const words = [
    "impact", "logic", "scalability",
    "clarity", "speed", "emotion",
    "precision", "trust", "style",
    "simplicity", "delight", "structure",
    "performance", "clean code", "consistency",
    "accessibility"
]

export default observer(function HomePage() {
    const [scope, animate] = useAnimate()
    const [play, {stop}] = useSound("/sounds/rising-pops.mp3", {soundEnabled: soundStore.soundEnabled, volume: 0.5})

    useEffect(() => {
        animate(scope.current, {rotate: [0, -5, 5, -5, 5, 0]}, {
            duration: 0.8,
            ease: "easeInOut"
        })
    }, [animate, scope])

    const handleHover = useCallback(() => {
        animate(scope.current, {rotate: [0, -5, 5, -5, 5, 0]}, {
            duration: 0.8,
            ease: "easeInOut"
        })
    }, [animate, scope])

    return (
        <section
            className={"flex flex-col md:flex-row min-h-screen p-12 items-center justify-between bg-parted gap-20"}
        >
            {/* TODO: сделать плавную анимацию появления везде и добавит блоки какие-нибудь типа кнопки мб */}
            <div className="absolute inset-0 overflow-hidden z-[-1]">
                {Array.from({length: 25}).map((_, i) => (
                    <FloatingDots
                        key={i}
                        size={24 + Math.random() * 16}
                        className={"bg-foreground/50"}
                    />
                ))}
            </div>

            <div className={"flex-1 flex ml-12 items-center"}>
                <Lottie animationData={computer} loop={true} className={"w-lg h-lg"}/>
            </div>

            <div className={"flex-1 space-y-4 flex flex-col"}>
                <motion.h2
                    className={"text-4xl font-bold font-fascinate flex gap-2 items-center origin-left"}
                    ref={scope}
                >
                    <motion.span
                        whileHover={{scale: 1.2}}
                        onHoverStart={handleHover}
                        className={"cursor-pointer"}
                        onMouseEnter={() => {
                            play()
                        }}
                        onMouseLeave={() => {
                            stop()
                        }}
                    >
                        👋
                    </motion.span>

                    <span>Hey! I&apos;m Kirill</span>
                </motion.h2>

                <h2 className={"text-6xl font-bold"}>
                    <span>I&apos;m a </span>

                    <PhysicsText
                        dropText={"⚡"}
                        text={"fullstack"}
                        className={"text-outline cursor-pointer"}
                    />

                    <span> developer who <strong className={"text-outline cursor-pointer"}>really</strong> cares.</span>
                </h2>

                <h2 className={"text-xl mt-4"}>
                    I build for the web with <Typewriter words={words} typeSpeed={200} loop={true} cursor={true}/>
                </h2>

                <h2 className={"text-2xl absolute bottom-10 text-right right-10 leading-5.5"}>
                    I&apos;m building my future line by line — and I can <br/>
                    help build something awesome for you too
                </h2>
            </div>
        </section>
    )
})
