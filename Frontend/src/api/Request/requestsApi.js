import api from "../api";
import { ENDPOINTS } from "../endpoints";

export const getAllRequests = async () => {
    try {
        const response = await api.get(ENDPOINTS.GET_ALL_SERVICE_REQUESTS);
        if (response.status == 200) {
            return response.data;
        } else {
            throw error("Token Expired!")
        }
    } catch (error) {
        console.error("Error getting all requests :", error);
        throw error;
    }
}

export const getUserRequests = async (userId) => {
    try {
        const response = await api.get(ENDPOINTS.GET_SERVICE_REQUESTS + userId);
        if (response.status == 200) {
            return response.data;
        } else {
            throw error("Token Expired!")
        }
    } catch (error) {
        console.error("Error getting user requests :", error);
        throw error;
    }
}

export const createUserRequest = async (requestData) => {
    try {
        const response = await api.post(ENDPOINTS.CREATE_SERVICE_REQUEST, requestData);
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw error("Invalid Service Request. Please try again.")
        }
    } catch (error) {
        console.error("Error creating user request :", error);
        throw error;
    }
}

export const updateUserRequest = async (requestId, requestStatus) => {
    try {
        const response = await api.put(`${ENDPOINTS.UPDATE_SERVICE_REQUEST}/${requestId}`, requestStatus);
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw error("Failed to update the service request. Please try again.")
        }
    } catch (error) {
        console.error("Error updating user request :", error);
        throw error;
    }
}