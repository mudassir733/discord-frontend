"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, Camera, ArrowLeft } from "lucide-react"

export default function EditProfileContent() {
    const router = useRouter()
    const [displayName, setDisplayName] = useState("Mudassir Ali")
    const [about, setAbout] = useState("")
    const [pronouns, setPronouns] = useState("")

    const handleSave = () => {
        // Here you would typically save the changes to your backend
        console.log("Saving profile changes:", { displayName, about, pronouns })
        router.push("/settings/my-account")
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button onClick={() => router.back()} className="mr-4 text-[#b5bac1] hover:text-white">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Edit User Profile</h1>
                </div>
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1e1f22] flex items-center justify-center">
                        <X size={18} className="text-[#b5bac1]" />
                    </div>
                    <span className="text-xs text-[#b5bac1] ml-2">ESC</span>
                </div>
            </div>

            <div className="bg-[#232428] rounded-lg overflow-hidden">
                {/* Banner */}
                <div className="bg-[#5865f2] h-32 relative">
                    <button className="absolute right-4 bottom-4 bg-[#1e1f22] hover:bg-[#2b2d31] text-white rounded-full p-2">
                        <Camera size={20} />
                    </button>
                </div>

                {/* Profile Picture */}
                <div className="px-4 pb-4 relative">
                    <div className="relative -mt-10 mb-6 ml-4">
                        <Image
                            src="/placeholder.svg?height=80&width=80&text=MA"
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-[#232428]"
                        />
                        <button className="absolute bottom-0 right-0 bg-[#1e1f22] hover:bg-[#2b2d31] text-white rounded-full p-1.5">
                            <Camera size={16} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Display Name */}
                        <div>
                            <label htmlFor="display-name" className="block text-xs font-bold text-[#b5bac1] uppercase mb-2">
                                Display Name
                            </label>
                            <input
                                id="display-name"
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full bg-[#1e1f22] text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5865f2]"
                                placeholder="Display Name"
                            />
                        </div>

                        {/* About Me */}
                        <div>
                            <label htmlFor="about-me" className="block text-xs font-bold text-[#b5bac1] uppercase mb-2">
                                About Me
                            </label>
                            <textarea
                                id="about-me"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="w-full bg-[#1e1f22] text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5865f2] min-h-[120px] resize-none"
                                placeholder="Tell us about yourself"
                            />
                        </div>

                        {/* Pronouns */}
                        <div>
                            <label htmlFor="pronouns" className="block text-xs font-bold text-[#b5bac1] uppercase mb-2">
                                Pronouns
                            </label>
                            <input
                                id="pronouns"
                                type="text"
                                value={pronouns}
                                onChange={(e) => setPronouns(e.target.value)}
                                className="w-full bg-[#1e1f22] text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5865f2]"
                                placeholder="Add your pronouns"
                            />
                            <p className="text-xs text-[#b5bac1] mt-1">This will be shown next to your name</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4 space-x-3">
                <button
                    onClick={() => router.back()}
                    className="bg-transparent hover:bg-[#2b2d31] text-white text-sm font-medium px-4 py-2 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium px-4 py-2 rounded"
                >
                    Save Changes
                </button>
            </div>
        </div>
    )
}
