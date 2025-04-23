import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { RESET_PASSWORD_ENDPOINT } from "@/lib/api"

export interface ResetPasswordSubmitRequest {
    token: string;
    password: string;
    userId: string;
}

export interface ResetPasswordSubmitResponse {
    message: string;
}

export interface ResetPasswordSubmitErrorResponse {
    error: string;
}

const submitResetPassword = async (data: ResetPasswordSubmitRequest): Promise<ResetPasswordSubmitResponse> => {
    const response = await axios.post<ResetPasswordSubmitResponse>(RESET_PASSWORD_ENDPOINT, data);
    return response.data;
};

export const useResetPasswordSubmit = (
    options?: UseMutationOptions<
        ResetPasswordSubmitResponse,
        AxiosError<ResetPasswordSubmitErrorResponse>,
        ResetPasswordSubmitRequest
    >
) => {
    return useMutation({
        mutationFn: submitResetPassword,
        ...options,
    });
};