import React from 'react'
import { Download } from 'lucide-react';
import Image from "next/image";

// ui component
import { Button } from "@/components/ui/button";

// assests
import frame from "@/assets/images/Frame.svg";
import frame2 from "@/assets/images/Frame2.svg";

function heroUI() {
    return (
        <>
            <div className="absolute bottom-[0%] left-0 z-[-1]">
                <Image src={frame} alt="svg frame" className='md:w-full w-[150px]' />
            </div>
            <div className="flex items-center justify-center pb-[6rem] w-full text-center h-full z-[100]">
                <article className="text-white">
                    <h1 className="heading-1">Imagine a place...</h1>
                    <p className="md:w-[50%] m-auto pt-[20px] px-[20px] md:px-0 font-[300]">...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                    <div className="flex items-center w-full justify-center pt-[20px] gap-[24px] md:flex-row flex-col">
                        <Button variant={"primaryBtn"} size={"primaryBtn"}><Download size={40} />Downloads For Windows</Button>
                        <Button variant={"secondaryBtn"} size={"primaryBtn"}>Open Discord In Your Browser</Button>
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