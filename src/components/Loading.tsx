
"use client";

import Image from "next/image";
import loadingGif from "@/assets/images/Discord.gif";

export function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Image
                src={loadingGif}
                alt="Loading"
                width={100}
                height={100}
                className="object-contain"
                unoptimized
            />
        </div>
    );
}
