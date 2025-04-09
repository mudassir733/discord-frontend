"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Twitter, Instagram, Facebook, Youtube } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'

// utils
import { getTranslation } from '@/lib/i18'

// ui component
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'


// assets 
import logo from "@/assets/images/logo.svg"
import usaFlag from "@/assets/images/usaFlag.svg"
import franceFlag from "@/assets/images/franceFlag.svg"


interface FooterProps {
    locale: "en" | "fr"
}


const Footer: React.FC<FooterProps> = ({ locale }) => {

    const safeLocale = (locale === "en" || locale === "fr") ? locale : "en";
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = (newLocale: 'en' | 'fr') => {
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return (
        <footer className="bg-[#23272A] text-gray-300 py-10 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-gray-700">

                    <div className="lg:col-span-1">
                        <h2 className="text-[#5865F2] font-bold text-3xl mb-6">
                            IMAGINE A<br />
                            PLACE
                        </h2>


                        <div className="flex items-center mb-6 gap-2 justify-items-start">
                            <div className='w-[80px] md:w-[100px]'>
                                <Image
                                    src={locale === 'en' ? usaFlag : franceFlag}
                                    alt={locale === 'en' ? 'USA Flag' : 'France Flag'}
                                    width={20}
                                    height={20}
                                    className="rounded-sm"
                                />
                            </div>
                            <div className='w-[60px] md:w-[200px]'>
                                <span className="text-sm">{getTranslation(safeLocale, "footer_language")}</span>
                            </div>

                            <div className="ml-2 flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button>{getTranslation(safeLocale, safeLocale === "en" ? "english" : "french")}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-white">
                                        <DropdownMenuLabel className='text-[#111] font-bold'>Select Language</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={safeLocale} onValueChange={(value) => switchLanguage(value as 'en' | 'fr')} >
                                            <DropdownMenuRadioItem value="en" className='cursor-pointer'>English</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="fr" className='cursor-pointer'>French</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </DropdownMenu>
                            </div>
                        </div>


                        <div className="flex space-x-4">
                            <Link href="#" aria-label="Twitter">
                                <Twitter className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <Instagram className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                            </Link>
                            <Link href="#" aria-label="Facebook">
                                <Facebook className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                            </Link>
                            <Link href="#" aria-label="YouTube">
                                <Youtube className="h-5 w-5 text-gray-300 hover:text-white transition-colors" />
                            </Link>
                        </div>
                    </div>


                    <div className="lg:col-span-1">
                        <h3 className="text-[#5865F2] font-medium mb-4 text-[18px]">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Download
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Nitro
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Status
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="lg:col-span-1">
                        <h3 className="text-[#5865F2] font-medium mb-4 text-[18px]">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Branding
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Newsroom
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="lg:col-span-1">
                        <h3 className="text-[#5865F2] font-medium mb-4 text-[18px]">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    College
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Safety
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Feedback
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Build
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Streamers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Creators
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="lg:col-span-1">
                        <h3 className="text-[#5865F2] font-medium mb-4 text-[18px]">Policies</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Cookie Settings
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Acknowledgements
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Licenses
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Moderation
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row justify-between items-center pt-6">

                    <div className="mb-4 sm:mb-0">
                        <Link href="/">
                            <Image src={logo} alt='logo svg' />
                        </Link>
                    </div>


                    <Link
                        href="#"

                    >
                        <Button variant={"blueBtn"} size={"loginBtn"}>{getTranslation(safeLocale, "signIn")}</Button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer