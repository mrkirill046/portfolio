import React from "react"
import {Metadata} from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
    title: "Home"
}

const LazyPage = dynamic(() => import("@/components/pages/home"))

export default function Page() {
    return <LazyPage/>
}
