import { API_BASE_URL } from "../api";
import Cookies from "js-cookie";


export const createDirectChannel = async (otherUserUsername: string) => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error("Token not found");
    }

    const response = await fetch(`${API_BASE_URL}/api/chat/direct`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            otherUserUsername: otherUserUsername,
        }),
    })

    if (!response.ok) {
        throw new Error(`Http response error status: ${response.status}`)
    }

    const data = await response.json();
    return data;
}


export const fetchDirectChannels = async (otherUserUsername: string) => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error("Token not found");
    }
    const response = await fetch(`${API_BASE_URL}/api/chat/direct/${otherUserUsername}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        }
    })

    if (!response.ok) {
        throw new Error(`Http response error status ${response.status}`)
    }

    const data = response.json()
    return data;


}