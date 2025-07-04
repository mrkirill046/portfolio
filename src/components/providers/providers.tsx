import React, {ReactNode} from "react"
import {ThemeProvider} from "@/components/providers/theme-provider"

interface Props {
    children: Readonly<ReactNode>
}

export const Providers: React.FC<Props> = ({children}) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}
