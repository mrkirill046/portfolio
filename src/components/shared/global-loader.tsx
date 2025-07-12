"use client"

import React, {useEffect, useState} from "react"
import {cn} from "@/lib/utils"

const soundsList = [
    "/sounds/alarm-military.mp3",
    "/sounds/disable-sound.mp3",
    "/sounds/enable-sound.mp3",
    "/sounds/glug-b.mp3",
    "/sounds/iidx-button-sprite.mp3",
    "/sounds/menu-close.mp3",
    "/sounds/menu-open-softer.mp3",
    "/sounds/plunger-immediate.mp3",
    "/sounds/pop-down.mp3",
    "/sounds/pop-up-off.mp3",
    "/sounds/pop-up-on.mp3",
    "/sounds/rising-pops.mp3",
    "/sounds/switch-off.mp3",
    "/sounds/switch-on.mp3",
    "/sounds/tick-sprite.mp3"
]

interface Props {
    className?: string
}

export const GlobalLoader: React.FC<Props> = ({className}) => {
    const [windowLoaded, setWindowLoaded] = useState(false)
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [soundsLoaded, setSoundsLoaded] = useState(false)
    const [shouldShowLoader, setShouldShowLoader] = useState(true)

    useEffect(() => {
        const wasLoaded = sessionStorage.getItem("loaded_once")

        if (wasLoaded === "true") {
            setShouldShowLoader(false)
        }
    }, [])

    useEffect(() => {
        if (!shouldShowLoader) return

        if (document.readyState === "complete") {
            setWindowLoaded(true)
        } else {
            const onLoad = () => setWindowLoaded(true)

            window.addEventListener("load", onLoad)

            return () => window.removeEventListener("load", onLoad)
        }
    }, [shouldShowLoader])

    useEffect(() => {
        if (!shouldShowLoader) return

        if ("fonts" in document) {
            document.fonts.ready.then(() => setFontsLoaded(true))
        } else {
            setFontsLoaded(true)
        }
    }, [shouldShowLoader])

    useEffect(() => {
        if (!shouldShowLoader) return

        let loadedCount = 0

        if (soundsList.length === 0) {
            setSoundsLoaded(true)
            return
        }

        const onLoadSound = () => {
            loadedCount++

            if (loadedCount === soundsList.length) {
                setSoundsLoaded(true)
            }
        }

        const audios = soundsList.map((src) => {
            const audio = new Audio(src)

            audio.addEventListener("canplaythrough", onLoadSound, {once: true})
            audio.load()

            return audio
        })

        return () => {
            audios.forEach((audio) => {
                audio.pause()
                audio.src = ""
            })
        }
    }, [shouldShowLoader])

    const handleClick = () => {
        const loader = document.getElementById("global-loader")

        if (loader) {
            loader.classList.add("opacity-0")

            setTimeout(() => {
                loader.classList.add("hidden")
                loader.classList.remove("opacity-0")
            }, 300)
        }

        sessionStorage.setItem("loaded_once", "true")
    }

    const loaded = windowLoaded && fontsLoaded && soundsLoaded

    if (!shouldShowLoader) {
        return null
    }

    if (shouldShowLoader && loaded) {
        return (
            <div
                className={cn(className, "fixed h-screen z-50 inset-0 bg-background transition-opacity ease-in-out duration-300")}
                id={"global-loader"}
            >
                <div className={"flex h-screen items-center justify-center"}>
                    <button
                        onClick={handleClick}
                        className={"text-4xl h-screen font-semibold rounded cursor-pointer w-full"}
                    >
                        <h1>START</h1>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className={cn(className, "fixed h-screen z-50 inset-0 bg-background transition-opacity ease-in-out duration-300")}
            id={"spin-loader"}
        >
            <div className={"flex h-screen items-center justify-center"}>
                <div
                    className={"w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"}
                />
            </div>
        </div>
    )
}
