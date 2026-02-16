import { useCallback, useEffect, useState } from "react";
import Message from "../components/Messages/MessageCard";
import { useSelector } from "react-redux";
import { getUserMessages } from "../api/Message/messagesApi";
import Loader from "../components/Loader";

const MessagesPage = () => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    if (authData?.user?.userId) {
      setUserId(authData.user.userId);
    }
  }, [authData]);

  // Fetch messages (reusable)
  const fetchUserMessagesData = useCallback(async (uid) => {
    try {
      setError(null);
      const result = await getUserMessages(uid); // Fetch messages using userId
      setMessages(result || []);
    } catch (err) {
      setError("Failed to load messages. Please try again.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch messages when userId changes
  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserMessagesData(userId);
    }
  }, [userId, fetchUserMessagesData]);

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="container mx-auto mb-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto ">
            All Messages
          </h1>
        </div>

        {loading ? (
          <div className="col-span-full">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : messages?.length === 0 ? (
          <p className="text-gray-600">You have not received any messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Message key={message.messageId}
                message={message}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;