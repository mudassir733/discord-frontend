
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios"
import { REGISTER_ENDPOINT } from "@/lib/api";



export interface RegisterRequest {
    userName: string;
    email: string;
    displayName: string;
    password: string;
    dateOfBirth: string;
}

export interface RegisterResponse {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    dateOfBirth: string;
    phoneNumber: string;
    access_token: string;
}

export interface RegisterErrorResponse {
    error: string
}


const useRegister = (options?: UseMutationOptions<RegisterResponse, AxiosError<RegisterErrorResponse>, RegisterRequest>) => {
    const mutation = useMutation<RegisterResponse, AxiosError<RegisterErrorResponse>, RegisterRequest>({
        mutationFn: async (data: RegisterRequest) => {
            const response = await axios.post<RegisterResponse>(REGISTER_ENDPOINT, data);
            console.log("RES", response)
            return response.data
        },
        ...options
    })
    return mutation;
}

export default useRegister;