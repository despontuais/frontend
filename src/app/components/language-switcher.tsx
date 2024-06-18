"use client"

import * as React from "react"
import { LanguagesIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Languages
} from "lucide-react"
import { locales } from "@/config"
import { usePathname, useRouter } from "@/navigation"

export function LanguageToggle() {
    const { setTheme } = useTheme()
    const router = useRouter();
    const pathname = usePathname();

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <LanguagesIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <LanguagesIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {locales.map((locales, index) => (
                    <DropdownMenuItem key={index} onClick={() => router.replace(pathname, { locale: `${locales}` })}>
                        {capitalizeFirstLetter(`${new Intl.DisplayNames([locales], { type: "language" }).of(locales)}`)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}