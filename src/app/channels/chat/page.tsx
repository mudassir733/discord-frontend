import FriendsListWithChat from "@/features/channels/components/friends-list-with-chat"
// import FriendsHeader from "@/features/channels/components/friends-header"

export default function ChatDemoPage() {
    return (
        <div className="flex flex-col h-screen bg-[#313338]">
            {/* <FriendsHeader /> */}
            <div className="flex-1 overflow-hidden">
                <FriendsListWithChat />
            </div>
        </div>
    )
}
