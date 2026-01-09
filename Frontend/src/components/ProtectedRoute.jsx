import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserDetails } from '../api/Auth/authApi';


const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('auth_token');
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setIsValid(false);
            return;
        }

        getUserDetails()
            .then(() => {
                setIsValid(true);
            })
            .catch(() => {
                sessionStorage.removeItem('auth_token');
                setIsValid(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isValid) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
