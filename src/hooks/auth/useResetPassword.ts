import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { INITIATE_PASSWORD_ENDPOINT } from "@/lib/api";


export interface ResetPasswordRequest {
    email: string;
}

export interface ResetPasswordResponse {
    message: string;
}


export interface ResetPasswordApiError {
    error: string;
}

const useResetPassword = (options?: UseMutationOptions<ResetPasswordResponse, AxiosError<ResetPasswordApiError>, ResetPasswordRequest>) => {
    const mutation = useMutation<ResetPasswordResponse, AxiosError<ResetPasswordApiError>, ResetPasswordRequest>({
        mutationFn: async (data: ResetPasswordRequest) => {
            const response = await axios.post<ResetPasswordResponse>(INITIATE_PASSWORD_ENDPOINT, data)
            return response.data
        },

        ...options
    })

    return mutation;
}

export default useResetPassword;