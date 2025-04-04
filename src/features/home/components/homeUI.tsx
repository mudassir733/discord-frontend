import React from 'react'
import Image from 'next/image'

// assets
import studyGroup from "@/assets/images/study-group.svg"

function homeUI() {
    return (
        <div className='md:px-[120px] px-[20px] py-[120px]'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
                <div>
                    <Image src={studyGroup} alt='study group svg' />
                </div>
                <article className='md:text-left text-center'>
                    <h1 className='heading-2 md:w-[80%] pt-[30px]'>Create an invite-only place where you belong</h1>
                    <p className='pt-[20px] md:w-[80%]'>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
                </article>
            </div>
        </div>
    )
}

export default homeUI