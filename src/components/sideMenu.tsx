import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react';

// assets
import logo from "@/assets/images/logo.svg"



const links = [
    { label: 'Downloads', href: '/downloads' },
    { label: 'Nitro', href: '/nitro' },
    { label: 'Discover', href: '/servers' },
    { label: 'Safty', href: '/safty' },
    { label: 'Support', href: '/support' },
    { label: 'Blog', href: '/blog' },
    { label: 'Career', href: '/career' },

]


interface SideMenuProps {
    closeMenu: () => void;
}

const sideMenu: React.FC<SideMenuProps> = ({ closeMenu }) => {
    return (
        <div className='w-[300px] bg-[#23272A] h-full fixed left-0 bottom-0 top-0 shadow-lg z-[300]'>
            <div className='relative w-full h-full'>
                <div className='absolute right-[10px] top-[10px]'>
                    <X color='#fff' size={38} cursor="pointer" onClick={closeMenu} />
                </div>
                <div className='pt-[30px] pl-[30px]'>
                    <Link href="/">
                        <Image src={logo} alt='logo' />
                    </Link>
                </div>
                <div>
                    <ul className='flex flex-col pl-[25px] pt-[20px] pr-[20px]'>
                        {links.map((link, index) => (
                            <li key={index} className='hover:bg-white py-1.5 px-3 text-white hover:text-[#111] transition-all duration-200 rounded-full hover:shadow-md'>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default sideMenu