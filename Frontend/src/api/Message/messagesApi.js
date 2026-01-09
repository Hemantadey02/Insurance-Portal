import api from "../api";
import { ENDPOINTS } from "../endpoints";


export const getAllMessages = async () => {
    try {
        const response = await api.get(ENDPOINTS.GET_ALL_MESSAGES);
        if (response.status == 200) {
            return response.data;
        } else {
            throw error("Token Expired!")
        }
    } catch (error) {
        console.error("Error getting all messages :", error);
        throw error;
    }
}

export const getUserMessages = async (userId) => {
    try {
        const response = await api.get(ENDPOINTS.GET_USER_MESSAGES + userId);
        if (response.status == 200) {
            return response.data;
        } else {
            throw error("Token Expired!")
        }
    } catch (error) {
        console.error("Error getting user messages :", error);
        throw error;
    }
}

export const createMessage = async (messageData) => {
    try {
        const response = await api.post(ENDPOINTS.CREATE_MESSAGE, messageData);
        if (response.status == 200) {
            return response.data;
        } else {
            throw error("Invalid Message. Please try again.")
        }
    } catch (error) {
        console.error("Error creating new message :", error);
        throw error;
    }
}