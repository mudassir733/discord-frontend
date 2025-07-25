
import { useEffect } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
import { useDispatch } from "react-redux";
import { updateUserStatus } from "@/store/slices/statusTypeSlice";
import { StatusType } from "@/components/status-indicator";
import { NotificationPayload } from "@/lib/types";
import { addNotification } from "@/store/slices/notificationSlice";
import { useQueryClient } from "@tanstack/react-query";



export const useNotificationSocket = (userId: string) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    useEffect(() => {
        let lastActivity = 0;
        const debounceDelay = 10000;
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
            dispatch(addNotification(data));
            if (data.type === "friend_request_sent") {
                queryClient.invalidateQueries({ queryKey: ["pendingFriendRequests"] });

                toast.info(`${data.message.split(" has ")[0]} has sent you a friend request!`, {
                    description: data.message,
                    action: {
                        label: "View",
                        onClick: () => console.log("Navigate to notifications or friend requests"),
                    },
                });
            } else if (data.type === "friend_request_accepted") {
                queryClient.invalidateQueries({ queryKey: ["friends"] });
                toast.info(`${data.message.split(" has ")[0]} accepted your friend request!`, {
                    description: data.message,
                });
            } else if (data.type === "friend_request_rejected") {
                toast.info(`${data.message.split(" has ")[0]} rejected your friend request!`, {
                    description: data.message,
                });
            }
        });
        // Listen for status updates from the backend
        function emitUserActivity() {
            const now = Date.now();
            if (now - lastActivity > debounceDelay) {
                socket.emit('user_activity');
                lastActivity = now;

            }


        }

        // document.addEventListener('mousemove', emitUserActivity);
        document.addEventListener('keypress', emitUserActivity);

        socket.on("status-update", (data: { userId: string; status: StatusType }) => {
            console.log("Status update received:", data);
            dispatch(updateUserStatus(data));

            queryClient.setQueryData(["friends"], (oldData: any) => {
                if (!oldData) return oldData;
                console.log("oldData", oldData)

                return {
                    ...oldData,
                    friends: oldData.friends.map((friend: any) =>
                        friend.id === data.userId
                            ? { ...friend, status: data.status }
                            : friend
                    )
                };
            });

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
