import api from "../api";
import { ENDPOINTS } from "../endpoints";

export const registerUser = async (userData) => {
    try {
        const response = await api.post(ENDPOINTS.REGISTER_USER, userData);
        if (response.status == 200) {
            const res = await loginUser({ "username": userData.username, "password": userData.password })
            return (res);
        } else {
            throw error("Registration Failed!");
        }
    } catch (error) {
        console.error("Registration Failed:", error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post(ENDPOINTS.LOGIN_USER, userData);
        if (response.status == 200) {
            const token = response.data.token
            sessionStorage.setItem("auth_token", token)

            return {
                "userId": response.data.userId,
                "username": response.data.username
            };
        } else {
            throw error("Invalid User")
        }
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};


export const getUserDetails = async () => {
    try {
        const response = await api.get(ENDPOINTS.GET_USER_DETAILS);
        if (response.status == 200) {
            return response.data;
        } else {
            throw error("Token Expired!")
        }
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const updateUserDetails = async (userId, UserDetails) => {
    try {
        const response = await api.put(ENDPOINTS.UPDATE_USER_DETAILS + userId, UserDetails);
        console.log(response);
        if (response.status == 200) {
            return (response.data);
        } else {
            throw error("User details update failed!");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get(ENDPOINTS.GET_ALL_USERS);
        if (response.status == 200) {
            return response.data;
        } else {
            throw error("Token Expired!")
        }
    } catch (error) {
        console.error("Error fetching all users :", error);
        throw error;
    }
}
