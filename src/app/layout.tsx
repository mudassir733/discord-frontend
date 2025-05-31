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
import SubHeader from '@/components/subHeader';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


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
            <body className={`${notoSans.variable}  antialiased ${pathname === "/en" ? "overflow-y-auto" : "overflow-y-auto custom-scrollbar"}`} >
                <QueryClientProvider client={queryClient}>
                    <Toaster />
                    <Provider store={store}>
                        {pathname.startsWith("/en") || pathname.startsWith("/en/login") || pathname.startsWith("/en/register") ? null : <SubHeader />}
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </Provider>
                </QueryClientProvider>
            </body>
        </html>
    )
}

