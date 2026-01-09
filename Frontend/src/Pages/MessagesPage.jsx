import React, { useEffect, useState } from "react";
import Message from "../components/Messages/MessageCard";
import { getUserDetails } from "../api/Auth/authApi";
import { useSelector } from "react-redux";
import { getUserMessages } from "../api/Message/messagesApi";

const MessagesPage = () => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    if (!userDetails) {
      const fetchUserDetails = async () => {
        const result = await getUserDetails();
        if (result && result.userId) {
          setUserId(result.userId); // Set userId from API response
        }
      };
      fetchUserDetails();
    } else {
      setUserId(userDetails.userId); // Get userId from Redux store
    }
  }, [userDetails]);

  useEffect(() => {
    if (userId) {
      const getUserMessagesData = async () => {
        const result = await getUserMessages(userId); // Fetch requests using userId
        setMessages(result);
      };
      getUserMessagesData();
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Main content */}
      <div className="container mx-auto mb-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-azure-blue border-b-2 border-b-azure-blue w-auto ">
            All Messages
          </h1>
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col">
              <p>No messages found</p>
            </div>
          ) : (
            messages.map((message) => (
              <Message key={message.messageId} message={message} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
