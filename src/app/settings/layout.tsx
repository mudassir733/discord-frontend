import type { ReactNode } from "react"
import SettingsSidebar from "@/features/settings/setting-sidebar"

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-[#202024] text-white">
            <SettingsSidebar />
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto py-6">{children}</div>
            </div>
        </div>
    )
}