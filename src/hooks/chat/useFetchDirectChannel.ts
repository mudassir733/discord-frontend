import { useQuery } from "@tanstack/react-query";
import { fetchDirectChannels } from "@/lib/service/chat.service";


export const useFetchDirectChannel = (otherUserUsername: string) => {
    return useQuery({
        queryKey: ["fetch-direct-channel", otherUserUsername],
        queryFn: () => fetchDirectChannels(otherUserUsername),
        enabled: !!otherUserUsername,
        retry: 1
    })

} 