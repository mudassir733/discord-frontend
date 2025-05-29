import { useMutation } from "@tanstack/react-query";
import { sentFriendRequest } from "@/lib/service/user.service";
import { AxiosError } from "axios";
import { FriendRequestResponse, AddFriendVariable, ApiError } from "@/lib/types";




export const useAddFriend = () => {
    return useMutation<FriendRequestResponse, AxiosError<ApiError>, AddFriendVariable>({
        mutationFn: ({ receiverUsername }) => sentFriendRequest(receiverUsername),
        onError: (error) => {
            console.error('Failed to send friend request:', error);
        },
    })
}