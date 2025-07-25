"use client"

import {motion, useAnimate} from "framer-motion"
import React, {useEffect, useState} from "react"
import {cn} from "@/lib/utils"

interface Props {
    size: number
    className?: string
}

export const FloatingDots: React.FC<Props> = ({size, className}) => {
    const [scope, animate] = useAnimate()

    const [initialPos] = useState(() => {
        const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0
        const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0

        const centerLeftX = viewportWidth * 0.15
        const centerY = viewportHeight * 0.5

        return {
            left: centerLeftX + (Math.random() - 0.5) * 1000,
            top: centerY + (Math.random() - 0.5) * 800
        }
    })

    useEffect(() => {
        const float = () => {
            const offsetX = (Math.random() - 0.5) * 100
            const offsetY = (Math.random() - 0.5) * 100

            animate(scope.current, {
                x: offsetX,
                y: offsetY
            }, {
                duration: 10 + Math.random() * 10,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0
            })
        }

        float()
    }, [animate, scope])

    return (
        <motion.div
            ref={scope}
            className={cn(className, "absolute rounded-full pointer-events-none z-[-5] opacity-60")}
            suppressHydrationWarning
            style={{
                width: size,
                height: size,
                top: initialPos.top,
                left: initialPos.left
            }}
        />
    )
}
