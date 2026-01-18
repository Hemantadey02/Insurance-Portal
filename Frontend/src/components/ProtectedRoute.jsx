import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../api/Auth/authApi";

const ProtectedRoute = ({ children, required }) => {
    const token = sessionStorage.getItem("auth_token");

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        getUserDetails()
            .then((res) => {
                setUsername(res.username);
            })
            .catch(() => {
                sessionStorage.removeItem("auth_token");
            })
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) return <div>Loading...</div>;

    // Not logged in
    if (!token || !username) {
        return <Navigate to="/login" replace />;
    }

    const isAdmin = username === "admin01";

    // Route guards
    if ((required === "admin" && !isAdmin) || (required === "user" && isAdmin)) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
};

export default ProtectedRoute;