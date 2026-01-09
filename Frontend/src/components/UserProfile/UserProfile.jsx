import React from "react";
import UserField from "./UserField";
import AddressField from "./AddressField";
import { UserIcon } from "lucide-react";

const UserProfile = ({ user }) => {
    return (
        <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
            {/* Header Section */}
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-deep-magenta to-azure-blue">
                    User Profile
                </h2>
            </div>

            {/* Avatar Section */}
            <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-deep-magenta to-cobalt-blue text-white p-5 rounded-full shadow-xl">
                    <UserIcon size={80} />
                </div>
            </div>

            {/* User Information Section */}
            <div className="bg-[var(--color-lavender-mist)] p-6 rounded-xl shadow-inner space-y-4">
                <UserField label="UserId" value={user.userId} />
                <UserField label="Username" value={user.username} />
                <UserField label="Full Name" value={user.fullName} />
                <UserField label="Email" value={user.email} />
                <UserField label="KYC Id" value={user.kycId} />
                <div className="pt-4 border-t border-gray-500">
                    <AddressField />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
