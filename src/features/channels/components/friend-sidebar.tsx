"use client";
import { Mic, Headphones, Settings } from "lucide-react";




// ui components
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Mock data for DMs
const friends = [
    { id: "1", name: "M.Awais", avatar: "/avatars/mawais.png", status: "online" },
    { id: "2", name: "Gatty !", avatar: "/avatars/gatty.png", status: "online" },
    { id: "3", name: "Hawk", avatar: "/avatars/hawk.png", status: "idle" },
    { id: "4", name: "2b", avatar: "/avatars/2b.png", status: "dnd" },
    { id: "5", name: "Jacob", avatar: "/avatars/jacob.png", status: "offline" },
    { id: "6", name: "Cr0zY-jane", avatar: "/avatars/crzyjane.png", status: "offline" },
    { id: "7", name: "Haroon arshad", avatar: "/avatars/haroon.png", status: "offline" },
];

export function FriendsSidebar() {
    return (
        <div className="w-[280px] bg-[#2b2d31] flex flex-col">
            {/* Search Bar */}
            <div className="p-3">
                <Input
                    placeholder="Find or start a conversation"
                    className="bg-[#1e1f22] text-white border-none"
                />
            </div>


            <Tabs className="flex-1">


                {/* Navigation Links */}
                <div className="px-3 py-2 space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                        <span>Friends</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                        <span>Nitro</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                        <span>Shop</span>
                    </div>
                </div>

                {/* Direct Messages */}
                <div className="px-3 py-2">
                    <h3 className="text-gray-400 text-xs font-semibold uppercase">Direct Messages</h3>
                    <div className="mt-2 space-y-1">
                        {friends.map((friend) => (
                            <div
                                key={friend.id}
                                className="flex items-center gap-2 p-1 hover:bg-[#35363c] rounded cursor-pointer"
                            >
                                <Avatar>
                                    <AvatarImage src={friend.avatar} alt={friend.name} />
                                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-gray-300">{friend.name}</span>
                                <div
                                    className={`w-3 h-3 rounded-full ml-auto ${friend.status === "online"
                                        ? "bg-green-500"
                                        : friend.status === "idle"
                                            ? "bg-yellow-500"
                                            : friend.status === "dnd"
                                                ? "bg-red-500"
                                                : "bg-gray-500"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Tabs>

            {/* User Profile */}
            <div className="p-3 bg-[#232428] flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="/avatars/user.png" alt="User" />
                    <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="text-white text-sm font-semibold">Mudassir Ali</p>
                    <p className="text-gray-400 text-xs">Online</p>
                </div>
                <div className="flex gap-2">
                    <Mic className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                    <Headphones className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                    <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>
            </div>
        </div>
    );
}