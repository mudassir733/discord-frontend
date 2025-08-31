"use client"

import { useState, useRef, useEffect } from "react"
import { Check, MoreHorizontal, Bell, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSelector } from "react-redux"

// store
import { RootState } from "@/store/store"



// hooks
import { useFetchNotifications } from "@/hooks/users/useNotificationFetch"
import { useUpdateReadStatus } from "@/hooks/users/updateReadStatus"

type TabType = "for-you" | "unreads" | "mentions"

interface Notification {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    read: boolean;
}

interface InboxModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function InboxModal({ isOpen, onClose }: InboxModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>("for-you")
    const modalRef = useRef<HTMLDivElement>(null)
    const { data, refetch } = useFetchNotifications()
    const { mutate: markAsRead } = useUpdateReadStatus();

    const notifications: Notification[] = data?.notifications ?? [];


    const handleUpdateMarkAsRead = (notificationsId: string) => {
        markAsRead(notificationsId, {
            onSuccess: () => {
                refetch()
            },
            onError(error) {
                console.log(error)
            }
        })
    }

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
            <div
                ref={modalRef}
                className="mt-12 mr-4 w-[450px] bg-[#232428] rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f2023]">
                    <div className="flex items-center">
                        <Bell className="mr-2 text-white" size={20} />
                        <h2 className="text-lg font-semibold text-white">Inbox</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            className="w-8 h-8 rounded-full bg-[#2b2d31] flex items-center justify-center text-[#b5bac1] hover:text-white"
                            title="Mark all as read"
                        >
                            <Check size={18} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#2b2d31] flex items-center justify-center text-[#b5bac1]">
                            <span className="text-sm font-medium">0</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#1f2023]">
                    <button
                        className={cn(
                            "px-4 py-3 text-sm font-medium flex-1 text-center",
                            activeTab === "for-you"
                                ? "text-[#5865f2] border-b-2 border-[#5865f2]"
                                : "text-[#b5bac1] hover:text-white",
                        )}
                        onClick={() => setActiveTab("for-you")}
                    >
                        For You
                    </button>
                    <button
                        className={cn(
                            "px-4 py-3 text-sm font-medium flex-1 text-center",
                            activeTab === "unreads"
                                ? "text-[#5865f2] border-b-2 border-[#5865f2]"
                                : "text-[#b5bac1] hover:text-white",
                        )}
                        onClick={() => setActiveTab("unreads")}
                    >
                        Unreads
                    </button>
                    <button
                        className={cn(
                            "px-4 py-3 text-sm font-medium flex-1 text-center",
                            activeTab === "mentions"
                                ? "text-[#5865f2] border-b-2 border-[#5865f2]"
                                : "text-[#b5bac1] hover:text-white",
                        )}
                        onClick={() => setActiveTab("mentions")}
                    >
                        Mentions
                    </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-[180px] overflow-y-auto">
                    {activeTab === "for-you" && (
                        <div>
                            {notifications.map((notification: Notification) => (
                                <div key={notification.id} className={cn("flex items-center px-4 py-3 hover:bg-[#2b2d31] cursor-pointer ",
                                    notification.read === false ? "border-b-2 bg-[#2b2d31] border-[#5865f2]" : "border-b-0 border-none bg-[#232428]"

                                )} onClick={() => {
                                    if (!notification.read) {
                                        handleUpdateMarkAsRead(notification.id);
                                    }
                                }}>
                                    <div className="relative mr-3">
                                        {/* <Image
                                            src={notification.avatar || "/placeholder.svg"}
                                            alt={notification.username}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full"
                                        /> */}
                                        <div className="relative bg-[#6866D4] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                            <h4 className="font-bold text-white">{notification.message.charAt(0)}</h4>

                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-[#232428] rounded-full p-0.5">
                                            <div
                                                className={cn(
                                                    "rounded-full w-5 h-5 flex items-center justify-center",
                                                    notification.type === "friend_request_accepted" && "bg-[#038138]",
                                                    notification.type === "friend_request_sent" && "bg-[#5865f2]",
                                                    notification.type === "friend_request_rejected" && "bg-red-600"
                                                )}
                                            >
                                                {notification.type === "friend_request_accepted" && (
                                                    <Check size={12} className="text-white" />
                                                )}
                                                {notification.type === "friend_request_sent" && (
                                                    <Send size={12} className="text-white" />
                                                )}
                                                {notification.type === "friend_request_rejected" && (
                                                    <X size={12} className="text-white" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={cn(
                                            "text-sm text-white",
                                            notification.read === false ? "text-white" : "text-[#b5bac1]"

                                        )}>
                                            <span className="font-medium">{notification.message}</span>
                                        </div>
                                        <div className="text-xs text-[#b5bac1]">{new Date(notification.createdAt).toLocaleTimeString()}</div>
                                    </div>
                                    <button
                                        type="button"
                                        title="More Options"
                                        className="w-8 h-8 rounded-full hover:bg-[#36393f] flex items-center justify-center text-[#b5bac1] hover:text-white">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "unreads" && (
                        <div className="flex items-center justify-center h-40 text-[#b5bac1]">
                            <div className="text-center">
                                <p className="text-sm">No unread messages</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "mentions" && (
                        <div className="flex items-center justify-center h-40 text-[#b5bac1]">
                            <div className="text-center">
                                <p className="text-sm">No mentions</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
