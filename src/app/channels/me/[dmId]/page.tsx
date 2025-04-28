import { useParams } from "next/navigation";

export default function DMPage() {
    const { dmId } = useParams();
    return (
        <div className="flex-1 bg-[#313338] p-4">
            <h1 className="text-white text-xl font-semibold">Chat with {dmId}</h1>
            <p className="text-gray-400">Messages for DM {dmId} will appear here.</p>
        </div>
    );
}