"use client"

import React, {useEffect, useState} from "react"
import {useTheme} from "next-themes"
import {cn} from "@/lib/utils"
import {Moon, Sun} from "lucide-react"

interface Props {
    className?: string
}

export const ThemeToggle: React.FC<Props> = ({className}) => {
    const {setTheme, resolvedTheme} = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            className={cn(className, "p-2 bg-buttons rounded")}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            {resolvedTheme === "dark" ? <Sun/> : <Moon/>}
        </button>
    )
}
