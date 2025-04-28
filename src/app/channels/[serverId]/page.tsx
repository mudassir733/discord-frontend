"use client"
import { useParams } from "next/navigation";

export default function ServerPage() {
    const { serverId } = useParams();
    return (
        <div className="flex-1 bg-[#313338] p-4 ">
            <h1 className="text-white text-xl font-semibold">Server {serverId}</h1>
            <p className="text-gray-400">Channels for server {serverId} will appear here.</p>
        </div>
    );
}