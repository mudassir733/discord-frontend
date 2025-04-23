import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { VERIFY_RESET_TOKEN_ENDPOINT } from "@/lib/api"

export interface VerifyResetTokenResponse {
    userId: string;
}

export interface VerifyResetTokenErrorResponse {
    error: string;
}

const verifyResetToken = async (token: string): Promise<VerifyResetTokenResponse> => {
    const response = await axios.post<VerifyResetTokenResponse>(VERIFY_RESET_TOKEN_ENDPOINT, { token });
    console.log("Verify token", response);
    return response.data;
};

export const useResetPasswordVerify = (token: string) => {
    return useQuery<VerifyResetTokenResponse, AxiosError<VerifyResetTokenErrorResponse>>({
        queryKey: ["verifyResetToken", token],
        queryFn: () => verifyResetToken(token),
        enabled: !!token,
    });
};