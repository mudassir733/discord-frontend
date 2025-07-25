
"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";


// components
import DirectMessageChat from "@/features/channels/components/direct-message-chat";



// hooks
import { useFriends } from "@/hooks/users/getFriends";
import { useFetchDirectChannel } from "@/hooks/chat/useFetchDirectChannel";
import { useAuthUser } from "@/hooks/auth/useAuthUser";
import { useSocketConnection } from "@/hooks/chat/useSocketConnection";

// DirectMessageChat expected friend type
interface DirectMessageChatFriend {
    id: string;
    name: string;
    avatar: string;
    username: string;
    isOnline: boolean;
}


export default function ChatPage() {
    const params = useParams();
    const { id } = params as { id?: string } || { id: null };
    const { userId } = useAuthUser();


    // local states
    const [selectedFriend, setSelectedFriend] = useState<DirectMessageChatFriend | null>(null);


    // use hooks
    const { data: friends = [], isLoading, error } = useFriends({
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
    });
    const otherUserUsername = friends.find((friend) => friend.id !== id)?.username || null;
    const { data: fetchDirectChannel } = useFetchDirectChannel(otherUserUsername || "");
    const socket = useSocketConnection(userId || "");
    console.log(fetchDirectChannel)



    useEffect(() => {
        if (!friends || friends.length === 0) return;

        const friend = friends.find((f) => f.id === id);
        if (friend) {

            setSelectedFriend({
                id: friend.id,
                name: friend.displayName,
                avatar: "/avatars/default.png",
                username: friend.username,
                isOnline: friend.status === "online",
            });
        } else {
            setSelectedFriend(null);
        }
    }, [id, friends]);

    if (isLoading) {
        return <div className="flex-1 flex items-center justify-center text-white">Loading friend...</div>;
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center text-white">
                {error.message.includes("401")
                    ? "Please log in to view this chat."
                    : "Failed to load friend. Please try again."}
            </div>
        );
    }

    if (!selectedFriend) {
        return <div className="flex-1 flex items-center justify-center text-white">Friend not found</div>;
    }


    return (
        <div className="flex flex-col h-screen bg-[#1A1A1E] w-[70%]">
            <div className="flex-1 overflow-hidden">
                <DirectMessageChat friend={selectedFriend} />
            </div>
        </div>
    );
}
