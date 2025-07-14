"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronRight, MoreHorizontal, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import FriendProfileModal from "@/components/modals/friend-profile-models"

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
    const [isOpen, setIsOpen] = useState(false)
    // Close sidebar when clicking outside


    if (!selectedFriend) return null

    return (
        <>
        <div 
            className={cn(
                "user-profile-sidebar fixed right-0 top-0 h-full w-[23%] bg-[#232428] z-50 transition-transform duration-300 shadow-lg",
            )}
        >
            {/* Header with action buttons */}
            <div className="absolute right-4 top-4 flex space-x-2">
                <button 
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#2b2d31e2] cursor-pointer flex items-center justify-center text-[#ffffff] hover:bg-[#2b2d31]"
                    title="Add Friend"
                >
                    <UserPlus size={18} />
                </button>
                <button 
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#2b2d31e2] cursor-pointer flex items-center justify-center text-[#ffffff] hover:bg-[#2b2d31]"
                    title="More Options"
                >
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Banner and Avatar */}
            <div className="h-30 bg-[#183d9b]"></div>
            <div className="px-4 pb-4 relative h-full">
                <div className="absolute -top-25 left-3">
                    <div className="relative">
                        <img
                            src={`https://ui-avatars.com/api/?name=${selectedFriend.username}&background=random`}
                            alt={selectedFriend.name}
                            width={80}
                            height={80}
                            className="w-22 h-22 rounded-full border-6 border-[#232428]"
                        />
                        {selectedFriend.status && (
                            <div
                                className={cn(
                                    "absolute bottom-1 right-1 w-[27px] h-[27px] rounded-full border-6 border-[#232428]",
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
                        <div className="text-[13px] text-[#f7faff]">
                            {selectedFriend.username} {selectedFriend.pronouns && `• ${selectedFriend.pronouns}`}
                        </div>
                    </div>
                </div>

                {/* Member Since */}
                <div className="bg-[#2b2d31] rounded-md p-3 mb-3">
                    <h3 className="text-[11px]  font-semibold text-white mb-1">Member Since</h3>
                    <p className="text-sm text-[#d7dbdf]">{selectedFriend.memberSince || "Nov 6, 2024"}</p>
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
                <div className="absolute bottom-42 left-0 right-0 border-t border-[#3f4147] p-3 cursor-pointer text-gray-400 hover:text-gray-200 duration-200 ease-in-out flex justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <button type="button" className="text-[13px]  cursor-pointer">View Full Profile</button>
                </div>
            </div>
        </div>
        <FriendProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} selectedFriend={selectedFriend} />
        </>
    )
}
