import React, { useState } from "react";
import RequestStatusTracker from "./RequestStatusTracker"; // assuming this component exists

const RequestCard = ({ request }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6">
      <h5 className="text-xl font-semibold mb-2">{request.type}</h5>
      <div className="mb-4">
        <strong>Status: </strong>
        <span
          className={
            request.status === "Completed"
              ? "text-green-500"
              : request.status === "In Progress"
                ? "text-yellow-500"
                : "text-[var(--color-cobalt-blue)]"
          }
        >
          {request.status}
        </span>
      </div>
      <p className="text-gray-500 mb-4">
        <strong>Created on: </strong>
        {new Date(request.createdAt).toLocaleString('en-GB', options).replace(",", "")}
      </p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleOpen}
          className="border-2 border-deep-magenta font-semibold cursor-pointer px-4 py-2 rounded-md bg-white text-deep-magenta hover:bg-deep-magenta hover:text-white transition-all ease-in-out duration-300"
        >
          Track Status
        </button>
      </div>

      {/* Modal with blur effect */}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Background Blur */}
          <div
            onClick={handleOpen}
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg min-w-[300px] z-10">
            <RequestStatusTracker status={request.status} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
