import axios from "axios";
import {BASE_URL} from "./urls";

export const createUser = async (userName : string | undefined): Promise<any> => {
    if (!userName) return
    try {
        const response = await axios.post(`${BASE_URL}/users`, userName);
        console.log("Create successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Create failed:", error);
    }
};

export const updateUser = async (userId : number, steps: number): Promise<any> => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${userId}`, steps);
        console.log("Update successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Update failed:", error);
    }
};
