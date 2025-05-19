import { GET_USER_BY_ID_ENDPOINT } from "@/lib/api";
import axios from "axios";

export interface GetUserById {
    id: string;
}


const fetchUserById = async (userId: GetUserById) => {
    const response = await axios.get(`${GET_USER_BY_ID_ENDPOINT}/${userId.id}`);
    return response.data;

}