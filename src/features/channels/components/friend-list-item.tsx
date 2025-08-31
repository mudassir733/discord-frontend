"use client"

import { MoreVertical, MessageCircle } from "lucide-react"
import UserAvatar from "./user-avatar"
import { cn } from "@/lib/utils"

type StatusType = "online" | "idle" | "dnd" | "offline" | "streaming" | "invisible"

interface FriendsListItemProps {
    id: string
    name: string
    status: StatusType
    statusText?: string
    avatar: string
    isSelected?: boolean
    onClick?: () => void
}

export default function FriendsListItem({
    name,
    status,
    statusText,
    avatar,
    isSelected = false,
    onClick,
}: FriendsListItemProps) {
    return (
        <div
            className={cn(
                "flex items-center px-2 py-2.5 mx-2 rounded cursor-pointer",
                isSelected ? "bg-[#393c41]" : "hover:bg-[#393c41]",
            )}
            onClick={onClick}
        >
            <UserAvatar src={avatar} alt={name} status={status} size="md" />

            <div className="flex-1 ml-3">
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs text-[#b5bac1]">
                    {statusText ||
                        (status === "online"
                            ? "Online"
                            : status === "idle"
                                ? "Idle"
                                : status === "dnd"
                                    ? "Do Not Disturb"
                                    : "Offline")}
                </div>
            </div>

            <div className="flex space-x-2 text-[#b5bac1]">
                <button
                    type="button"
                    className="w-9 h-9 rounded-full hover:bg-[#2e3035] flex items-center justify-center"
                    title="Message"
                >
                    <MessageCircle size={20} />
                </button>
                <button
                    type="button"
                    className="w-9 h-9 rounded-full hover:bg-[#2e3035] flex items-center justify-center"
                    title="More Options"
                >
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>
    )
}
