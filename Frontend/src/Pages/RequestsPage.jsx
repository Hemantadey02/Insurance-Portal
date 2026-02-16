import { useCallback, useEffect, useState } from "react";
import RequestCard from "../components/Requests/RequestCard";
import AddNewRequest from "../components/Requests/AddNewRequest";
import { Plus } from "lucide-react";
import { getUserRequests } from "../api/Request/requestsApi";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const RequestsPage = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpen((prev) => !prev);
  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    if (authData?.user?.userId) {
      setUserId(authData.user.userId);
    }
  }, [authData]);

  // Fetch requests (reusable)
  const fetchRequests = useCallback(async (uid) => {
    try {
      setError(null);
      const result = await getUserRequests(uid); // Fetch requests using userId
      setRequests(result || []);
    } catch (err) {
      setError("Failed to load requests. Please try again.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch requests when userId changes
  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchRequests(userId);
    }
  }, [userId, fetchRequests]);

  return (
    <div className="container flex justify-center min-h-screen p-4">
      <div className="container mx-auto mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto ">
            All Requests
          </h1>
          <button
            onClick={handleOpen}
            className="flex cursor-pointer bg-cobalt-blue text-white px-4 py-2 rounded-md"
          >
            <Plus className="mr-2" />
            Add New Request
          </button>
        </div>

        {loading ? (
          <div className="col-span-full">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : requests?.length === 0 ? (
          <p className="text-gray-600">You have not made any requests yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests?.map((request) => (
              <RequestCard key={request.requestId}
                request={request}
              />
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            onClick={handleOpen}
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          ></div>

          <div className="relative bg-white p-8 rounded-lg shadow-lg min-w-[300px] z-10">
            <AddNewRequest handleOpen={handleOpen} userId={userId} onSuccess={() => fetchRequests(userId)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;