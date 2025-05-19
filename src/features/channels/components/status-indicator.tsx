import { cn } from "@/lib/utils"

type StatusType = "online" | "idle" | "dnd" | "offline" | "streaming" | "invisible"

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

    const statusClasses = {
        online: "bg-[#3ba55d]", // Discord green
        idle: "bg-[#faa81a]", // Discord yellow/orange
        dnd: "bg-[#ed4245]", // Discord red
        offline: "bg-[#747f8d]", // Discord gray
        streaming: "bg-[#593695]", // Discord purple
        invisible: "bg-[#747f8d]", // Same as offline
    }

    return (
        <div
            className={cn(
                "rounded-full border-[#313338] border-2",
                sizeClasses[size],
                statusClasses[status],
                pulsingAnimation && status === "online" && "animate-pulse",
                className,
            )}
        />
    )
}
