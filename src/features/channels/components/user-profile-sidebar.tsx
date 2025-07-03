"use client"

import { useEffect } from "react"
import Image from "next/image"
import { ChevronRight, MoreHorizontal, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfileSidebarProps {
    isOpen: boolean
    onClose: () => void
    selectedFriend: {
        id: string
        name: string
        username: string
        avatar: string
        status?: "online" | "idle" | "dnd" | "offline" | "streaming" | "invisible"
        pronouns?: string
        memberSince?: string
        mutualServers?: number
    } | null
}

export default function UserProfileSidebar({ selectedFriend }: UserProfileSidebarProps) {
    // Close sidebar when clicking outside



    if (!selectedFriend) return null

    return (
        <div
            className={cn(
                "user-profile-sidebar fixed right-0 top-0 h-full w-[310px] bg-[#232428] z-50 transition-transform duration-300 shadow-lg",
            )}
        >
            {/* Header with action buttons */}
            <div className="absolute right-4 top-4 flex space-x-2">
                <button 
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#2b2d31] flex items-center justify-center text-[#b5bac1] hover:text-white"
                    title="Add Friend"
                >
                    <UserPlus size={18} />
                </button>
                <button 
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#2b2d31] flex items-center justify-center text-[#b5bac1] hover:text-white"
                    title="More Options"
                >
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Banner and Avatar */}
            <div className="h-24 bg-[#313338]"></div>
            <div className="px-4 pb-4 relative">
                <div className="absolute -top-22 left-4">
                    <div className="relative">
                        <Image
                            src={selectedFriend.avatar || "/placeholder.svg?height=80&width=80"}
                            alt={selectedFriend.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-full border-4 border-[#232428]"
                        />
                        {selectedFriend.status && (
                            <div
                                className={cn(
                                    "absolute bottom-1 right-1 w-4 h-4 rounded-full border-4 border-[#232428]",
                                    selectedFriend.status === "online" && "bg-[#3ba55c]",
                                    selectedFriend.status === "idle" && "bg-[#faa81a]",
                                    selectedFriend.status === "dnd" && "bg-[#ed4245]",
                                    selectedFriend.status === "offline" && "bg-[#747f8d]",
                                    selectedFriend.status === "streaming" && "bg-[#593695]",
                                )}
                            ></div>
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="mt-12 mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white">{selectedFriend.name}</h2>
                        <div className="text-sm text-[#b5bac1]">
                            {selectedFriend.username} {selectedFriend.pronouns && `• ${selectedFriend.pronouns}`}
                        </div>
                    </div>
                </div>

                {/* Member Since */}
                <div className="bg-[#2b2d31] rounded-md p-3 mb-3">
                    <h3 className="text-sm font-medium text-white mb-1">Member Since</h3>
                    <p className="text-sm text-[#b5bac1]">{selectedFriend.memberSince || "Nov 6, 2024"}</p>
                </div>

                {/* Mutual Servers */}
                {selectedFriend.mutualServers && (
                    <button className="w-full bg-[#2b2d31] rounded-md p-3 flex items-center justify-between hover:bg-[#35373c]">
                        <div>
                            <h3 className="text-sm font-medium text-white">Mutual Servers — {selectedFriend.mutualServers}</h3>
                        </div>
                        <ChevronRight size={20} className="text-[#b5bac1]" />
                    </button>
                )}

                {/* View Full Profile Button */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    <button className="text-sm text-[#b5bac1] hover:text-white hover:underline">View Full Profile</button>
                </div>
            </div>
        </div>
    )
}
