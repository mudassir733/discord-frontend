import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "@/lib/service/user.service";
import { NotificationPayload } from "@/lib/types";


export const useFetchNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications,
        staleTime: 1000 * 60 * 1,
        retry: 1,
    })

}