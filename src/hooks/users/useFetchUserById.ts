import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/lib/service/user.service";
import { UserResponse } from "@/lib/types";




export const useFetchUserById = (userId: string) => {
    return useQuery<UserResponse, Error>({
        queryKey: ["user", userId],
        queryFn: () => fetchUserById(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 60,
    });
};