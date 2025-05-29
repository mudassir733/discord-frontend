
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AcceptResponse } from "@/lib/types"
import { acceptFriendRequest } from "@/lib/service/user.service"




export const useAcceptFriendRequest = () => {
    const queryClient = useQueryClient();

    return useMutation<AcceptResponse, Error, string>({
        mutationFn: acceptFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pendingFriendRequests"] });
        },
        onError: (error) => {
            console.error("Failed to accept friend request:", error.message);
        },
    });
};