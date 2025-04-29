
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// assets
import meIcon from "@/assets/images/me.png";

// Server data with notification counts and indicators
const servers = [
    { id: "@me", name: "Discord", icon: "/discord-icon.png", isHome: true },
    { id: "1", name: "Color Wheel", icon: "/me.png" },
    {
        id: "2",
        name: "Gaming Server",
        icon: "/me.png",
        hasNotification: true,
        notificationCount: 16,
    },
    { id: "3", name: "Game Server", icon: "/me.png" },
    {
        id: "4",
        name: "Blue Server",
        icon: "/me.png",
        hasNotification: true,
        notificationCount: 14,
    },
    { id: "5", name: "FZ Server", icon: "/placeholder.svg?height=48&width=48&text=FZ", isText: true },
    { id: "6", name: "Purple Server", icon: "/me.png" },
    {
        id: "7",
        name: "Green Server",
        icon: "/me.png",
        hasNotification: true,
        notificationCount: 2,
    },
    {
        id: "8",
        name: "N Server",
        icon: "/me.png",
        hasNotification: true,
        notificationCount: 324,
    },
    { id: "9", name: "Profile", icon: "/me.png" },
];

export default function ServerSidebar() {
    const pathname = usePathname();
    const currentServerId = pathname.split("/")[2];

    return (
        <div className="w-[72px] h-screen bg-[#121214] flex flex-col items-center pt-3 space-y-2 overflow-y-auto px-5 overflow-x-hidden border-r-[1px] border-zinc-700/90">
            <Link href="/channels/me" className="relative">
                <div
                    className={cn(
                        "w-12 h-12 rounded-2xl bg-[#5865f2] flex items-center justify-center cursor-pointer transition-all mb-2 relative",
                        currentServerId === "@me"
                            ? "rounded-2xl bg-[#5865f2]"
                            : "rounded-full hover:rounded-2xl bg-[#5865f2] hover:bg-[#5865f2]"
                    )}
                >
                    <Image src={meIcon} alt="me icon" className="w-12 h-12 rounded-full object-cover" />
                </div>
                <span
                    className={cn(
                        "w-[4px] bg-white rounded-tr-lg rounded-br-lg absolute -left-3 top-1/2 -translate-y-1/2",
                        currentServerId === "@me" ? "h-[45px]" : "h-[20px]"
                    )}
                />
            </Link>

            <div className="w-8 h-0.5 bg-[#35363c] rounded-full my-1"></div>

            {servers
                .filter((server) => !server.isHome)
                .map((server) => (
                    <Link key={server.id} href={`/channels/${server.id}`} className="relative">
                        <div className="relative">
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all relative",
                                    currentServerId === server.id ? "rounded-2xl" : "rounded-full hover:rounded-2xl"
                                )}
                            >
                                {server.isText ? (
                                    <div className="w-12 h-12 rounded-full bg-[#36393f] flex items-center justify-center text-white font-bold">
                                        {server.name.substring(0, 2)}
                                    </div>
                                ) : (
                                    <Image
                                        src={server.icon || "/placeholder.svg"}
                                        alt={server.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                )}
                            </div>

                            {server.hasNotification && server.notificationCount && (
                                <div
                                    className={cn(
                                        "absolute -right-1 bottom-0 min-w-5 h-5 bg-[#f23f43] rounded-full flex items-center justify-center text-xs font-medium text-white px-1",
                                        server.notificationCount >= 100 ? "min-w-7" : ""
                                    )}
                                >
                                    {server.notificationCount}
                                </div>
                            )}

                            <span
                                className={cn(
                                    "w-[4px] bg-white rounded-tr-lg rounded-br-lg absolute -left-3 top-1/2 -translate-y-1/2",
                                    currentServerId === server.id ? "h-[45px]" : "h-[20px]"
                                )}
                            />
                        </div>
                    </Link>
                ))}
        </div>
    );
}
