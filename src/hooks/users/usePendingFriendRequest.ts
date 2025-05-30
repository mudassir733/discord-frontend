
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { fetchPendingFriendRequests } from "@/lib/service/user.service";
import { FriendRequest } from "@/lib/types";



export const usePendingFriendRequests = (options: { enabled: boolean; staleTime?: number }) => {
    return useQuery<FriendRequest[], Error>({
        queryKey: ["pendingFriendRequests"],
        queryFn: fetchPendingFriendRequests,
        staleTime: 5 * 60 * 1000,
        retry: 1,
        enabled: !!Cookies.get("access_token") || options.enabled, // Only fetch if token exists
    });
};
