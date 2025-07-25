export interface FriendRequest {
    id: string;
    senderId: string;
    senderUsername: string;
    senderDisplayName: string;
    senderProfilePicture: string;
    status: "pending";
    createdAt: string;
}

export interface FriendResponse {
    id: string;
    email: string;
    displayName: string;
    username: string;
    dateOfBirth: string;
    phoneNumber: string;
    status: string;
    lastActive: string;
}

export interface FetchFriendRequest {
    id: string;
    receiverId: string;
    receiverUsername: string;
    receiverDisplayName: string;
    profilePicture: string;
    status: string;
    createdAt: string;
}
export interface JwtPayload {
    id: string;
    [key: string]: any;
}

export interface AcceptResponse {
    message: string;
}


export interface UserResponse {
    id: string;
    email: string;
    displayName: string;
    username: string;
    profilePicture: string;
    dateOfBirth: string;
    phoneNumber: string;
    status: string;
    lastActive: string;
}

export interface FriendRequestResponse {
    id: string;
    senderId: string;
    receiverId: string;
    status: 'pending';
    createdAt: string;
}

export interface AddFriendVariable {
    receiverUsername: string;
}
export interface ApiError {
    error: string
}

export interface NotificationPayload {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export interface Notification {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export interface NotificationRes {
    notifications: Notification[];
}


export interface UpdateReadStatusResponse {
    id: string;
    recipientId: string;
    type: string;
    message: string;
    createdAt: string;
    read: boolean;
}


