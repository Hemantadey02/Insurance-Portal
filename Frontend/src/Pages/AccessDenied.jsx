import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../api/Auth/authApi";

const AccessDenied = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserDetails()
            .then((res) => {
                setUsername(res.username);
            })
            .catch(() => {
                // token invalid or expired
                navigate("/login", { replace: true });
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
                Access Denied
            </h1>

            <p className="text-lg text-gray-700 mb-2">
                Sorry <strong>{username}</strong>, you don't have permission to access this page.
            </p>

            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-6 py-2 bg-deep-magenta text-white rounded-md hover:bg-white hover:text-deep-magenta border-2 border-deep-magenta cursor-pointer transition-all ease-in-out duration-300"
            >
                Go Back
            </button>
        </div>
    );
};

export default AccessDenied;