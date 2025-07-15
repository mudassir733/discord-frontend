import { createDirectChannel } from "@/lib/service/chat.service";
import { useMutation } from "@tanstack/react-query";


export const useCreateDirectChannel = (otherUserUsername: string) => {
    return useMutation({
        mutationFn: () => createDirectChannel(otherUserUsername),
    })

}