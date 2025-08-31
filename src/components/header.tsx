"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Ellipsis } from 'lucide-react';

// assets
import logo from "@/assets/images/logo.svg";

// component
import SideMenu from "@/components/sideMenu";

// ui components
import { Button } from './ui/button'

// utils
import { getTranslation } from '@/lib/i18';


// interfaces
interface HeaderProps {
    locale: 'en' | 'fr'
}




const Header = ({ locale }: HeaderProps) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const safeLocale = locale === 'en' || locale === 'fr' ? locale : 'en'

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [menuOpen]);
    const closeMenu = () => setMenuOpen(false);

    const links = [
        { label: getTranslation(safeLocale, "download"), href: '/downloads' },
        { label: getTranslation(safeLocale, "nitro"), href: '/nitro' },
        { label: getTranslation(safeLocale, "Discover"), href: '/servers' },
        { label: getTranslation(safeLocale, "Safty"), href: '/safty' },
        { label: getTranslation(safeLocale, "Support"), href: '/support' },
        { label: getTranslation(safeLocale, "Blog"), href: '/blog' },
        { label: getTranslation(safeLocale, "Career"), href: '/career' },
    ]

    return (
        <div className='w-full h-[80px] bg-transparent flex items-center justify-between md:px-[120px] px-[20px] '>
            <div>
                <Link href="/">
                    <Image src={logo} alt='logo' />
                </Link>
            </div>
            <div>
                <ul className='hidden items-center md:flex'>
                    {links.map((link, index) => (
                        <li key={index} className='hover:bg-white py-1.5 px-3 text-white hover:text-[#111] transition-all duration-200 rounded-full hover:shadow-md'>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex items-center gap-2 flex-row-reverse'>
                <Link href="/en/login">
                    <Button variant={"loginBtn"} size={"loginBtn"}>{getTranslation(safeLocale, "Login")}</Button>
                </Link>

                <div className='md:hidden flex'>
                    <Ellipsis size={48} cursor="pointer" color='#fff' onClick={() => setMenuOpen(!menuOpen)} />
                </div>
            </div>
            {menuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-[#1111112d] bg-opacity-50 z-[350]"
                        onClick={closeMenu}
                    />
                    <div
                        className="md:hidden fixed top-0 left-0 h-full z-[400] transform transition-transform duration-300 ease-in-out"
                        style={{ transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}
                    >
                        <SideMenu closeMenu={closeMenu} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Header