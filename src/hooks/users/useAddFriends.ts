import { useMutation } from "@tanstack/react-query";
import { sentFriendRequest } from "@/lib/service/user.service";
import { AxiosError } from "axios";

interface FriendRequestResponse {
    id: string;
    senderId: string;
    receiverId: string;
    status: 'pending';
    createdAt: string;
}

interface AddFriendVariable {
    receiverUsername: string;
}
interface ApiError {
    error: string
}

export const useAddFriend = () => {
    return useMutation<FriendRequestResponse, AxiosError<ApiError>, AddFriendVariable>({
        mutationFn: ({ receiverUsername }) => sentFriendRequest(receiverUsername),
        onError: (error) => {
            console.error('Failed to send friend request:', error);
        },
    })
}