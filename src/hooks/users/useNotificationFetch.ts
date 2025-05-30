import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "@/lib/service/user.service";
import { NotificationRes } from "@/lib/types";


export const useFetchNotifications = () => {
    return useQuery<NotificationRes, Error>({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
        staleTime: 1000 * 60 * 1, // 1 minute
        retry: 1,
    });
};