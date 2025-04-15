import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LOGIN_ENDPOINT } from "@/lib/api";
import axios, { AxiosError } from "axios";

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    dateOfBirth: string;
    phoneNumber: string;
    access_token: string;
}

export interface LoginErrorResponse {
    error: string;
}

const useLogin = (options?: UseMutationOptions<LoginResponse, AxiosError<LoginErrorResponse>, LoginRequest>) => {
    const mutation = useMutation<LoginResponse, AxiosError<LoginErrorResponse>, LoginRequest>({
        mutationFn: async (data: LoginRequest) => {
            const response = await axios.post<LoginResponse>(LOGIN_ENDPOINT, data)
            console.log("Lgin RES", response)
            return response.data

        },
        ...options
    })

    return mutation

}

export default useLogin;
