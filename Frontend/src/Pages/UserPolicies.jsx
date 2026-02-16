import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPurchasedPolicies } from "../api/Policy/policyApi";
import PolicyCard from "../components/Policy/PolicyCard";
import Loader from "../components/Loader";

const UserPolicies = () => {
  const [userId, setUserId] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    if (authData?.user?.userId) {
      setUserId(authData.user.userId);
    }
  }, [authData]);

  // Fetch policies (reusable)
  const fetchPolicies = useCallback(async (uid) => {
    try {
      setError(null);
      const response = await getPurchasedPolicies(uid); // Fetch policies using userId
      setPolicies(response || []);
    } catch (err) {
      setError("Failed to load policies. Please try again.");
      setPolicies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch policies when userId changes
  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchPolicies(userId);
    }
  }, [userId, fetchPolicies]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto mb-6">
          My Purchased Policies
        </h1>
      </div>

      {loading ? (
        <div className="col-span-full">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : policies?.length === 0 ? (
        <p className="text-gray-600">You have not purchased any policies yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {policies?.map((policy) => (
            <PolicyCard key={policy.policyId}
              userId={policy.userId}
              policyId={policy.policyId}
              insurer={policy.insurer}
              policyType={policy.policyType}
              premium={policy.premium}
              status={policy.status}
              expiry={policy.expiry}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPolicies;