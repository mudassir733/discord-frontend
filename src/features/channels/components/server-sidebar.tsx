
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


// ui components
import { Button } from "@/components/ui/button";

// assets
import meIcon from "@/assets/images/me.png";
import { Plus } from "lucide-react";
import CreateServerModal from "@/components/modals/create-server-modals";

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
    { id: "5", name: "FZ Server", icon: "/me.png", isText: false },
    { id: "6", name: "Purple Server", icon: "/me.png" },
    {
        id: "7",
        name: "Green Server",
        icon: "/me.png",
        hasNotification: true,
        notificationCount: 2,
    },


];

export default function ServerSidebar() {
    const pathname = usePathname();
    const currentServerId = pathname.split("/")[2];
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);


    const handleCreateServer = () => {
        setIsTemplateModalOpen(true);
    };





    return (
        <div className="w-[72px] h-screen bg-[#121214] flex flex-col items-center pt-3 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden border-r-[1px] border-t-[1px] border-zinc-800/90">
            <Link href="/channels/me" className="relative  ">
                <div
                    className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all relative",
                    )}
                >
                    <Image src={meIcon} alt="me icon" width={48}
                        height={48} className="w-9 h-9 rounded object-cover" />
                </div>
                <span
                    className={cn(
                        "w-[4px] bg-white rounded-tr-lg transition-all duration-200 rounded-br-lg absolute -left-3 top-1/2 -translate-y-1/2",
                        currentServerId === "me" ? "h-[45px]" : "h-[20px]"
                    )}
                />
            </Link>


            {servers
                .filter((server) => !server.isHome)
                .map((server) => (
                    <Link key={server.id} href={`/channels/${server.id}`} className="relative">
                        <div className="relative">
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-full  flex items-center justify-center cursor-pointer transition-all relative",
                                    currentServerId === server.id ? "rounded-2xl" : "rounded-md hover:rounded-2xl"
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
                                        className="w-9 h-9  object-cover"
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
                                    "w-[4px] bg-white rounded-tr-lg transition-all duration-200 rounded-br-lg absolute -left-3 top-1/2 -translate-y-1/2",
                                    currentServerId === server.id ? "h-[45px]" : "h-[20px]"
                                )}
                            />
                        </div>
                    </Link>
                ))}


            <div className="p-2">
                <Button
                    size="icon"
                    className=" w-10 h-10 rounded-md  flex items-center justify-center cursor-pointer  relative bg-zinc-800/90 hover:bg-[#5865F2] transition-all duration-200"
                    onClick={handleCreateServer}
                >
                    <Plus className="text-white" />
                </Button>
            </div>



            <CreateServerModal isOpen={isTemplateModalOpen} onClose={() => setIsTemplateModalOpen(false)} />


        </div>





    );
}
