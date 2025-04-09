import React from 'react'
import Image from 'next/image'
import { Download } from 'lucide-react';

// assets
import studyGroup from "@/assets/images/study-group.svg"
import voiceConnected from "@/assets/images/voiceConnected.svg"
import coach from "@/assets/images/coach.svg"
import chilling from "@/assets/images/chilling.svg"
import { Button } from '@/components/ui/button'



// utils
import { getTranslation } from '@/lib/i18';


// interfaces
interface HomeUIProps {
    locale: 'en' | 'fr'
}

function homeUI({ locale }: HomeUIProps) {
    const safeLocale = locale === 'en' || locale === 'fr' ? locale : 'en'
    return (
        <>
            <div className='md:px-[120px] px-[20px] py-[120px]'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
                    <div>
                        <Image src={studyGroup} alt='study group svg' />
                    </div>
                    <article className='md:text-left text-center'>
                        <h1 className='heading-2 md:w-[80%] pt-[30px]'>{getTranslation(safeLocale, "heading1")}</h1>
                        <p className='pt-[20px] md:w-[80%]'>{getTranslation(safeLocale, "text2")}</p>
                    </article>
                </div>

            </div>
            <div className='md:px-[120px] px-[20px] py-[80px] bg-[#F6F6F6]'>

                <div className='grid md:grid-cols-2 grid-cols-1 gap-7 '>
                    <article className='md:text-left text-center'>
                        <h1 className='heading-2 md:w-[80%] pt-[30px]'>{getTranslation(safeLocale, "heading2")}</h1>
                        <p className='pt-[20px] md:w-[80%]'>{getTranslation(safeLocale, "text3")}</p>
                    </article>
                    <div>
                        <Image src={voiceConnected} alt='study group svg' />
                    </div>
                </div>
            </div>

            <div className='md:px-[120px] px-[20px] py-[120px]'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
                    <div>
                        <Image src={coach} alt='study group svg' />
                    </div>
                    <article className='md:text-left text-center'>
                        <h1 className='heading-2 md:w-[80%] pt-[30px]'>{getTranslation(safeLocale, "heading3")}</h1>
                        <p className='pt-[20px] md:w-[80%]'>{getTranslation(safeLocale, "text4")}.</p>
                    </article>
                </div>

            </div>

            <div className='md:px-[120px] px-[20px] py-[120px] bg-[#F6F6F6]'>
                <div className='text-center w-full'>
                    <h2 className='heading-2'>{getTranslation(safeLocale, "heading4")}</h2>
                    <p className='pt-[20px] md:w-[80%] m-auto'>{getTranslation(safeLocale, "text5")}.</p>
                    <Image src={chilling} alt='chilling svg' />
                    <div className='flex flex-col gap-4 items-center'>
                        <h3 className='heading-3'>{getTranslation(safeLocale, "heading5")}</h3>
                        <Button variant={"blueBtn"} size={"primaryBtn"} className='flex items-center'>
                            <Download /> {getTranslation(safeLocale, "btn1")}</Button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default homeUI