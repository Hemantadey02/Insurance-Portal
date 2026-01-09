import React, { useState, useEffect } from "react";
import { Edit, Check, X } from "lucide-react";
import { useSelector } from "react-redux";
import { updateUserDetails } from "../../api/Auth/authApi";
import toast from "react-hot-toast";

const AddressField = () => {
    const authData = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [localAddress, setLocalAddress] = useState("");

    useEffect(() => {
        if (authData.user?.address) {
            setLocalAddress(authData.user.address);
        }
    }, [authData.user?.address]);

    const handleAddressChange = (e) => {
        setLocalAddress(e.target.value);
    };

    const onAddressChange = async (newAddress) => {
        try {
            await updateUserDetails(authData.user?.userId, {
                fullName: authData.user?.fullName,
                address: newAddress,
                kycId: authData.user?.kycId
            });

            toast.success("Address update successfully!");
        } catch (error) {
            console.error("Failed to update address:", error);
            toast.error("Update Failed!")
        }
    };

    const handleSave = () => {
        onAddressChange(localAddress);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setLocalAddress(authData.user?.address || "");
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-center text-cool-gray">
            <span className="font-semibold text-lg">Address</span>
            <div className="flex items-center space-x-2">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-blue"
                            value={localAddress}
                            onChange={handleAddressChange}
                        />
                        <button
                            onClick={handleSave}
                            className="p-2 rounded-md bg-azure-blue text-white hover:brightness-90 cursor-pointer"
                        >
                            <Check className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-2 rounded-md bg-cool-gray text-white hover:bg-gray-500 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </>
                ) : (
                    <>
                        <span>{localAddress?.trim() ? localAddress : "No address available"}</span>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 rounded-md bg-azure-blue text-white hover:brightness-80 cursor-pointer"
                        >
                            <Edit className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddressField;
