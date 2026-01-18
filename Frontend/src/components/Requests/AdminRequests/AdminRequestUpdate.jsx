import React, { useEffect, useState } from "react";
import { updateUserRequest } from "../../../api/Request/requestsApi";
import toast from "react-hot-toast";

const AdminRequestUpdate = ({ handleClose, request, refreshRequests }) => {
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    if (request?.status) {
      setRequestStatus(request.status);
    }
  }, [request]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Updated request status : ", requestStatus);
    if (!requestStatus) {
      toast.error("Please select a request status");
      return;
    }

    setLoading(true);

    try {
      await updateUserRequest(request.requestId, requestStatus);
      toast.success("Request updated successfully");
      refreshRequests();
      handleClose();
    } catch (e) {
      // console.error("Update Request Error:", error);
      toast.error("Failed to update request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl text-licorice font-semibold mb-4">
        Update Request Status
      </h2>

      {/* Dropdown for Request Status */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Request Status
          </label>
          <select
            name="status"
            value={requestStatus}
            onChange={(e) => setRequestStatus(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">-- Select Request Status --</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mt-4 flex justify-between gap-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-deep-magenta font-semibold border-2 cursor-pointer border-deep-magenta text-white px-4 py-2 rounded-md hover:bg-white hover:text-deep-magenta transition-all ease-in-out duration-300"
          >
            {loading ? "Updating..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="bg-white font-semibold text-black px-4 cursor-pointer py-2 border-2 border-gray-400 rounded-md hover:bg-gray-400 transition-all ease-in-out duration-300"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRequestUpdate;