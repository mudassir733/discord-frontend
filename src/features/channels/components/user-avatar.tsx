import Image from "next/image"
import { cn } from "@/lib/utils"
import StatusIndicator from "./status-indicator"

type StatusType = "online" | "idle" | "dnd" | "offline" | "streaming" | "invisible"

interface UserAvatarProps {
    src: string
    alt: string
    status?: StatusType
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
    statusClassName?: string
}

export default function UserAvatar({ src, alt, status, size = "md", className, statusClassName }: UserAvatarProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    }

    const statusSizes = {
        sm: "sm",
        md: "sm",
        lg: "md",
        xl: "lg",
    } as const

    return (
        <div className="relative inline-block">
            <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={size === "xl" ? 64 : size === "lg" ? 48 : size === "md" ? 40 : 32}
                height={size === "xl" ? 64 : size === "lg" ? 48 : size === "md" ? 40 : 32}
                className={cn("rounded-full object-cover", sizeClasses[size], className)}
            />
            {status && (
                <div className="absolute bottom-0 right-0">
                    <StatusIndicator status={status} size={statusSizes[size]} className={statusClassName} />
                </div>
            )}
        </div>
    )
}
