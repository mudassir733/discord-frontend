import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sentFriendRequest } from "@/lib/service/user.service";
import { AxiosError } from "axios";
import { FriendRequestResponse, AddFriendVariable, ApiError } from "@/lib/types";




export const useAddFriend = () => {
    const queryClient = useQueryClient();
    return useMutation<FriendRequestResponse, AxiosError<ApiError>, AddFriendVariable>({
        mutationFn: ({ receiverUsername }) => sentFriendRequest(receiverUsername),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pendingFriendRequests"] });
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            console.error('Failed to send friend request:', error);
        },
    })
}