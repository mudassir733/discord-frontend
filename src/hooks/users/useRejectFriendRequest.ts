
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectFriendRequst } from "@/lib/service/user.service";
import { AcceptResponse } from "@/lib/types";



export const useRejectFriendRequest = () => {
    const queryClient = useQueryClient();

    return useMutation<AcceptResponse, Error, string>({
        mutationFn: rejectFriendRequst,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pendingFriendRequests"] });
        },
        onError: (error) => {
            console.error("Failed to accept friend request:", error.message);
        },
    });
};