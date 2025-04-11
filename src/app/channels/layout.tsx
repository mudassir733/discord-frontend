import React from 'react'
import { Metadata } from 'next'

export const metaData: Metadata = {
    title: "channels",
    description: "channels for users"
}

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <div>{children}</div>
            </body>
        </html>
    )
}

