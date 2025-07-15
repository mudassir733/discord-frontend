"use client";

import { useState, useEffect } from "react";
import DirectMessageChat from "./direct-message-chat";
import { useIsMobile } from "./use-mobile";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Friend {
    id: string;
    name: string;
    status: "online" | "idle" | "dnd" | "offline" | "streaming" | "invisible";
    statusText?: string;
    avatar: string;
    username: string;
    mutualServers?: number;
}

const friends: Friend[] = [
    {
        id: "1",
        name: "Nova Storm",
        status: "online",
        avatar: "/placeholder.svg?height=48&width=48&text=NS",
        username: "novastorm613",
        mutualServers: 9,
    },
    {
        id: "2",
        name: "Gatty!",
        status: "idle",
        statusText: "AFK",
        avatar: "/placeholder.svg?height=48&width=48&text=G",
        username: "gatty123",
    },
    {
        id: "3",
        name: "Hawk",
        status: "dnd",
        statusText: "Working - Do not disturb",
        avatar: "/placeholder.svg?height=48&width=48&text=H",
        username: "hawk_eye",
    },
    {
        id: "4",
        name: "2b",
        status: "offline",
        avatar: "/placeholder.svg?height=48&width=48&text=2B",
        username: "2b_or_not_2b",
    },
    {
        id: "5",
        name: "Jacob",
        status: "streaming",
        statusText: "Playing Valorant",
        avatar: "/placeholder.svg?height=48&width=48&text=J",
        username: "jacob_gaming",
    },
    {
        id: "6",
        name: "Cr@zyJane",
        status: "online",
        avatar: "/placeholder.svg?height=48&width=48&text=CJ",
        username: "crazy_jane",
    },
    {
        id: "7",
        name: "Haroon arshad",
        status: "online",
        avatar: "/placeholder.svg?height=48&width=48&text=HA",
        username: "haroon_a",
    },
];

export default function FriendsListWithChat() {
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
    const isMobile = useIsMobile();
    const params = useParams();
    const router = useRouter();
    const { id } = params as { id?: string };

    useEffect(() => {
        if (id) {
            const friend = friends.find((f) => f.id === id);
            setSelectedFriend(friend || null);
        } else {
            setSelectedFriend(null);
        }
    }, [id]);

    const handleSelectFriend = (friend: Friend) => {
        router.push(`/channels/me/${friend.id}`);
    };

    const handleBackToList = () => {
        router.push("/channels/me");
        setSelectedFriend(null);
    };

    // On mobile, show either the friends list or the chat
    if (isMobile) {
        return (
            <div className="flex flex-1 h-full">
                {selectedFriend ? (
                    <div className="flex flex-col w-full h-full">
                        <div className="h-12 bg-[#1A1A1E] flex items-center px-4">
                            <button 
                                type="button"
                                onClick={handleBackToList} className="text-[#b5bac1] hover:text-white mr-4"
                                title="Back to Friends List"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <span className="font-medium">{selectedFriend.name}</span>
                        </div>
                        <div className="flex-1">
                            <DirectMessageChat friend={selectedFriend} />
                        </div>
                    </div>
                ) : (
                    null // Replace with friend list component if needed
                )}
            </div>
        );
    }

    // On desktop, show both the friends list and the chat side by side
    return (
        <div className="flex flex-1 h-full">
            <div className="flex-1">
                {selectedFriend ? (
                    <DirectMessageChat friend={selectedFriend} />
                ) : (
                    <div className="flex items-center justify-center h-full bg-[#313338] text-[#b5bac1]">
                        <div className="text-center">
                            <p className="text-lg mb-2">Select a friend to start chatting</p>
                            <p className="text-sm">Your conversations will appear here</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}