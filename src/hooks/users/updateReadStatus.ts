import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReadStatus } from "@/lib/service/user.service";
import { UpdateReadStatusResponse } from "@/lib/types";




export const useUpdateReadStatus = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateReadStatusResponse, Error, string>({
        mutationFn: updateReadStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            console.error("Failed to update read status:", error.message);
        },
    });
};