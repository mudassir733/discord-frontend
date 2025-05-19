"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const userSettings = [
    { name: "My Account", href: "/settings/my-account" },
    { name: "Profiles", href: "/settings/profiles" },
    { name: "Content & Social", href: "/settings/content-social" },
    { name: "Data & Privacy", href: "/settings/privacy" },
    { name: "Family Center", href: "/settings/family-center" },
    { name: "Authorized Apps", href: "/settings/authorized-apps" },
    { name: "Devices", href: "/settings/devices" },
    { name: "Connections", href: "/settings/connections" },
    { name: "Clips", href: "/settings/clips" },
]

const billingSettings = [
    { name: "Nitro", href: "/settings/nitro", badge: true },
    { name: "Server Boost", href: "/settings/server-boost" },
    { name: "Subscriptions", href: "/settings/subscriptions" },
    { name: "Gift Inventory", href: "/settings/gift-inventory" },
    { name: "Billing", href: "/settings/billing" },
]

export default function SettingsSidebar() {
    const [searchQuery, setSearchQuery] = useState("")
    const pathname = usePathname()

    return (
        <div className="w-70 h-screen bg-[#121214] border-r border-[#1f2023] flex flex-col">
            {/* Search Bar */}
            <div className="p-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#1e1f22] text-[#dbdee1] rounded-md px-8 py-1.5 text-sm focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#b5bac1]" size={16} />
                </div>
            </div>

            {/* User Settings */}
            <div className="flex-1 overflow-y-auto px-2 py-2">
                <div className="mb-2 px-2">
                    <h2 className="text-xs font-semibold text-white mb-1">USER SETTINGS</h2>
                    <div className="space-y-0.5">
                        {userSettings.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={cn(
                                        "px-2 py-1.5 rounded text-sm font-medium",
                                        pathname.startsWith(item.href)
                                            ? "bg-zinc-800/90 text-white"
                                            : "text-[#b5bac1] transition-all duration-200 hover:bg-zinc-800/90 hover:text-[#dbdee1]",
                                    )}
                                >
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Billing Settings */}
                <div className="mb-2 px-2">
                    <h2 className="text-xs font-semibold text-white mb-1">BILLING SETTINGS</h2>
                    <div className="space-y-0.5">
                        {billingSettings.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={cn(
                                        "px-2 py-1.5 rounded text-sm font-medium flex items-center justify-between",
                                        pathname === item.href
                                            ? "bg-[#404249] text-white"
                                            : "text-[#b5bac1] hover:bg-[#35373c] hover:text-[#dbdee1]",
                                    )}
                                >
                                    <span>{item.name}</span>
                                    {item.badge && (
                                        <div className="w-4 h-4 rounded-full bg-[#5865f2] flex items-center justify-center">
                                            <span className="text-[10px] text-white">$</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
