
import { useEffect } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

interface NotificationPayload {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    read: boolean;
}


export const useNotificationSocket = (userId: string) => {
    useEffect(() => {
        const token = Cookies.get("access_token");
        if (!token) {
            console.warn("No access token found for socket connection");
            return;
        }

        const socket = io(API_BASE_URL, {
            auth: {
                token: `Bearer ${token}`,
            },
            query: {
                userId,
            },
        });

        // Connect event
        socket.on("connect", () => {
            console.log(`Connected to socket server with userId: ${userId}`);
        });

        // Disconnect event
        socket.on("disconnect", () => {
            console.log(`Disconnected from socket server for userId: ${userId}, attempting to reconnect...`);
            setTimeout(() => socket.connect(), 2000);
        });

        // Listen for friend request notifications
        socket.on("notification", (data: NotificationPayload) => {
            console.log("NOTIFICATION", data)
            if (data.type === "friend_request_sent") {
                toast.info(`${data.message.split(" has ")[0]} has sent you a friend request!`, {
                    description: data.message,
                    action: {
                        label: "View",
                        onClick: () => console.log("Navigate to notifications or friend requests"),
                    },
                });
            }
        });


        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, [userId]);

    return null;
};
