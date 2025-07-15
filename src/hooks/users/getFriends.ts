import { useQuery } from "@tanstack/react-query";
import { fetchFriends } from "@/lib/service/user.service";
import { FriendResponse } from "@/lib/types"



export const useFriends = (options: { enabled: boolean; staleTime: number }) => {
    return useQuery<FriendResponse[], Error>({
        queryKey: ['friends'],
        queryFn: fetchFriends,
        enabled: options.enabled,
        staleTime: options.staleTime,
        retry: 1

        // retry: (failureCount, error) => {
        //     if (error.message.includes('401')) {
        //         return false;
        //     }
        //     return failureCount < 3;
        // }
    });

}