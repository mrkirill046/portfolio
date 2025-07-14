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
import {LampToggle} from "@/components/shared/lamp-toggle"
import Link from "next/link"
import {Button} from "@/components/ui/button"

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
        <section className={"grid grid-cols-1 xl:grid-cols-[40%_60%] min-h-screen bg-parted"}>
            <motion.div
                className={"hidden relative xl:flex flex-col items-center justify-center py-12 w-full h-full"}
                initial={{clipPath: "inset(100% 0 0 0)", y: 50, opacity: 0}}
                animate={{clipPath: "inset(0% 0 0 0)", y: 0, opacity: 100}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <div className={"absolute inset-0 overflow-hidden z-[-1]"}>
                    {Array.from({length: 25}).map((_, i) => (
                        <FloatingDots
                            key={i}
                            size={24 + Math.random() * 16}
                            className={"bg-foreground/10"}
                        />
                    ))}
                </div>

                <div className={"relative w-full flex justify-center items-center"}>
                    <Lottie animationData={computer} loop className={"w-lg h-lg relative z-0"}/>

                    <div className={"absolute -top-[70%] left-1/2 -translate-x-1/2 z-10"}>
                        <LampToggle/>
                    </div>
                </div>

                <div className={"mt-4"}>
                    <Link href={"#about"}>
                        <Button
                            variant={"link"}
                            className={"font-fascinate uppercase cursor-pointer text-2xl text-foreground"}
                        >
                            About Me
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className={"w-full h-full flex flex-col justify-center items-center relative"}>
                <motion.div
                    className={"flex flex-col justify-center h-full w-full max-w-[26rem] md:max-w-[43rem] space-y-2 md:space-y-6"}
                    initial={{clipPath: "inset(0% 0% 100% 0%)", y: -50, opacity: 0}}
                    animate={{clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 100}}
                    transition={{delay: 0.4, duration: 1.2, ease: "backInOut"}}
                >
                    <motion.h2
                        className={"text-3xl md:text-4xl font-bold font-fascinate flex gap-2 items-center origin-left"}
                        ref={scope}
                    >
                        <motion.span
                            whileHover={{scale: 1.2}}
                            onHoverStart={handleHover}
                            className={"cursor-pointer"}
                            onMouseEnter={() => play()}
                            onMouseLeave={() => stop()}
                        >
                            👋
                        </motion.span>

                        <span>Hey! I&apos;m Kirill</span>
                    </motion.h2>

                    <h2 className={"text-4xl md:text-6xl font-bold"}>
                        <span>I&apos;m a </span>

                        <PhysicsText
                            dropText={"⚡"}
                            text={"fullstack"}
                            className={"text-outline cursor-pointer"}
                        />

                        <br/>

                        <span>
                            developer who

                            <br/>

                            <strong className={"text-outline cursor-pointer"}>really</strong> cares.
                        </span>
                    </h2>

                    <h2 className={"md:text-xl mt-3 md:mt-10 tsm:ext-nowrap"}>
                        I build for the web with&nbsp;

                        <Typewriter
                            words={words}
                            typeSpeed={200}
                            loop={true}
                            cursor={true}
                        />
                    </h2>
                </motion.div>

                <motion.h2
                    className={
                        "hidden sm:block text-md lg:text-xl 2xl:text-2xl absolute bottom-10 right-10 text-right " +
                        "leading-3.5 lg:leading-4.5 2xl:leading-5.5"
                    }
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.8, duration: 0.8, ease: "backInOut"}}
                >
                    I&apos;m building my future line by line — and I can <br/>
                    help build something awesome for you too
                </motion.h2>
            </div>
        </section>
    )
})
