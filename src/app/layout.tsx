"use client"
import React from 'react'
import { Metadata } from 'next'
import { Noto_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "@/components/ui/sonner";
import "../app/[locale]/globals.css";
import { usePathname } from 'next/navigation';


const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
    weight: ["400", "700", "300"],
});
export const metaData: Metadata = {
    title: "channels",
    description: "channels for users"
}
const queryClient = new QueryClient();

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <html lang="en">
            <body className={`${notoSans.variable}  antialiased ${pathname === "/en" ? "overflow-y-auto" : "overflow-y-hidden"}`} >
                <QueryClientProvider client={queryClient}>
                    <Toaster />
                    <Provider store={store}>

                        {children}
                    </Provider>
                </QueryClientProvider>
            </body>
        </html>
    )
}

