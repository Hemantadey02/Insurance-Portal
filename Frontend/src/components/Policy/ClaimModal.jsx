import React from 'react'

function ClaimModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
            ></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg min-w-[300px] z-10">
                <h3 className="text-lg font-semibold">Confirm Claim</h3>
                <p className="mt-2 text-sm">
                    Are you sure you want to file a claim for this policy?
                </p>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClaimModal
