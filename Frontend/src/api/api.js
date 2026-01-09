import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7044/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Dynamically attach token before each request
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
    }
);

export default api;
