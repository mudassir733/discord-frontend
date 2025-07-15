import React from 'react'
import { Metadata } from 'next'

// components
import { FriendsSidebar } from '@/features/channels/components/friend-sidebar'
import ServerSidebar from '@/features/channels/components/server-sidebar'
import UserProfile from '@/features/channels/components/user-profile'

import SubHeader from '@/components/subHeader'

export const metaData: Metadata = {
    title: "Channels",
    description: "channels for users"
}

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode,
}>) {
    return (
        <div className="flex overflow-y-auto h-screen bg-[#1e1f22] text-white">
            {/* Server Sidebar */}
            <div className='flex relative'>
                <ServerSidebar />

                <div className='absolute z-50 w-full bottom-0 px-2 pb-1'>
                    <UserProfile />
                </div>

                {/* Friends Sidebar */}
                <FriendsSidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex h-full">
                {children}
            </main>
        </div>
    )
}

