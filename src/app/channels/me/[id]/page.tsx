"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import DirectMessageChat from "@/features/channels/components/direct-message-chat";
import { Friends as FriendType } from "@/features/channels/components/friend-sidebar";

// Mock friends data (should match FriendsSidebar)
const friends: FriendType[] = [
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

export default function ChatPage() {
    const params = useParams();
    const { id } = params as { id: string };
    const [selectedFriend, setSelectedFriend] = useState<FriendType | null>(null);

    useEffect(() => {
        const friend = friends.find((f) => f.id === id);
        setSelectedFriend(friend || null);
    }, [id]);

    if (!selectedFriend) {
        return <div className="flex-1 flex items-center justify-center text-white">Friend not found</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-[#1A1A1E] w-[70%]">
            <div className="flex-1 overflow-hidden">
                <DirectMessageChat
                    friend={{
                        id: selectedFriend.id,
                        name: selectedFriend.name,
                        avatar: selectedFriend.avatar,
                        username: selectedFriend.name.toLowerCase().replace(/\s/g, "_"), // Simple username generation
                        isOnline: selectedFriend.status === "Online",
                    }}
                />
            </div>
        </div>
    );
}