"use client"
import { X, ChevronRight, Users, Globe } from "lucide-react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ServerType } from "../modals/create-server-modals"

interface ServerDetailsModalProps {
    onBack: () => void
    onClose: () => void
    onSelect: (type: ServerType) => void
}

export default function ServerDetailsModal({ onBack, onClose, onSelect }: ServerDetailsModalProps) {
    return (
        <DialogContent className="bg-[#242429] border-none text-white p-0 max-w-md w-[430px] overflow-hidden animate-in fade-in slide-in-from-right-1/4 duration-300 ease-in-out">
            <div className="max-h-[580px] overflow-y-auto scrollbar-thin">
                <DialogHeader className="p-4 pb-0 text-center relative">
                    <DialogTitle className="text-2xl font-bold text-center pt-4">Tell Us More About Your Server</DialogTitle>
                    <p className="text-[#b5bac1] text-center mt-2 mb-4 text-sm">
                        In order to help you with your setup, is your new server for just a few friends or a larger community?
                    </p>
                </DialogHeader>

                <div className="px-4 pb-4">

                    <button className="w-full bg-[#29292d] border-[1px] border-zinc-700/90 cursor-pointer hover:bg-[#333338] transition-colors rounded-md p-3 flex items-center justify-between mb-4" onClick={() => onSelect("friends")}>
                        <div className="flex items-center">
                            <div className="w-9 h-9 rounded-full bg-[#5865f2] flex items-center justify-center mr-3">
                                <Users size={20} className="text-white" />
                            </div>
                            <span className="font-medium">For me and my friends</span>
                        </div>
                        <ChevronRight size={20} className="text-[#b5bac1]" />
                    </button>


                    <button className="w-full bg-[#29292d] border-[1px] border-zinc-700/90 cursor-pointer hover:bg-[#333338] transition-colors rounded-md p-3 flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="w-9 h-9 rounded-full bg-[#5865f2] flex items-center justify-center mr-3">
                                <Globe size={20} className="text-white" />
                            </div>
                            <span className="font-medium">For a club or community</span>
                        </div>
                        <ChevronRight size={20} className="text-[#b5bac1]" />
                    </button>


                    <div className="text-center mb-6">
                        <p className="text-[#b5bac1] text-sm">
                            Not sure? You can <button className="text-[#00a8fc] hover:underline">skip this question</button> for now.
                        </p>
                    </div>


                    <div className="flex justify-start">
                        <Button
                            onClick={onBack}
                            className="bg-transparent hover:bg-[#2b2d31] text-white border-none"
                            variant="blueBtn"
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}
