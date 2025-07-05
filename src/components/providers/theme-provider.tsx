"use client"

import {ThemeProvider as NextThemesProvider, ThemeProviderProps} from "next-themes"
import React, {ReactNode, useEffect, useState} from "react"

interface Props {
    children: Readonly<ReactNode>
}

export const ThemeProvider: React.FC<Props> = ({children}: ThemeProviderProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <>{children}</>
    }

    return (
        <NextThemesProvider attribute={"class"} defaultTheme={"system"} enableSystem>
            {children}
        </NextThemesProvider>
    )
}
