import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronRight, MoreHorizontal, UserPlus } from "lucide-react"
import { MessageCircle } from 'lucide-react';

interface FriendProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const FriendProfileModal = ({ isOpen, onClose, selectedFriend }: FriendProfileModalProps) => {

  if (!selectedFriend) return null;
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className={cn(
                        " w-[800px] h-[90%] block p-0 rounded-xl bg-[#232428] z-50 transition-transform duration-300 shadow-lg",
                    )}>
            <DialogHeader className="hidden">
                <DialogTitle className="font-semibold text-white">Friend Profile</DialogTitle>
            </DialogHeader>
          {/* Header with action buttons */}
            <div className="absolute z-50 right-4 top-4 flex space-x-2">
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
            <div className="h-34 bg-[#9c27b0] rounded-t-xl"></div>
            <div className="px-4 pb-4 relative h-full">
                <div className="absolute top-[-109px] left-4">
                    <div className="relative">
                        <img
                            src={`https://ui-avatars.com/api/?name=${selectedFriend.username}&background=random`}
                            alt={selectedFriend.name}
                            width={80}
                            height={80}
                            className="w-25 h-25 rounded-full border-4 border-[#232428]"
                        />
                        {selectedFriend.status && (
                            <div
                                className={cn(
                                    "absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-[#232428]",
                                    selectedFriend.status === "online" && "bg-[#3ba55c]",
                                    selectedFriend.status === "idle" && "bg-[#faa81a]",
                                    selectedFriend.status === "dnd" && "bg-[#ed4245]",
                                    selectedFriend.status === "offline" && "bg-[#747f8d]",
                                    selectedFriend.status === "streaming" && "bg-[#593695]",
                                )}
                            ></div>
                        )}
                    </div>
                    <div className="absolute text-white flex items-center gap-1 text-sm left-[380px] top-[60px] bg-[#2b2d31] rounded-lg p-2">
                      <MessageCircle className="" />
                      Message
                    </div>
                </div>

                {/* User Info */}
                <div className="mt-14 mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white">{selectedFriend.name}</h2>
                        <div className="text-sm text-[#b5bac1]">
                            {selectedFriend.username} {selectedFriend.pronouns && `• ${selectedFriend.pronouns}`}
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default FriendProfileModal;