import React, { useEffect, useState } from "react";
import RequestCard from "../components/Requests/RequestCard";
import AddNewRequest from "../components/Requests/AddNewRequest";
import { Plus } from "lucide-react";
import { getUserDetails } from "../api/Auth/authApi";
import { getUserRequests } from "../api/Request/requestsApi";
import { useSelector } from "react-redux";

const RequestsPage = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [requests, setRequests] = useState([]);
  const handleOpen = () => setOpen(!open);

  // const dispatch = useDispatch();
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
      const getUserRequestsData = async () => {
        const result = await getUserRequests(userId); // Fetch requests using userId
        setRequests(result);
      };
      getUserRequestsData();
    }
  }, [userId]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length === 0 ? (
            <div className="flex flex-col">
              <p>No requests found</p>
            </div>
          ) : (
            requests.map((request) => (
              <RequestCard key={request.requestId} request={request} />
            ))
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            onClick={handleOpen}
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          ></div>

          <div className="relative bg-white p-8 rounded-lg shadow-lg min-w-[300px] z-10">
            <AddNewRequest handleOpen={handleOpen} userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
