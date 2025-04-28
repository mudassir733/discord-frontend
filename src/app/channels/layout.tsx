import React from 'react'
import { Metadata } from 'next'

// components
import { FriendsSidebar } from '@/features/channels/components/friend-sidebar'
import ServerSidebar from '@/features/channels/components/server-sidebar'

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
        <div className="flex min-h-screen bg-[#1e1f22] text-white">
            {/* Server Sidebar */}
            <ServerSidebar />

            {/* Friends Sidebar */}
            <FriendsSidebar />

            {/* Main Content */}
            <main className="flex-1 flex h-full">
                {children}
            </main>
        </div>
    )
}

