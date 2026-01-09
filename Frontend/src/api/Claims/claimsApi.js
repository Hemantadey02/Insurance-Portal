import api from "../api";
import { ENDPOINTS } from "../endpoints";

export const getAllClaims = async (userId) => {
    try {
        const response = await api.get(ENDPOINTS.GET_ALL_CLAIMS + userId);
        if (response.status == 200) {
            return (response.data);
        } else {
            throw error("Claims Data Fatching Failed!");
        }
    } catch (error) {
        console.error("Claims Data Fatching Failed:", error);
        throw error;
    }
};

export const createNewClaim = async (claimData) => {
    console.log(claimData)
    try {
        const response = await api.post(ENDPOINTS.ADD_NEW_CLAIM, claimData);
        if (response.status == 201) {
            return (response.data);
        } else {
            throw error("Failed to add Claim!");
        }
    } catch (error) {
        console.error("Failed to add Claim:", error);
        throw error;
    }
}