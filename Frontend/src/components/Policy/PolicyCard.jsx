import React, { useState } from 'react'
import ClaimModal from './ClaimModal'
import { createNewClaim } from '../../api/Claims/claimsApi'
import toast from 'react-hot-toast'

function PolicyCard({ userId, policyId, insurer, policyType, premium, status, expiry }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClaimClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleConfirmClaim = async () => {
        try {
            const now = Date.now()
            const expiryTime = new Date(expiry).getTime()

            // Assume policy duration is 1 year in milliseconds
            const oneYearMs = 365 * 24 * 60 * 60 * 1000

            const timeRemaining = expiryTime - now

            // Claim amount proportional to time remaining, minimum 0
            const claimAmt = timeRemaining > 0 ? (timeRemaining / oneYearMs) * premium : 0

            const claimData = {
                "userId": userId,
                "policyId": policyId,
                "claimAmt": Number(claimAmt.toFixed(2)),
                "status": "Active",
            }
            await createNewClaim(claimData);


            toast.success(`Claim confirmed for policy: ${policyId}`)
        } catch (error) {
            console.log(error);
            toast.error("Failed to add a claim!")
        } finally {

            setIsModalOpen(false)
        }
    }


    return (
        <div
            key={policyId}
            className="bg-white shadow-md rounded-lg p-6"
            style={{ borderLeft: "6px solid var(--color-azure-blue)" }}
        >
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-cobalt-blue)" }}>
                    {insurer}
                </h2>
                <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                        backgroundColor: "var(--color-deep-magenta)",
                        color: "white",
                    }}
                >
                    {policyType}
                </span>
            </div>

            <div className="mt-2 text-sm text-[var(--color-cool-gray)]">
                <p className="text-gray-500 mb-1">
                    <strong>Premium:</strong> <span className='text-green-500'> ${premium?.toFixed(2)} </span>
                </p>
                <p className="text-gray-500 mb-1">
                    <strong>Status:</strong> <span
                        className={
                            status === "Active"
                                ? "text-[var(--color-cobalt-blue)]"
                                : "text-red-500"
                        }
                    >
                        {status}
                    </span>
                </p>
                <p className="text-gray-500 mb-1">
                    <strong>Expiry:</strong>{" "}
                    {new Date(expiry).toLocaleDateString()}
                </p>
            </div>

            <div className="mt-4 flex space-x-4">
                <button
                    onClick={handleClaimClick}
                    className="px-6 py-2 rounded-md text-[var(--color-cobalt-blue)] font-semibold border-2 border-[var(--color-cobalt-blue)]
                hover:bg-[var(--color-cobalt-blue)] hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
                >
                    Claim
                </button>
            </div>


            <ClaimModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmClaim}
            />
        </div>
    )
}

export default PolicyCard
