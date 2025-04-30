import { cn } from "@/lib/utils"
import { Moon } from 'lucide-react';

export type StatusType = "Online" | "Idle" | "dnd" | "offline" | "streaming" | "invisible" | "Pending"

interface StatusIndicatorProps {
    status: StatusType
    size?: "sm" | "md" | "lg"
    className?: string
    pulsingAnimation?: boolean
}

export default function StatusIndicator({
    status,
    size = "md",
    className,
    pulsingAnimation = false,
}: StatusIndicatorProps) {
    const sizeClasses = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
    }


    const iconSizeClasses = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4",
    };

    const statusClasses = {
        Online: "bg-[#3ba55d]", // Discord green
        Idle: "bg-[#faa81a]", // Discord yellow/orange
        dnd: "bg-[#ed4245]", // Discord red
        offline: "bg-[#747f8d]", // Discord gray
        streaming: "bg-[#593695]", // Discord purple
        invisible: "bg-[#747f8d]", // Same as offline
        Pending: "bg-[#747f8d]",
    }


    if (status === "Idle") {
        return (
            <div
                className={cn(
                    "rounded-full bg-[#313338] border-[#313338] border-2 flex items-center justify-center",
                    sizeClasses[size],
                    className,
                )}
            >
                <Moon
                    className={cn(iconSizeClasses[size], "text-[#faa81a]")} // Discord yellow/orange
                    fill="#faa81a"
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "rounded-full border-[#313338] border-2",
                sizeClasses[size],
                statusClasses[status],
                pulsingAnimation && status === "Online" && "animate-pulse",
                className,
            )}
        />
    )
}
