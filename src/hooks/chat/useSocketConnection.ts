
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "@/lib/api";
import { useRef, useEffect } from "react";


export const useSocketConnection = (userId: string) => {
    const socketRef = useRef<Socket | null>(null);


    useEffect(() => {
        if (!userId) return;

        const socket = io(API_BASE_URL, {
            transports: ["websocket"],
            query: { userId },

        })

        socket.on("connect", () => {
            console.log(`Connected to socket server for chat with userId: ${userId}`);
        });

        // Disconnect event
        socket.on("disconnect", () => {
            console.log(`Disconnected from socket server for userId: ${userId}, attempting to reconnect...`);
            setTimeout(() => socket.connect(), 2000);
        });

        socketRef.current = socket;

        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
        });

        return () => {
            socket.disconnect();
        }

    }, [userId])

    return socketRef.current;

}