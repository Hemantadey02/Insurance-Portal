import { useFormik } from "formik";
import React, { useState } from "react";
import { createUserRequest } from "../../api/Request/requestsApi";
import toast from "react-hot-toast";

const AddNewRequest = ({ handleOpen, userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentUserId, setCurrentUserId] = useState(userId);

  const formik = useFormik({
    initialValues: {
      userId: currentUserId,
      type: "",
      status: "Pending", // default to Pending
      createdAt: new Date().toISOString(),
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const res = await createUserRequest(values);
        console.log("Form submitted : ", res);
        toast.success("Request successfully created!");
        handleOpen(); // Close the modal on success
      } catch (error) {
        toast.error(
          "An error occurred while creating the request. Please try again."
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl text-licorice font-semibold mb-4">
        Create New Request
      </h2>

      {/* Dropdown for Request Type */}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Request Type
          </label>
          <select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">-- Select Request Type --</option>
            <option value="Endorsement">Endorsement</option>
            <option value="Renewal">Renewal</option>
            <option value="Update">Update</option>
          </select>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {/* Actions Button */}
        <div className="mt-4 flex justify-between gap-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-deep-magenta font-semibold border-2 cursor-pointer border-deep-magenta text-white px-4 py-2 rounded-md hover:bg-white hover:text-deep-magenta transition-all ease-in-out duration-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            onClick={handleOpen}
            className="bg-white font-semibold text-black px-4 cursor-pointer py-2 border-2 border-gray-400 rounded-md hover:bg-gray-400 transition-all ease-in-out duration-300"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewRequest;
