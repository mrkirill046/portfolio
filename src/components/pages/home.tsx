"use client"

import {motion, useAnimate} from "motion/react"
import {useCallback, useEffect} from "react"

export default function HomePage() {
    const [scope, animate] = useAnimate()

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
        <section className={"grid grid-cols-1 md:grid-cols-2 min-h-screen p-6 gap-8 items-center"}>
            <div className={"relative w-full h-[400px]"}>

            </div>

            <div className={"space-y-4"}>
                <motion.h2
                    className={"text-4xl font-bold font-fascinate flex gap-2 items-center origin-left"}
                    ref={scope}
                >
                    <motion.span
                        whileHover={{scale: 1.2}}
                        onHoverStart={handleHover}
                        className={"cursor-pointer"}
                    >
                        👋
                    </motion.span>

                    <span>Hey! I&apos;m Kirill</span>
                </motion.h2>

                <h2 className={"text-6xl font-bold"}>
                    I&apos;m a frontend developer who really cares.
                </h2>
                <h2 className={"text-xl"}>
                    I build for the web with style, clarity, and passion.
                </h2>
                <h2 className={"text-2xl"}>
                    I&apos;m building my future line by line — and I can help build something awesome for you too.
                </h2>
            </div>
        </section>
    )
}
