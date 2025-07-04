import {ThemeProvider as NextThemesProvider, ThemeProviderProps} from "next-themes"
import React, {ReactNode} from "react"

interface Props {
    children: Readonly<ReactNode>
}

export const ThemeProvider: React.FC<Props> = ({children, ...props}: ThemeProviderProps) => {
    return (
        <NextThemesProvider attribute={"class"} defaultTheme={"system"} enableSystem {...props}>
            {children}
        </NextThemesProvider>
    )
}
