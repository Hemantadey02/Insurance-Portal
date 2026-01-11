import React, { useEffect, useState } from 'react';
import ClaimCard from './ClaimCard';
import { useSelector } from 'react-redux';
import { getAllClaims } from '../../api/Claims/claimsApi';
import { getUserDetails } from '../../api/Auth/authApi';

const ClaimsPage = () => {
    const [userId, setUserId] = useState(null);
    const [claimsData, setClaimsData] = useState([]);

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // const authData = useSelector((state) => state.auth);
    // const userId = authData.user?.userId;

    // useEffect(() => {
    //     if (userId) {
    //         const fetchAllClaims = async () => {
    //             try {
    //                 setLoading(true);
    //                 const claims = await getAllClaims(userId);
    //                 setClaimsData(claims);
    //             } catch (err) {
    //                 setError('Failed to fetch claims');
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };

    //         fetchAllClaims();
    //     }
    // }, [userId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>{error}</div>;
    // }

    const userDetails = useSelector((state) => state.auth.userDetails);

    useEffect(() => {
        if (!userDetails) {
            const fetchUserDetails = async () => {
                const result = await getUserDetails();
                if (result && result.userId) {
                    setUserId(result.userId); // Set userId from API response
                }
            };
            fetchUserDetails();
        } else {
            setUserId(userDetails.userId); // Get userId from Redux store
        }
    }, [userDetails]);

    useEffect(() => {
        if (userId) {
            const getUserClaimsData = async () => {
                const result = await getAllClaims(userId); // Fetch requests using userId
                setClaimsData(result);
            };
            getUserClaimsData();
        }
    }, [userId]);

    return (
        <div className="container mx-auto mb-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto ">
                    Claims
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {claimsData.length === 0 ? (
                    <div className="flex flex-col">
                        <p>No claims found</p>
                    </div>
                ) : (
                    claimsData?.map(claim => (
                        <ClaimCard key={claim.claimId} claim={claim} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ClaimsPage;