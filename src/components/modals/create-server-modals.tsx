"use client"
import { X, ChevronRight, Plus, GamepadIcon, Heart, School } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ServerDetailsModal from "../modals/server-details-modals"
import { useState } from "react"
import CustomizeServerModal from "./cutomize-server-modals"

interface CreateServerModalProps {
    isOpen: boolean
    onClose: () => void
}
export type ServerCreationStep = "initial" | "details" | "customize"
export type ServerType = "friends" | "community" | null

export default function CreateServerModal({ isOpen, onClose }: CreateServerModalProps) {
    const [currentStep, setCurrentStep] = useState<ServerCreationStep>("initial")
    const [serverType, setServerType] = useState<ServerType>(null)
    const handleCreateMyOwn = () => {
        setCurrentStep("details")
    }

    const handleServerTypeSelect = (type: ServerType) => {
        setServerType(type)
        setCurrentStep("customize")
    }
    const handleBack = () => {
        if (currentStep === "details") {
            setCurrentStep("initial")
        } else if (currentStep === "customize") {
            setCurrentStep("details")
        }
    }

    const handleClose = () => {
        setTimeout(() => {
            setCurrentStep("initial")
            setServerType(null)
        }, 200)
        onClose()
    }

    const handleCreateServer = (serverName: string) => {

        console.log(`Creating server: ${serverName}, Type: ${serverType}`)
        handleClose()

    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            {currentStep === "initial" && (
                <DialogContent className="bg-[#242429] border-none text-white p-0 w-[430px] overflow-hidden">
                    <div className="h-fit">
                        <DialogHeader className="p-4 py-4 text-center relative">

                            <DialogTitle className="text-2xl font-bold text-center">Create Your Server</DialogTitle>
                            <p className="text-white text-center mt-2 mb-4 text-sm">
                                Your server is where you and your friends hang out. Make yours and start talking.
                            </p>
                        </DialogHeader>

                        <div className="px-4 pb-4 overflow-y-auto max-h-[580px] custom-scrollbar">
                            <button className="w-full bg-[#29292d] border-[1px] border-zinc-700/90 cursor-pointer hover:bg-[#333338] transition-colors rounded-md p-3 flex items-center justify-between mb-4" onClick={handleCreateMyOwn} >
                                <div className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-[#5865f2] flex items-center justify-center mr-3">
                                        <Plus size={20} className="text-white" />
                                    </div>
                                    <span className="font-medium">Create My Own</span>
                                </div>
                                <ChevronRight size={20} className="text-[#b5bac1]" />
                            </button>


                            <div className="mb-2 text-xs font-bold text-[#b5bac1]">START FROM A TEMPLATE</div>


                            <button className="w-full bg-[#29292d] border-zinc-700/90 border-[1px] cursor-pointer hover:bg-[#333338] transition-colors rounded-md p-3 flex items-center justify-between mb-2" onClick={handleCreateMyOwn}>
                                <div className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-[#5865f2] flex items-center justify-center mr-3">
                                        <GamepadIcon size={20} className="text-white" />
                                    </div>
                                    <span className="font-medium">Gaming</span>
                                </div>
                                <ChevronRight size={20} className="text-[#b5bac1]" />
                            </button>


                            <button className="w-full bg-[#29292d] border-zinc-700/90 border-[1px]  cursor-pointer hover:bg-[#333338] transition-colors rounded-md p-3 flex items-center justify-between mb-2" onClick={handleCreateMyOwn}>
                                <div className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-[#eb73b9] flex items-center justify-center mr-3">
                                        <Heart size={20} className="text-white" />
                                    </div>
                                    <span className="font-medium">Friends</span>
                                </div>
                                <ChevronRight size={20} className="text-[#b5bac1]" />
                            </button>


                            <button className="w-full bg-[#29292d] border-zinc-700/90 border-[1px]  cursor-pointer hover:bg-[#333338] transition-colors rounded-md p-3 flex items-center justify-between mb-2" onClick={handleCreateMyOwn}>
                                <div className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-[#f04747] flex items-center justify-center mr-3">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2ZM12 8C11.4696 8 10.9609 8.21071 10.5858 8.58579C10.2107 8.96086 10 9.46957 10 10V10.5H8V10C8 8.93913 8.42143 7.92172 9.17157 7.17157C9.92172 6.42143 10.9391 6 12 6C13.0609 6 14.0783 6.42143 14.8284 7.17157C15.5786 7.92172 16 8.93913 16 10C16 11.1 15.6 11.9 14.7 12.4L14.3 12.7C13.8 13.1 13.5 13.5 13.5 14H11.5C11.5 13 11.9 12.2 12.8 11.7L13.2 11.4C13.6 11.1 13.8 10.7 13.8 10.2C13.8 9.86957 13.6683 9.55089 13.4332 9.31579C13.1981 9.08069 12.8794 8.95 12.55 8.95C12.2206 8.95 11.9019 9.08069 11.6668 9.31579C11.4317 9.55089 11.3 9.86957 11.3 10.2V10.5H10V10C10 9.46957 10.2107 8.96086 10.5858 8.58579C10.9609 8.21071 11.4696 8 12 8ZM11.5 15H13.5V17H11.5V15Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-medium">Study Group</span>
                                </div>
                                <ChevronRight size={20} className="text-[#b5bac1]" />
                            </button>


                            <button className="w-full bg-[#29292d] border-zinc-700/90 border-[1px]  cursor-pointer hover:bg-[#333338] transition-colors rounded-md p-3 flex items-center justify-between mb-6" onClick={handleCreateMyOwn}>
                                <div className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-[#3ba55c] flex items-center justify-center mr-3">
                                        <School size={20} className="text-white" />
                                    </div>
                                    <span className="font-medium">School Club</span>
                                </div>
                                <ChevronRight size={20} className="text-[#b5bac1]" />
                            </button>
                            <div className="text-center">
                                <p className="text-white mb-2">Have an invite already?</p>
                                <Button
                                    className="w-full bg-[#5865f2] cursor-pointer hover:bg-[#4752c4] text-white font-medium py-2.5 h-auto"
                                    variant="default"

                                >
                                    Join a Server
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            )}
            {currentStep === "details" && (
                <ServerDetailsModal onBack={handleBack} onClose={handleClose} onSelect={handleServerTypeSelect} />
            )}

            {currentStep === "customize" && (
                <CustomizeServerModal onBack={handleBack} onClose={handleClose} onCreateServer={handleCreateServer} />
            )}
        </Dialog>
    )
}
