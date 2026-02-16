import { useCallback, useEffect, useState } from 'react';
import ClaimCard from './ClaimCard';
import { useSelector } from 'react-redux';
import { getAllClaims } from '../../api/Claims/claimsApi';
import Loader from '../Loader';

const ClaimsPage = () => {
    const [userId, setUserId] = useState(null);
    const [claimsData, setClaimsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const authData = useSelector((state) => state.auth);

    useEffect(() => {
        if (authData?.user?.userId) {
            setUserId(authData.user.userId);
        }
    }, [authData]);

    // Fetch claims data (reusable)
    const fetchUserClaimsData = useCallback(async (uid) => {
        try {
            setError(null);
            const result = await getAllClaims(uid); // Fetch claims using userId
            setClaimsData(result || []);
        } catch (err) {
            setError('Failed to load claims. Please try again.');
            setClaimsData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch claims when userId changes
    useEffect(() => {
        if (userId) {
            setLoading(true);
            fetchUserClaimsData(userId);
        }
    }, [userId, fetchUserClaimsData]);

    return (
        <div className="container mx-auto mb-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto ">
                    Claims
                </h1>
            </div>

            {loading ? (
                <div className="col-span-full">
                    <Loader />
                </div>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : claimsData?.length === 0 ? (
                <p className="text-gray-600">You have not filed any claims yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {claimsData?.map((claim) => (
                        <ClaimCard key={claim.claimId}
                            claim={claim}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClaimsPage;