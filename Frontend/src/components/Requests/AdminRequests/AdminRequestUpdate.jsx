import { useFormik } from "formik";
import React, { useState } from "react";
import { updateUserRequest } from "../../../api/Request/requestsApi";
import toast from "react-hot-toast";

const AdminRequestUpdate = ({ handleEditRequest, request }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [requestStatus, setRequestStatus] = useState(request.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   handleEditRequest();
    // }, 2000);
    console.log("Status of request : ", requestStatus);
    try {
      const res = await updateUserRequest(request.requestId, requestStatus);
      // console.log("Request updated successfully:", res.data);
      toast.success("Request updated successfully");
      handleEditRequest();
    } catch (e) {
      // console.log(e);
      toast.error("An error occurred while updating the request. Please try again.")
    }
    // alert("Updated!");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl text-licorice font-semibold mb-4">
        Update Request Status
      </h2>

      {/* Dropdown for Request Status */}
      <form onSubmit={handleSubmit}>
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

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <div className="mt-4 flex justify-between gap-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-deep-magenta font-semibold border-2 cursor-pointer border-deep-magenta text-white px-4 py-2 rounded-md hover:bg-white hover:text-deep-magenta transition-all ease-in-out duration-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            onClick={handleEditRequest}
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
