import React, {ReactNode} from "react"
import {Providers} from "@/components/providers/providers"
import {Header} from "@/components/shared/header"
import {Footer} from "@/components/shared/footer"

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <Providers>
            <Header/>

            <main>
                {children}
            </main>

            <Footer/>
        </Providers>
    )
}
