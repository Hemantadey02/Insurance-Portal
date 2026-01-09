import React, { useEffect, useState } from "react";
import AdminRequestCard from "../components/Requests/AdminRequests/AdminRequestCard";
import AdminRequestUpdate from "../components/Requests/AdminRequests/AdminRequestUpdate";
import { getAllRequests } from "../api/Request/requestsApi";

const AdminRequestsPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getAllRequestsData = async () => {
      const res = await getAllRequests();
      setRequests(res);
    };
    getAllRequestsData();
  }, []);

  // const requests = [
  //   {
  //     requestId: 1,
  //     userId: "f00bc763-2f48-4419-9011-5bb7d16a7d2b",
  //     type: "Renewal",
  //     status: "Completed",
  //     createdAt: "2025-09-17T16:38:59.519",
  //     user: null,
  //   },
  //   {
  //     requestId: 2,
  //     userId: "f00bc763-2f48-4419-9011-5bb7d16a7d2b",
  //     type: "Renewal",
  //     status: "Pending",
  //     createdAt: "2025-09-17T16:47:22.296",
  //     user: null,
  //   },
  //   {
  //     requestId: 3,
  //     userId: "ec01b8dd-d3da-463a-8e48-248a0d34677e",
  //     type: "Renewal",
  //     status: "In Progress",
  //     createdAt: "2025-09-17T16:47:22.296",
  //     user: null,
  //   },
  //   {
  //     requestId: 4,
  //     userId: "ec01b8dd-d3da-463a-8e48-248a0d34677e",
  //     type: "Endorsement",
  //     status: "Pending",
  //     createdAt: "2025-09-18T05:32:51.8276539",
  //     user: null,
  //   },
  //   {
  //     requestId: 5,
  //     userId: "ec01b8dd-d3da-463a-8e48-248a0d34677e",
  //     type: "Update",
  //     status: "Pending",
  //     createdAt: "2025-09-18T09:36:34.325",
  //     user: null,
  //   },
  //   {
  //     requestId: 6,
  //     userId: "ec01b8dd-d3da-463a-8e48-248a0d34677e",
  //     type: "Update",
  //     status: "Completed",
  //     createdAt: "2025-09-18T09:43:20.7048667",
  //     user: null,
  //   },
  // ];

  return (
    <div className="container flex justify-center min-h-screen px-10 py-8 ">
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
              <AdminRequestCard key={request.requestId} request={request} />
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
            <AdminRequestUpdate handleOpen={handleOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsPage;
