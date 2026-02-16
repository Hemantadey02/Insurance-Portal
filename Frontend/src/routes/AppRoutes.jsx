import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import NotFoundPage from "../Pages/NotFoundPage";
import RegistrationPage from "../Pages/RegistrationPage";
import LoginPage from "../Pages/LoginPage";
import KycUpdatePage from "../Pages/KycUpdatePage";
import PolicyPage from "../Pages/PolicyPage";
import RequestsPage from "../Pages/RequestsPage";
import UserPolicies from "../Pages/UserPolicies";
import UserDashboard from "../Pages/UserDashboard";
import UserProfilePage from "../Pages/UserProfilePage";
import UserDashBoardLanding from "../Pages/UserDashBoardLanding";
import MessagesPage from "../Pages/MessagesPage";
import AdminRequestsPage from "../Pages/AdminRequestsPage";
import AdminMessagesPage from "../Pages/AdminMessagesPage";
import UserClaimPage from "../Pages/UserClaimPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../Pages/AdminDashboard";
import AccessDenied from "../Pages/AccessDenied";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/kyc-update" element={<KycUpdatePage />} />

            {/* Protected user routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute required="user">
                        <UserDashboard />
                    </ProtectedRoute>
                }
            >
                <Route index element={<UserDashBoardLanding />} />
                <Route path="policies" element={<PolicyPage />} />
                <Route path="myPolicies" element={<UserPolicies />} />
                <Route path="profile" element={<UserProfilePage />} />
                <Route path="requests" element={<RequestsPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="claims" element={<UserClaimPage />} />
            </Route>

            {/* Protected Admin routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute required="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            >
                <Route path="requests" element={<AdminRequestsPage />} />
                <Route path="messages" element={<AdminMessagesPage />} />
                <Route path="profile" element={<UserProfilePage />} />
            </Route>

            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;