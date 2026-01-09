import React from 'react';

const ClaimCard = ({ claim }) => {
    return (
        <div
            key={claim.claimId}
            className="bg-white shadow-md rounded-lg p-6"
            style={{ borderLeft: "6px solid var(--color-azure-blue)" }}
        >
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-deep-magenta)" }}>
                    Policy ID : {claim.policyId}
                </h2>
                <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                        backgroundColor: "var(--color-lavender-mist)",
                        color: "var(--color-licorice)",
                    }}
                >
                    {claim.status}
                </span>
            </div>

            <div className="mt-3 text-sm text-[var(--color-cool-gray)]">
                <p className="text-gray-500 mb-2">
                    <strong>Claim No: </strong> {claim.claimId}
                </p>
                <p className="text-gray-500 mb-2">
                    <strong>Claim Amount: </strong> <span className='text-green-500'>${claim.claimAmt?.toFixed(2)}</span>
                </p>
                <p className="text-gray-500 mb-2">
                    <strong>Filed At : </strong> {new Date(claim.filedAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ClaimCard;