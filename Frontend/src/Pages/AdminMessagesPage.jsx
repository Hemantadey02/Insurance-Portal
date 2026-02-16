import { useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import AdminMessageCard from "../components/Messages/Admin/AdminMessageCard";
import { getAllMessages } from "../api/Message/messagesApi";
import AdminCreateMessage from "../components/Messages/Admin/AdminCreateMessage";
import { getAllUsers } from "../api/Auth/authApi";
import Loader from "../components/Loader";

const AdminMessagesPage = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usersFetched = useRef(false);
  const messagesFetched = useRef(false);

  const handleOpen = () => setOpen((prev) => !prev);

  // Fetch Users (only once)
  useEffect(() => {
    if (usersFetched.current) return;
    usersFetched.current = true;

    const getAllUsersData = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsersData();
  }, []);


  // Fetch Messages (only once)
  const fetchMessages = useCallback(async () => {
    try {
      const res = await getAllMessages();
      setMessages(res || []);
    } catch (err) {
      setError("Failed to load messages. Please try again.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (messagesFetched.current) return;
    messagesFetched.current = true;
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="container mx-auto my-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto ">
            All Messages
          </h1>
          <button
            onClick={handleOpen}
            className="flex cursor-pointer bg-cobalt-blue text-white px-4 py-2 rounded-md"
          >
            <Plus className="mr-2" />
            Add New Message
          </button>
        </div>

        {loading ? (
          <div className="col-span-full">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : messages?.length === 0 ? (
          <p className="text-gray-600">No messages are sent yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <AdminMessageCard
                key={message.messageId}
                message={message}
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
            <AdminCreateMessage
              handleOpen={handleOpen}
              users={users}
              onMessageCreated={fetchMessages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;