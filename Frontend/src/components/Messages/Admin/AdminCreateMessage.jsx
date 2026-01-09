import { useFormik } from "formik";
import React, { useState } from "react";
import { createMessage } from "../../../api/Message/messagesApi";
import toast from "react-hot-toast";

const AdminCreateMessage = ({ handleOpen, users }) => {
  const [loading, setLoading] = useState(false);

  const userList = users
    .filter((user) => !user.userName.toLowerCase().includes("admin"))
    .map((user) => ({
      userName: user.userName,
      userId: user.id,
    }));
  // console.log(userList);
  const formik = useFormik({
    initialValues: {
      userId: "",
      content: "",
      sentAt: new Date().toISOString(),
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await createMessage(values);
        toast.success("Message created successfully.");
        // console.log("Form Data : ", values);
        handleOpen();
      } catch (error) {
        toast.error(
          "An error occurred while creating new message. Please try again."
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl text-licorice font-semibold mb-4">
        Create New Message For A Specific User
      </h2>

      {/* Dropdown for Request Type */}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User
          </label>
          <select
            name="userId"
            value={formik.values.userId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">-- Select User --</option>
            {userList.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.userName.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            placeholder="Enter message content"
            className="w-full mt-2 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

export default AdminCreateMessage;
