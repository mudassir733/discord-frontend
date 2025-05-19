
"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// assets
import friendIcon from "@/assets/images/friend.svg";
import nitro from "@/assets/images/nitro.svg";
import message from "@/assets/images/message.svg";

// ui components
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import StatusIndicator, { StatusType } from "@/components/status-indicator";
import ResizableDiv from "@/components/resizable-div";

export interface Friends {
    id: string;
    avatar: string;
    name: string;
    status: StatusType;
}
// Mock data for DMs
const friends: Friends[] = [
    { id: "1", name: "M.Awais", avatar: "/avatars/mawais.png", status: "Online" },
    { id: "2", name: "Gatty !", avatar: "/avatars/gatty.png", status: "Online" },
    { id: "3", name: "Hawk", avatar: "/avatars/hawk.png", status: "Idle" },
    { id: "4", name: "2b", avatar: "/avatars/2b.png", status: "dnd" },
    { id: "5", name: "Jacob", avatar: "/avatars/jacob.png", status: "offline" },
    { id: "6", name: "Cr0zY-jane", avatar: "/avatars/crzyjane.png", status: "offline" },
    { id: "7", name: "Haroon arshad", avatar: "/avatars/haroon.png", status: "offline" },
    { id: "8", name: "Cr0zY-jane", avatar: "/avatars/crzyjane.png", status: "offline" },
    { id: "9", name: "Haroon arshad", avatar: "/avatars/haroon.png", status: "offline" },
    { id: "10", name: "Haroon arshad", avatar: "/avatars/haroon.png", status: "offline" },
    { id: "11", name: "Haroon arshad", avatar: "/avatars/haroon.png", status: "offline" },
];

export function FriendsSidebar() {
    const router = useRouter();

    const handleFriendClick = (friendId: string) => {
        router.push(`/channels/me/${friendId}`);
    };

    return (
        <ResizableDiv initialWidth={280} minWidth={180} maxWidth={340}>
            <div className="flex flex-col h-screen">
                {/* Search Bar */}
                <div className="p-2 border-b-[1px] border-zinc-800/90">
                    <Input
                        placeholder="Find or start a conversation"
                        className="bg-[#1e1f22] text-white border-none rounded-md"
                    />
                </div>
                <Tabs className="flex-1 mt-2">
                    <TabsList className="px-3 flex flex-col items-start gap-1 border-b-[1px] border-zinc-800/90">
                        <TabsTrigger
                            value="friends"
                            className="data-[state=active]:text-white text-gray-400 cursor-pointer hover:bg-zinc-800/90 w-full text-left py-2 px-2 transition-all duration-200 rounded-md data-[state=active]:bg-zinc-800/90 text-sm flex items-center gap-2"
                        >
                            <Image src={friendIcon} alt="friend" />
                            Friends
                        </TabsTrigger>
                        <TabsTrigger
                            value="nitro"
                            className="data-[state=active]:text-white text-gray-400 cursor-pointer hover:bg-zinc-800/90 w-full text-left py-2 px-2 transition-all duration-200 rounded-md data-[state=active]:bg-zinc-800/90 text-sm flex items-center gap-2"
                        >
                            <Image src={nitro} alt="nitro" />
                            Nitro
                        </TabsTrigger>
                        <TabsTrigger
                            value="shop"
                            className="data-[state=active]:text-white text-gray-400 cursor-pointer hover:bg-zinc-800/90 w-full text-left py-2 px-2 transition-all duration-200 rounded-md data-[state=active]:bg-zinc-800/90 text-sm flex items-center gap-2"
                        >
                            <Image src={message} alt="message" />
                            Shop
                        </TabsTrigger>
                    </TabsList>

                    {/* Direct Messages */}
                    <div className="px-3 py-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-gray-400 text-xs font-semibold uppercase">Direct Messages</h3>
                            <Plus size={18} className="text-gray-400 cursor-pointer" />
                        </div>
                        <div className="mt-2 space-y-1">
                            {friends.map((friend) => (
                                <div
                                    key={friend.id}
                                    className="flex items-center gap-2 transition-all duration-200 rounded-md p-1 text-sm hover:bg-zinc-800/90 cursor-pointer"
                                    onClick={() => handleFriendClick(friend.id)}
                                >
                                    <div className="relative">
                                        <Avatar className="bg-[#6765D3]">
                                            <AvatarImage src={friend.avatar} alt={friend.name} />
                                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute right-0 bottom-0">
                                            <StatusIndicator status={friend.status} size="md" />
                                        </div>
                                    </div>
                                    <span className="text-gray-300">{friend.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Tabs>
            </div>
        </ResizableDiv>
    );
}