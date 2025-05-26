
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api";

interface FriendRequest {
    id: string;
    senderId: string;
    senderUsername: string;
    senderDisplayName: string;
    senderProfilePicture: string;
    status: "pending";
    createdAt: string;
}

const fetchPendingFriendRequests = async (): Promise<FriendRequest[]> => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error("No token found in cookies");
    }

    const response = await fetch(`${API_BASE_URL}/api/friend-requests/incoming`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const usePendingFriendRequests = () => {
    return useQuery<FriendRequest[], Error>({
        queryKey: ["pendingFriendRequests"],
        queryFn: fetchPendingFriendRequests,
        enabled: !!Cookies.get("access_token"), // Only fetch if token exists
    });
};
