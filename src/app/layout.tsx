import {Comfortaa, Delius, Fascinate, Limelight, Notable} from "next/font/google"
import "./globals.css"
import React, {ReactNode} from "react"
import {Metadata} from "next"
import {CLIENT_URL} from "@/tools/constants"
import {Analytics} from "@vercel/analytics/next"
import {GoogleAnalytics} from "@next/third-parties/google"
import {GlobalLoader} from "@/components/shared/global-loader"

const notable = Notable({
    variable: "--font-notable",
    subsets: ["latin"],
    weight: ["400"]
})

const limelight = Limelight({
    variable: "--font-limelight",
    subsets: ["latin"],
    weight: ["400"]
})

const fascinate = Fascinate({
    variable: "--font-fascinate",
    subsets: ["latin"],
    weight: ["400"]
})

const delius = Delius({
    variable: "--font-delius",
    subsets: ["latin"],
    weight: ["400"]
})

const comfortaa = Comfortaa({
    variable: "--font-comfortaa",
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: {
        default: "Kazuha046 - Developer Portfolio",
        template: "%s - Kazuha046"
    },
    robots: {
        index: true,
        follow: true,
        nocache: false
    },
    applicationName: "Kazuha046",
    appleWebApp: {
        title: "Kazuha046",
        capable: true,
        statusBarStyle: "default"
    },
    metadataBase: new URL(CLIENT_URL),
    icons: {
        icon: [
            {url: "/assets/favicon-96x96.png", type: "image/png", sizes: "96x96"},
            {url: "/assets/favicon.svg", type: "image/svg+xml"},
            {url: "/assets/favicon.ico", rel: "shortcut icon"}
        ],
        apple: [
            {url: "/assets/apple-touch-icon.png", sizes: "180x180"}
        ]
    },
    manifest: "/assets/site.webmanifest",
    keywords: [
        "Kazuha046",
        "developer portfolio",
        "full-stack developer",
        "frontend",
        "backend",
        "Next.js",
        "React",
        "TypeScript",
        "web development",
        "software engineer"
    ],
    authors: [{name: "Kazuha046"}],
    publisher: "Kazuha046",
    generator: "NextJS 15",
    openGraph: {
        title: "Kazuha046 - Developer Portfolio",
        description: "Full-stack developer crafting high-quality websites and apps with modern technologies like React, NextJS, and TypeScript.",
        url: CLIENT_URL,
        siteName: "Kazuha046 Portfolio",
        images: [
            {
                url: "/assets/og-image.png",
                width: 1200,
                height: 630,
                alt: "Kazuha046 Portfolio",
                type: "image/png"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Kazuha046 - Developer Portfolio",
        description: "Full-stack developer focused on modern web technologies, user experience, and speed.",
        site: "@kazuha046",
        creator: "@kazuha046",
        images: ["/assets/og-image.png"]
    },
    referrer: "origin-when-cross-origin"
}

export default function AppLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang={"en"} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    const theme = localStorage.getItem('theme')
                                    
                                    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                        document.documentElement.classList.add('dark')
                                    } else {
                                        document.documentElement.classList.add('light')
                                    }
                                } catch (_) {}
                            })()
                        `,
                    }}
                />
            </head>

            <Analytics/>
            <GoogleAnalytics gaId={"G-073WMB8LQQ"}/>

            <body className={
                `${notable.variable} ${limelight.variable} ${fascinate.variable} ${delius.variable} ${comfortaa.variable} antialiased`
            }>
                <GlobalLoader/>
                {children}
            </body>
        </html>
    )
}
