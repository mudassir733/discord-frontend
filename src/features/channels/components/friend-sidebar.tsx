
"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

// assets
import friendIcon from "@/assets/images/friend.svg";
import nitro from "@/assets/images/nitro.svg";
import message from "@/assets/images/message.svg";
import { cn } from "@/lib/utils";

// hooks
import { useFriends } from "@/hooks/users/getFriends";

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


export function FriendsSidebar() {
    const router = useRouter();
    const params = useParams();
    const { id } = params as { id?: string };

    const { data: data = [], isLoading, error } = useFriends({
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });


    const handleFriendClick = (friendId: string) => {
        router.push(`/channels/me/${friendId}`);
    };

    return (
        <ResizableDiv initialWidth={280} minWidth={180} maxWidth={340}>
            <div className="flex flex-col h-screen border-t-[1px] border-zinc-800/90">
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
                            onClick={() => router.push("/channels/me")}
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
                            {data.map((friend) => (
                                <div
                                    key={friend.id}
                                    className={cn(
                                        "flex items-center gap-2 transition-all duration-200 rounded-md p-1 text-sm hover:bg-zinc-800/90 cursor-pointer",
                                        friend.id === id ? "bg-zinc-800/90" : "hover:bg-zinc-800/90"
                                    )}
                                    onClick={() => handleFriendClick(friend.id)}
                                >
                                    <div className="relative">
                                        <Avatar className="bg-[#6765D3]">
                                            {/* <AvatarImage src={friend.avatar} alt={friend.username} /> */}
                                            <AvatarFallback>{friend.username.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute right-0 bottom-0">
                                            <StatusIndicator status={friend.status as StatusType} size="md" />
                                        </div>
                                    </div>
                                    <span className="text-gray-300">{friend.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Tabs>
            </div>
        </ResizableDiv>
    );
}