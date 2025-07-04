import React from "react"
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

interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className={cn(className, "")}>
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            Home
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <ul className={"grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"}>
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
                </NavigationMenuList>
            </NavigationMenu>

            <ThemeToggle/>
        </header>
    )
}

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
