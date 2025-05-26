import Cookies from "js-cookie";
import { API_BASE_URL } from "../api";


export const fetchFriends = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error("Token not found!");
    }
    const response = await fetch(`${API_BASE_URL}/api/friends`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("DATA, FRIENDS", data)
    return data;

}

export const sentFriendRequest = async (receiverUsername: string) => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error('No token found in cookies');
    }
    const response = await fetch(`${API_BASE_URL}/api/friend-requests`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverUsername }),
    });
    console.log(response)
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();

}