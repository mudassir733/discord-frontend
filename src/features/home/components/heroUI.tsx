import React from 'react'
import { Download } from 'lucide-react';
import Image from "next/image";

// ui component
import { Button } from "@/components/ui/button";

// utils
import { getTranslation } from '@/lib/i18';


// interfaces
interface HeroUIProps {
    locale: 'en' | 'fr'
}

// assests
import frame from "@/assets/images/Frame.svg";
import frame2 from "@/assets/images/Frame2.svg";

const heroUI = ({ locale }: HeroUIProps) => {
    const safeLocale = locale === 'en' || locale === 'fr' ? locale : 'en'

    return (
        <>
            <div className="absolute bottom-[0%] left-0 z-[-1]">
                <Image src={frame} alt="svg frame" className='md:w-full w-[150px]' />
            </div>
            <div className="flex items-center justify-center pb-[6rem] w-full text-center h-full z-[100]">
                <article className="text-white">
                    <h1 className="heading-1">{getTranslation(safeLocale, "title")}</h1>
                    <p className="md:w-[50%] m-auto pt-[20px] px-[20px] md:px-0 font-[300]">{getTranslation(safeLocale, "text")}</p>
                    <div className="flex items-center w-full justify-center pt-[20px] gap-[24px] md:flex-row flex-col">
                        <Button variant={"primaryBtn"} size={"primaryBtn"}><Download size={40} />{getTranslation(safeLocale, "btn1")}</Button>
                        <Button variant={"secondaryBtn"} size={"primaryBtn"}>{getTranslation(safeLocale, "btn2")}</Button>
                    </div>
                </article>
            </div>
            <div className="absolute bottom-[0%] right-0 z-[-1]">
                <Image src={frame2} alt="svg frame" className='md:w-full w-[150px] ' />
            </div>
        </>
    )
}

export default heroUI