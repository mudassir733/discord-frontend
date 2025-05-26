
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "@/lib/api";

interface JwtPayload {
    id: string;
    [key: string]: any;
}

interface AcceptResponse {
    message: string;
}

const acceptFriendRequest = async (requestId: string): Promise<AcceptResponse> => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error("No token found in cookies");
    }

    const decodedToken = jwtDecode<JwtPayload>(token);
    const userId = decodedToken.id;

    const response = await fetch(`${API_BASE_URL}/api/friend-requests/${requestId}/accept`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

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