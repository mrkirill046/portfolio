import React from "react"
import {cn} from "@/lib/utils"

interface Props {
    className?: string
}

export const Footer: React.FC<Props> = ({className}) => {
    return (
        <footer className={cn(className, "")}>
        </footer>
    )
}
