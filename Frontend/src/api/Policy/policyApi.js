import api from "../api";
import { ENDPOINTS } from "../endpoints";

export const policyPurchase = async (policyData) => {
    try {
        const response = await api.post(ENDPOINTS.POLICY_CONSOLIDATION, policyData);
        console.log("Here is the response " + response);
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error("Unexpected response from server during policy purchase.");
        }
    } catch (err) {
        console.error("Policy purchase failed:", err.response?.data || err.message);
        throw new Error("Policy purchase failed. Please try again later.");
    }
};


export const getPurchasedPolicies = async (userId) => {
    try {
        const response = await api.get(ENDPOINTS.PURCHASED_POLICIES + userId);

        if (response.status === 200) {
            return response.data; // List of purchased policies
        } else {
            throw new Error("Failed to fetch purchased policies.");
        }
    } catch (error) {
        console.error("Error fetching purchased policies:", error.response?.data || error.message);
        throw new Error("Unable to fetch purchased policies. Please try again later.");
    }
};
