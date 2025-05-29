import { useQuery } from "@tanstack/react-query";
import { fetchSendFriendRequests } from "@/lib/service/user.service";
import { FetchFriendRequest } from "@/lib/types";



export const useFetchFriendRequests = () => {
    return useQuery<FetchFriendRequest[], Error>({
        queryKey: ['requests'],
        queryFn: fetchSendFriendRequests,
        staleTime: 5 * 60 * 1000,
        retry: 1
        // retry: (failureCount, error) => {
        //     if (error.message.includes('401')) {
        //         return false;
        //     }
        //     return failureCount < 3;
        // }
    });

}