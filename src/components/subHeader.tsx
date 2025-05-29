"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
// hooks
import { useFetchNotifications } from "@/hooks/users/useNotificationFetch"

// assets
import friendicon from "@/assets/images/friend.svg"
import inboxIcon from "@/assets/images/inbox.svg"
import InboxModal from './modals/inbox-modal'


function SubHeader() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isInboxOpen, setIsInboxOpen] = useState(false)
    const reduxNotifications = useSelector((state: RootState) => state.notifications.list);

    const { data } = useFetchNotifications()
    const notifications = reduxNotifications.length > 0 ? reduxNotifications : data?.notifications ?? [];
    const hasUnread = notifications.some((notification: any) => !notification.read)
    return (
        <div className='bg-[#121214] flex items-center justify-between h-8'>
            <div></div>
            <div className='flex items-center gap-1 self-center'>
                <Image src={friendicon} alt='friend icon' width={20} height={20} />
                <p className='text-white text-[11px]'>Friends</p>
            </div>

            <div className='relative pr-6 cursor-pointer' onClick={() => setIsInboxOpen(!isInboxOpen)}>
                <Image src={inboxIcon} alt='inbox icon' width={20} height={20} />

                {hasUnread && (
                    <span className="absolute top-0 right-5 w-2 h-2 bg-red-500 rounded-full" />
                )}
            </div>

            {/* Inbox Modal */}
            <InboxModal isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
        </div>
    )
}

export default SubHeader