import React, { useState } from "react";
import RequestStatusTracker from "../RequestStatusTracker"; // assuming this component exists
import AdminRequestUpdate from "./AdminRequestUpdate";

const AdminRequestCard = ({ request }) => {
  const [openTrackStatus, setOpenTrackStatus] = useState(false);
  const [openEditRequest, setOpenEditRequest] = useState(false);
  const [showUserId, setShowUserId] = useState(false);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const handleEditRequest = () => {
    setOpenEditRequest(!openEditRequest);
  };
  const handleTrackStatus = () => {
    setOpenTrackStatus(!openTrackStatus);
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6 relative">
      <div
        onMouseEnter={() => setShowUserId(!showUserId)}
        onMouseLeave={() => setShowUserId(!showUserId)}
        className="absolute top-3 right-3 text-sm text-black group rounded-xl bg-gray-400 px-2 py-1"
        style={{ maxWidth: "150px" }}
      >
        {request.userId.slice(0, 15)}

        {showUserId && (
          <div
            className="absolute bottom-full z-50 transform -translate-x-42 translate-y-7 bg-gray-400 text-sm px-2 py-1 rounded-xl"
            style={{
              maxWidth: "350px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {request.userId}
          </div>
        )}
      </div>
      <h5 className="text-xl font-semibold mb-2">{request.type}</h5>
      <div className="mb-4">
        <strong>Status: </strong>
        <span
          className={`text-${
            request.status === "Completed"
              ? "green"
              : request.status === "In Progress"
              ? "yellow"
              : `[cobalt-blue]`
          }-500`}
        >
          {request.status}
        </span>
      </div>
      <p className="text-gray-500 mb-4">
        <strong>Created on: </strong>
        {new Date(request.createdAt)
          .toLocaleString("en-GB", options)
          .replace(",", "")}
      </p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleEditRequest}
          className="border-2 border-deep-magenta font-semibold cursor-pointer px-4 py-2 rounded-md bg-white text-deep-magenta hover:bg-deep-magenta hover:text-white transition-all ease-in-out duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleTrackStatus}
          className="bg-white font-semibold text-black px-4 cursor-pointer py-2 border-2 border-gray-400 rounded-md hover:bg-gray-400 hover:text-white transition-all ease-in-out duration-300"
        >
          Track Status
        </button>
      </div>

      {openTrackStatus && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            onClick={handleTrackStatus}
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          ></div>

          <div className="relative bg-white p-8 rounded-lg shadow-lg min-w-[300px] z-10">
            <RequestStatusTracker status={request.status} />
          </div>
        </div>
      )}

      {openEditRequest && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            onClick={handleEditRequest}
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          ></div>

          <div className="relative bg-white p-8 rounded-lg shadow-lg min-w-[300px] z-10">
            <AdminRequestUpdate
              handleEditRequest={handleEditRequest}
              request={request}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequestCard;
