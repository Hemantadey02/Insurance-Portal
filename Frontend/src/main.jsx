import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import KycUpdatePage from "./Pages/KycUpdatePage.jsx";
import PolicyPage from "./Pages/PolicyPage.jsx";
import RequestsPage from "./Pages/RequestsPage.jsx";
import UserPolicies from "./Pages/UserPolicies.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import UserProfilePage from "./Pages/UserProfilePage.jsx";
import UserDashBoardLanding from "./Pages/UserDashBoardLanding.jsx";
import MessagesPage from "./Pages/MessagesPage.jsx";
import AdminRequestsPage from "./Pages/AdminRequestsPage.jsx";
import AdminMessagesPage from "./Pages/AdminMessagesPage.jsx";
import { Toaster } from 'react-hot-toast'
import UserClaimPage from './Pages/UserClaimPage.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AccessDenied from "./Pages/AccessDenied.jsx";


const routing = (
  <BrowserRouter>
    <Navbar />
    <Toaster position="top-center" reverseOrder={false} />
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
    <Footer />
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>{routing}</Provider>
  </StrictMode>
);