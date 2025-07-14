import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { cn } from "@/lib/utils";
import { useState } from "react";
import { MoreHorizontal, UserPlus } from "lucide-react"
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

  const [activeTab, setActiveTab] = useState<"about" | "noFriends" | "servers">("about");
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className={cn(
                        "sm:max-w-[600px] h-[93%] table gap-0 p-0 rounded-xl bg-[#232428] z-50 transition-transform duration-300 shadow-lg",
                    )}>
            <DialogHeader className="hidden">
                <DialogTitle className="font-semibold text-white">Friend Profile</DialogTitle>
            </DialogHeader>
          {/* Header with action buttons */}
            <div className="absolute z-50 right-3 top-4 flex space-x-2">
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
            <div className="h-53 bg-yellow-600 rounded-t-xl"></div>
            <div className="px-4 pb-4 relative">
                <div className="absolute top-[-70px] left-4">
                    <div className="relative">
                        <img
                            src={`https://ui-avatars.com/api/?name=${selectedFriend.username}&background=random`}
                            alt={selectedFriend.name}
                            width={80}
                            height={80}
                            className="w-32 h-32 rounded-full border-8 border-[#232428]"
                        />
                        {selectedFriend.status && (
                            <div
                                className={cn(
                                    "absolute bottom-1.5 right-1 w-10 h-10 rounded-full border-8 border-[#232428]",
                                    selectedFriend.status === "online" && "bg-[#3ba55c]",
                                    selectedFriend.status === "idle" && "bg-[#faa81a]",
                                    selectedFriend.status === "dnd" && "bg-[#ed4245]",
                                    selectedFriend.status === "offline" && "bg-[#747f8d]",
                                    selectedFriend.status === "streaming" && "bg-[#593695]",
                                )}
                            ></div>
                        )}
                    </div>
                    <div className="absolute text-white flex font-semibold items-center gap-1 text-xs left-[475px] top-[90px] bg-[#2f3135] rounded-lg px-3 py-2 hover:bg-[#40444b] cursor-pointer">
                      <MessageCircle size={16} />
                      Message
                    </div>
                </div>

                {/* User Info */}
                <div className="mb-2 pt-15">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white">{selectedFriend.name}</h2>
                        <div className="text-xs text-[#f5f9ff]">
                            {selectedFriend.username} {selectedFriend.pronouns && `• ${selectedFriend.pronouns}`}
                        </div>
                    </div>
                </div>
            </div>
            {/* Tabs for different sections */}
          <div className="flex max-w-full flex-col gap-6">
      <Tabs defaultValue="about" value={activeTab} onValueChange={(value) => setActiveTab(value as "about" | "noFriends" | "servers")}>
        <TabsList className="block w-full p-0 text-[#e7ebef] border-b rounded-b-none border-zinc-600">
          <TabsTrigger value="about" className={`px-0 mx-3 text-[13px] cursor-pointer hover:border-b-2 rounded-none hover:border-b-[#e7ebef] ${activeTab === "about" ? "border-b-2 border-b-[#e7ebef]" : ""}`}>About Me</TabsTrigger>
          <TabsTrigger value="noFriends" className={`px-0 ml-10 mr-3 text-[13px] cursor-pointer hover:border-b-2 rounded-none hover:border-b-[#e7ebef] ${activeTab === "noFriends" ? "border-b-2 border-b-[#e7ebef]" : ""}`}>No Mutual Friends</TabsTrigger>
          <TabsTrigger value="servers" className={`px-0 ml-10 text-[13px] cursor-pointer hover:border-b-2 rounded-none hover:border-b-[#e7ebef] ${activeTab === "servers" ? "border-b-2 border-b-[#e7ebef]" : ""}`}>Mutual Servers</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
            {/* Member Since */}
                <div className=" p-3 mb-3">
                    <h3 className="text-[11px]  font-semibold text-white mb-1">Member Since</h3>
                    <p className="text-sm text-[#dbdfe4]">{selectedFriend.memberSince || "Nov 6, 2024"}</p>
                </div>
                <div className=" p-3 mb-3">
                    <h3 className="text-[11px]  font-semibold text-white mb-1">Note (only visible to you)</h3>
                    <input type="text" title="Member Since" className="w-full text-sm text-[#dbdfe4] border border-[#232428] hover:border hover:border-zinc-600 rounded-xs pb-4 p-0.5 duration-300" placeholder="CLick to add a note" />
                </div>
        </TabsContent>
        <TabsContent value="noFriends">
            <div className="space-y-8 text-white flex items-center justify-center">
                <h1 className="text-xl mt-3">NO FRIENDS IN COMMON</h1>
            </div>
        </TabsContent>
        <TabsContent value="servers">
            <div className="space-y-4 p-3 text-white">
                <div>
                    <h3 className="text-[11px]  font-semibold text-white mb-1">Mutual Servers</h3>
                    <p className="text-sm text-[#dbdfe4]">{selectedFriend.mutualServers || 0} Mutual Servers</p>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default FriendProfileModal;