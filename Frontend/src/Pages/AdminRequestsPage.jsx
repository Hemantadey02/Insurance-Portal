import React, { useCallback, useEffect, useState } from "react";
import AdminRequestCard from "../components/Requests/AdminRequests/AdminRequestCard";
import AdminRequestUpdate from "../components/Requests/AdminRequests/AdminRequestUpdate";
import { getAllRequests } from "../api/Request/requestsApi";

const AdminRequestsPage = () => {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpen = (request = null) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  // Centralized fetch requests function
  const fetchAllRequests = useCallback(async () => {
    const res = await getAllRequests();
    setRequests(res);
  }, []);

  useEffect(() => {
    fetchAllRequests();
  }, [fetchAllRequests]);


  return (
    <div className="container flex justify-center min-h-screen">
      <div className="container mx-auto my-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto ">
            All Requests
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length === 0 ? (
            <div className="flex flex-col">
              <p>No requests found</p>
            </div>
          ) : (
            requests.map((request) => (
              <AdminRequestCard
                key={request.requestId}
                request={request}
                onUpdate={() => handleOpen(request)}
              />
            ))
          )}
        </div>
      </div>

      {open && selectedRequest && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          ></div>

          <div className="relative bg-white p-8 rounded-lg shadow-lg min-w-[300px] z-10">
            <AdminRequestUpdate
              request={selectedRequest}
              handleClose={handleClose}
              refreshRequests={fetchAllRequests}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsPage;