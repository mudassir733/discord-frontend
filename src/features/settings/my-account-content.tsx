"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MyAccountContent() {
    const [activeTab, setActiveTab] = useState("security")

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">My Account</h1>
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1e1f22] flex items-center justify-center">
                        <X size={18} className="text-[#b5bac1]" />
                    </div>
                    <span className="text-xs text-[#b5bac1] ml-2">ESC</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#3f4147] mb-6">
                <div className="flex space-x-6">
                    <button
                        className={cn(
                            "pb-2 text-sm font-medium",
                            activeTab === "security" ? "text-white border-b-2 border-[#5865f2]" : "text-[#b5bac1] hover:text-white",
                        )}
                        onClick={() => setActiveTab("security")}
                    >
                        Security
                    </button>
                    <button
                        className={cn(
                            "pb-2 text-sm font-medium",
                            activeTab === "standing" ? "text-white border-b-2 border-[#5865f2]" : "text-[#b5bac1] hover:text-white",
                        )}
                        onClick={() => setActiveTab("standing")}
                    >
                        Standing
                    </button>
                </div>
            </div>

            {/* Profile Banner */}
            <div className="bg-[#5865f2] h-32 rounded-t-lg mb-16 relative">
                {/* Profile Picture */}
                <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                    <div className="relative">
                        <Image
                            src="/placeholder.svg?height=80&width=80&text=MA"
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-[#313338]"
                        />
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#3ba55c] rounded-full border-4 border-[#313338]"></div>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <div className="absolute right-4 bottom-0 transform translate-y-1/2">
                    <Link href="/settings/my-account/edit-profile">
                        <button className="bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium px-4 py-1.5 rounded">
                            Edit User Profile
                        </button>
                    </Link>
                </div>

                {/* Username */}
                <div className="absolute left-28 bottom-0 transform translate-y-1/2">
                    <h2 className="text-xl font-semibold flex items-center">
                        Mudassir Ali <span className="text-[#b5bac1] ml-2">•••</span>
                    </h2>
                    <div className="flex items-center mt-1">
                        <div className="w-5 h-5 rounded-full bg-[#5865f2] flex items-center justify-center mr-1">
                            <span className="text-[10px] text-white">D</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Details */}
            <div className="bg-[#232428] rounded-lg p-4 mt-8">
                {/* Display Name */}
                <div className="flex items-center justify-between py-3 border-b border-[#3f4147]">
                    <div>
                        <h3 className="text-sm font-medium">Display Name</h3>
                        <p className="text-sm text-[#b5bac1]">Mudassir Ali</p>
                    </div>
                    <button className="bg-[#4f545c] hover:bg-[#5d6269] text-white text-xs font-medium px-3 py-1 rounded">
                        Edit
                    </button>
                </div>

                {/* Username */}
                <div className="flex items-center justify-between py-3 border-b border-[#3f4147]">
                    <div>
                        <h3 className="text-sm font-medium">Username</h3>
                        <p className="text-sm text-[#b5bac1]">mudassir_dev</p>
                    </div>
                    <button className="bg-[#4f545c] hover:bg-[#5d6269] text-white text-xs font-medium px-3 py-1 rounded">
                        Edit
                    </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between py-3 border-b border-[#3f4147]">
                    <div>
                        <h3 className="text-sm font-medium">Email</h3>
                        <div className="flex items-center">
                            <p className="text-sm text-[#b5bac1]">**********@gmail.com</p>
                            <button className="text-[#00a8fc] text-xs ml-2 hover:underline">Reveal</button>
                        </div>
                    </div>
                    <button className="bg-[#4f545c] hover:bg-[#5d6269] text-white text-xs font-medium px-3 py-1 rounded">
                        Edit
                    </button>
                </div>

                {/* Phone Number */}
                <div className="flex items-center justify-between py-3">
                    <div>
                        <h3 className="text-sm font-medium">Phone Number</h3>
                        <div className="flex items-center">
                            <p className="text-sm text-[#b5bac1]">**********3487</p>
                            <button className="text-[#00a8fc] text-xs ml-2 hover:underline">Reveal</button>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button className="text-[#f23f43] text-xs font-medium hover:underline">Remove</button>
                        <button className="bg-[#4f545c] hover:bg-[#5d6269] text-white text-xs font-medium px-3 py-1 rounded">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
