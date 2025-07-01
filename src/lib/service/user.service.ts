import Cookies from "js-cookie";
import { API_BASE_URL } from "../api";
import { jwtDecode } from "jwt-decode";
import { AcceptResponse, FriendRequest, JwtPayload, UpdateReadStatusResponse, UserResponse } from "../types";



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


export const acceptFriendRequest = async (requestId: string): Promise<AcceptResponse> => {
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


export const rejectFriendRequst = async (requestId: string): Promise<AcceptResponse> => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error("No token found in cookies");
    }

    const decodedToken = jwtDecode<JwtPayload>(token);
    const userId = decodedToken.id;

    const response = await fetch(`${API_BASE_URL}/api/friend-request/${requestId}/reject`, {
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


export const fetchSendFriendRequests = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error('Token not found!');
    }
    const response = await fetch(`${API_BASE_URL}/api/friend-requests/sent`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;

}

export const fetchPendingFriendRequests = async (): Promise<FriendRequest[]> => {
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

    const data = await response.json();
    return data;
};


export const fetchUserById = async (userId: string): Promise<UserResponse> => {

    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error('Token not found!');
    }

    const response = await fetch(`${API_BASE_URL}/users/me/${userId}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)

    }
    const data = await response.json();
    return data;

}

export const fetchNotifications = async () => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error('Token not found!');
    }

    const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)

    }

    const data = await response.json();
    // console.log("Fetch, Notifications", data)
    return data;
}

export const updateReadStatus = async (notificationId: string): Promise<UpdateReadStatusResponse> => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error('Token not found!');
    }
    console.log("Updating read status for notification:", notificationId);
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,

        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    // console.log("update, Notifications", data)
    return data;
}

export const getSearchUserByUserName = async (query: string) => {
    const token = Cookies.get("access_token");
    if (!token) {
        throw new Error('Token not found!');
    }
    const response = await fetch(`${API_BASE_URL}/api/users/search?query=${query}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = response.json();
    return data;
}