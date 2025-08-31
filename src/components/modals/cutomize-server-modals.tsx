"use client"
import { useState } from "react"
import type React from "react"

import { Camera, Plus } from "lucide-react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface CustomizeServerModalProps {
    onBack: () => void
    onClose: () => void
    onCreateServer: (serverName: string) => void
}

export default function CustomizeServerModal({ onBack, onCreateServer }: CustomizeServerModalProps) {
    const [serverName, setServerName] = useState("Mudassir Ali's server")
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (file && file.type.startsWith("image/")) {
            setPreviewUrl(null);
        } else {
            setPreviewUrl(null);
            alert("Please select a valid image file.");
        }
    };
    const handleUploadClick = () => {
        document.getElementById('fileInput')?.click();

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (serverName.trim()) {
            onCreateServer(serverName)
        }
    }



    return (
        <DialogContent className="bg-[#242429] border-none text-white p-0 max-w-md w-[440px] overflow-hidden animate-in fade-in slide-in-from-right-1/4 duration-300 ease-in-out">
            <div className="max-h-[580px] overflow-y-auto scrollbar-thin">
                <DialogHeader className="p-4 pb-0 text-center relative">
                    <DialogTitle className="text-2xl font-bold text-center pt-4">Customize Your Server</DialogTitle>
                    <p className="text-[#b5bac1] text-center mt-2 mb-4 text-sm">
                        Give your new server a personality with a name and an icon. You can always change it later.
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="px-4 pb-4">
                    {/* Server Icon Upload */}
                    <div className="flex justify-center mb-6">
                        <div className="relative cursor-pointer" onClick={handleUploadClick}>
                            <div className="w-[90px] h-[90px] rounded-full border-2 border-dashed border-[#4f545c] flex gap-1 items-center justify-center bg-[#232428]">
                                {previewUrl ? (
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <>
                                        <Camera size={24} className="text-[#b5bac1]" />
                                        <div className="text-[10px] text-[#b5bac1] uppercase mt-1">Upload</div>
                                    </>
                                )}
                            </div>
                            <button
                                type="button"
                                title="Upload Server Icon"
                                className="absolute cursor-pointer bottom-0 right-0 w-6 h-6 bg-[#5865f2] rounded-full flex items-center justify-center"
                            >
                                <Plus size={16} className="text-white" />
                            </button>
                            <input
                                title="Upload Server Icon"
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>


                    <div className="mb-6">
                        <label htmlFor="server-name" className="block text-xs font-bold text-[#b5bac1] mb-2">
                            SERVER NAME
                        </label>
                        <Input
                            id="server-name"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            className="bg-[#29292d] border-[1px] border-zinc-700/90 text-white h-10 px-3 rounded-md focus-visible:ring-0 focus:border-zinc-500 transition-all duration-200 focus-visible:ring-offset-0"
                            required
                        />
                        <p className="text-xs text-[#b5bac1] mt-2">
                            By creating a server, you agree to Discord
                            <a href="#" className="text-[#00a8fc] hover:underline">
                                Community Guidelines
                            </a>
                            .
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between">
                        <Button
                            type="button"
                            onClick={onBack}
                            className="bg-transparent hover:bg-[#2b2d31] text-white border-none"

                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium"
                            disabled={!serverName.trim()}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </DialogContent>
    )
}
