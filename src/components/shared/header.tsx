"use client"

import React, {useEffect, useRef, useState} from "react"
import {cn} from "@/lib/utils"
import {ThemeToggle} from "@/components/shared/theme-toggle"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Image from "next/image"
import {SoundToggle} from "@/components/shared/sound-toggle"
import {MobileMenu} from "@/components/shared/mobile-menu"
import {observer} from "mobx-react-lite"
import useSound from "use-sound"
import {soundStore} from "@/stores/sound-strore"

type Component = {
    title: string
    href: string
    description: string
}

const categories: Component[] = [
    {
        title: "Web Development",
        description: "Articles about frontend, backend, and fullstack",
        href: "/blog/categories/web-development"
    },
    {
        title: "Programming Tips",
        description: "Best practices, coding tricks, and productivity hacks",
        href: "/blog/categories/programming-tips"
    },
    {
        title: "Tech Reviews",
        description: "Insights and reviews of tools and technologies",
        href: "/blog/categories/tech-reviews"
    },
    {
        title: "Personal Growth",
        description: "Thoughts on learning, career, mindset, and success",
        href: "/blog/categories/personal-growth"
    }
]

const goodies: Component[] = [
    {
        title: "Shadow Generator",
        description: "Create beautiful shadows with ease",
        href: "/goodies/shadow-generator"
    },
    {
        title: "Gradient Creator",
        description: "Design smooth gradients effortlessly",
        href: "/goodies/gradient-creator"
    },
    {
        title: "Color Palette Picker",
        description: "Find perfect color combos fast",
        href: "/goodies/color-palette-picker"
    },
    {
        title: "Font Pairing Guide",
        description: "Match fonts for modern design",
        href: "/goodies/font-pairing-guide"
    }
]

interface Props {
    className?: string
}

export const Header: React.FC<Props> = observer(({className}) => {
    const [open, setOpen] = useState<string>("")

    const [playOn] = useSound("/sounds/menu-open-softer.mp3", {
        soundEnabled: soundStore.soundEnabled
    })

    const [playOff] = useSound("/sounds/menu-close.mp3", {
        soundEnabled: soundStore.soundEnabled
    })

    const prevOpenRef = useRef<string>("")

    useEffect(() => {
        const prevOpen = prevOpenRef.current
        const currOpen = open

        if (prevOpen === "" && currOpen !== "") {
            playOn()
        } else if (prevOpen !== "" && currOpen === "") {
            playOff()
        }

        prevOpenRef.current = currOpen
    }, [open, playOn, playOff])

    return (
        <header className={cn(className,
            "fixed top-0 left-0 right-0 z-30 flex items-center px-4 py-3 pb-4 pt-4 backdrop-blur-lg bg-background/80 drop-shadow-lg"
        )}>
            <div className="flex items-center flex-shrink-0">
                <MobileMenu className={"flex lg:hidden"}/>
            </div>

            <NavigationMenu
                viewport={false}
                className={"hidden lg:flex items-center space-x-4 min-w-48"}
                value={open}
                onValueChange={setOpen}
            >
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className={"bg-transparent text-inherit hover:bg-transparent focus:bg-transparent focus:ring-0"}
                        >
                            Home
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <ul className={"grid gap-2 md:w-[25rem] lg:w-[31.25rem] lg:grid-cols-[.75fr_1fr]"}>
                                <li className={"row-span-3"}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className={
                                                "from-muted/50 to-muted flex h-full w-full flex-col justify-center " +
                                                "items-center rounded-md bg-linear-to-b p-4 no-underline outline-hidden " +
                                                "select-none focus:shadow-md"
                                            }
                                            href={"/#top"}
                                        >
                                            <Image
                                                src={"/assets/avatar.webp"}
                                                alt={"Kazuha profile avatar"}
                                                width={100}
                                                height={100}
                                            />

                                            <div className={"mt-2 mb-2 text-lg font-medium text-center"}>
                                                kazuha046
                                            </div>

                                            <p className={"text-muted-foreground text-sm leading-tight text-center"}>
                                                Fullstack developer building modern web apps with NextJS & Spring Boot
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>

                                <ListItem href={"/#projects"} title={"Projects"}>
                                    Explore real-world applications built with Next.js and Java Spring Boot.
                                </ListItem>

                                <ListItem href={"/#about"} title={"About Me"}>
                                    Learn more about my background, tech stack, and development journey.
                                </ListItem>

                                <ListItem href={"/#contact"} title={"Contact"}>
                                    Let&#39;s connect! Reach out for collaborations, freelance, or internships.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className={"bg-transparent text-inherit hover:bg-transparent focus:bg-transparent focus:ring-0"}
                        >
                            Goodies
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <ul className={"grid w-[25rem] gap-2 md:w-[31.25rem] md:grid-cols-2 lg:w-[37.5rem]"}>
                                {goodies.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className={"bg-transparent text-inherit hover:bg-transparent focus:bg-transparent focus:ring-0"}
                        >
                            Categories
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <ul className={"grid w-[25rem] gap-2 md:w-[31.25rem] md:grid-cols-2 lg:w-[37.5rem]"}>
                                {categories.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className={
                "sm:absolute sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 pointer-events-none select-none " +
                "flex-grow flex justify-center text-center"
            }>
                <h1 className={"text-lg sm:text-xl font-bold uppercase md:text-2xl sm:whitespace-nowrap leading-4 sm:leading-none"}>
                    kazuha046 portfolio
                </h1>
            </div>

            <div className={
                "sm:absolute sm:right-4 sm:top-1/2 sm:transform sm:-translate-y-1/2 flex items-center space-x-1 min-w-24 justify-end"
            }>
                <SoundToggle/>
                <ThemeToggle/>
            </div>
        </header>
    )
})

function ListItem(
    {
        title,
        children,
        href,
        ...props
    }: React.ComponentPropsWithoutRef<"li"> & { href: string }
) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className={"text-sm leading-none font-medium"}>{title}</div>

                    <p className={"text-muted-foreground line-clamp-2 text-sm leading-snug"}>
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
