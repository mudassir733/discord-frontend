"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { PlusCircle, Gift, Sticker, Smile, Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Phone, Video, Bell, Users, Search } from "lucide-react"
import UserProfileSidebar from "./user-profile-sidebar"

interface Message {
    id: string
    content: string
    sender: "user" | "friend"
    timestamp: string
    reactions?: { emoji: string; count: number }[]
}

interface DirectMessageChatProps {
    friend: {
        id: string
        name: string
        avatar: string
        username: string
        mutualServers?: number
        isOnline?: boolean
        status?: "online" | "idle" | "dnd" | "offline" | "streaming" | "invisible"
        pronouns?: string
        memberSince?: string
    }
}

export default function DirectMessageChat({ friend }: DirectMessageChatProps) {
    const [inputValue, setInputValue] = useState("")

    // first letter of friend name
    const firstLetter = friend.name.charAt(0).toUpperCase()
    // last letter of friend name
    const lastLetter = friend.name.charAt(friend.name.length - 1).toUpperCase()
    const [searchQuery, setSearchQuery] = useState("")


    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hi",
            sender: "friend",
            timestamp: "5/15/25, 1:33 PM",
        },
        {
            id: "2",
            content: "hi",
            sender: "user",
            timestamp: "5/15/25, 3:05 PM",
        },
        {
            id: "3",
            content:
                "Nice to meet you\nI saw your post.\nDo you need some help with your project now?\nI am software developer, so i can help you",
            sender: "friend",
            timestamp: "5/15/25, 3:05 PM",
        },
    ])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [showReactions, setShowReactions] = useState<string | null>(null)
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false)

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: "user",
            timestamp: new Date().toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
        }

        setMessages([...messages, newMessage])
        setInputValue("")
    }


    return (
        <div className="flex flex-col h-full bg-[#1A1A1E] relative">
            {/* Header */}
            <div className="h-12 bg-[#1A1A1E] flex items-center justify-between px-4 border-b border-[#1f2023]">
                <div className="flex items-center">
                    <div className="relative mr-2">

                        <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="User Avatar"
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full"
                        />

                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#3ba55c] rounded-full border border-[#1e1f22]"></div>
                    </div>
                    <span className="font-medium text-white text-sm">{friend.name}</span>
                </div>

                {/* Right side - Icons and Search */}
                <div className="flex items-center space-x-4">
                    <button className="text-[#b5bac1] hover:text-white">
                        <Phone size={20} />
                    </button>
                    <button className="text-[#b5bac1] hover:text-white">
                        <Video size={20} />
                    </button>
                    <button className="text-[#b5bac1] hover:text-white">
                        <Bell size={20} />
                    </button>
                    <button className="text-[#b5bac1] hover:text-white">
                        <Users size={20} />
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-40 bg-[#1e1f22] border border-[#3f4147] text-[#dbdee1] rounded-md px-8 py-1 text-sm focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#b5bac1]" size={16} />
                    </div>
                </div>
            </div>


            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
                {/* Start of conversation notice */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#5865f2] mb-4 overflow-hidden flex items-center justify-center">
                        {/* <Image
                            src={friend.avatar || "/placeholder.svg?height=64&width=64"}
                            alt={friend.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                        /> */}

                        <span className="text-2xl">{firstLetter}</span>
                        <span className="text-2xl">{lastLetter}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">{friend.name}</h2>
                    <p className="text-[#b5bac1] text-sm mb-2">{friend.username}</p>
                    {friend.mutualServers && (
                        <div className="flex items-center text-xs text-[#b5bac1]">
                            <div className="flex -space-x-1 mr-2">
                                <div className="w-4 h-4 rounded-full bg-[#5865f2] border border-[#313338]"></div>
                                <div className="w-4 h-4 rounded-full bg-[#3ba55c] border border-[#313338]"></div>
                            </div>
                            <span>{friend.mutualServers} Mutual Servers</span>
                        </div>
                    )}
                </div>

                <div className="text-center text-xs text-[#b5bac1] mb-6">
                    This is the beginning of your direct message history with{" "}
                    <span className="font-semibold text-white">{friend.name}</span>.
                </div>

                <div className="text-center text-xs text-[#b5bac1] mb-6">
                    <span className="px-2 py-1 rounded bg-[#2b2d31]">May 15, 2025</span>
                </div>

                {/* Messages */}
                {messages.map((message, index) => {
                    // Check if this is the first message from this sender or if the previous message is from a different sender
                    const isFirstMessageFromSender = index === 0 || messages[index - 1].sender !== message.sender

                    return (
                        <div
                            key={message.id}
                            className={cn(
                                "flex mb-0.5 group hover:bg-zinc-800/90 transition-all duration-200 rounded py-0.5 px-2 -mx-2",
                                !isFirstMessageFromSender && "mt-0.5",
                            )}
                            onMouseEnter={() => setShowReactions(message.id)}
                            onMouseLeave={() => setShowReactions(null)}
                        >
                            <div
                                className={cn("w-10 h-10 rounded-full flex-shrink-0 mr-4", !isFirstMessageFromSender && "opacity-0")}
                            >
                                {isFirstMessageFromSender && (
                                    <Image
                                        src={message.sender === "friend" ? friend.avatar : "/placeholder.svg?height=40&width=40&text=MA"}
                                        alt={message.sender === "friend" ? friend.name : "You"}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full"
                                    />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                {isFirstMessageFromSender && (
                                    <div className="flex items-center mb-1">
                                        <span className="font-medium text-white">
                                            {message.sender === "friend" ? friend.name : "Mudassir Ali"}
                                        </span>
                                        <span className="text-xs text-[#b5bac1] ml-2">{message.timestamp}</span>
                                    </div>
                                )}
                                <div className="text-[#dcddde] whitespace-pre-line break-words">{message.content}</div>
                                {message.reactions && (
                                    <div className="flex mt-1 space-x-1">
                                        {message.reactions.map((reaction, i) => (
                                            <div
                                                key={i}
                                                className="bg-[#2b2d31] hover:bg-[#36393f] rounded-md px-1 py-0.5 flex items-center text-xs"
                                            >
                                                <span>{reaction.emoji}</span>
                                                <span className="ml-1 text-[#b5bac1]">{reaction.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {showReactions === message.id && (
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 self-start mt-1">
                                    <button className="text-[#b5bac1] hover:text-white p-1 rounded hover:bg-[#36393f]">
                                        <Heart size={16} />
                                    </button>
                                    <button className="text-[#b5bac1] hover:text-white p-1 rounded hover:bg-[#36393f]">
                                        <Smile size={16} />
                                    </button>
                                    <button className="text-[#b5bac1] hover:text-white p-1 rounded hover:bg-[#36393f]">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="px-4 pb-6">
                <form onSubmit={handleSendMessage} className="relative">
                    <div className="flex items-center bg-zinc-800/90 rounded-lg p-1">
                        <button type="button" className="p-2 text-[#b5bac1] hover:text-white">
                            <PlusCircle size={20} />
                        </button>
                        <div className="flex-1">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={`Message @${friend.name}`}
                                className="w-full bg-transparent text-[#dcddde] focus:outline-none px-2 py-2"
                            />
                        </div>
                        <div className="flex items-center space-x-1">
                            <button type="button" className="p-2 text-[#b5bac1] hover:text-white">
                                <Gift size={20} />
                            </button>
                            <button type="button" className="p-2 text-[#b5bac1] hover:text-white">
                                <Sticker size={20} />
                            </button>
                            <button type="button" className="p-2 text-[#b5bac1] hover:text-white">
                                <Smile size={20} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Reaction Tooltip */}
            <div className="hidden absolute top-0 left-0 bg-[#232428] rounded-lg shadow-lg p-1 z-10">
                <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-[#36393f] rounded">❤️</button>
                    <button className="p-1 hover:bg-[#36393f] rounded">✅</button>
                    <button className="p-1 hover:bg-[#36393f] rounded">🚩</button>
                    <button className="p-1 hover:bg-[#36393f] rounded">😄</button>
                    <button className="p-1 hover:bg-[#36393f] rounded">➡️</button>
                </div>
            </div>


            <UserProfileSidebar
                selectedFriend={{
                    id: friend.id,
                    name: friend.name,
                    username: friend.username,
                    avatar: friend.avatar,
                    status: friend.status || "online",
                    pronouns: friend.pronouns || "he/him",
                    memberSince: friend.memberSince,
                    mutualServers: friend.mutualServers,
                }} isOpen={false} onClose={function (): void {
                    throw new Error("Function not implemented.")
                }} />
        </div >
    )
}
