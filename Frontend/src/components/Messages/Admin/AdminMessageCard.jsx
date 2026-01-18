import { ArrowDown, ArrowUp, MessageSquareText } from "lucide-react";
import React, { useEffect, useState } from "react"; // Assuming you're using react-feather for icons
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getAllUsers } from "../../../api/Auth/authApi";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const AdminMessageCard = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to manage message expansion

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsersData = async () => {
      try {
        const res = await getAllUsers();
        res.array.forEach((element) => {
          const newUser = { userId: element.id, userName: element.userName };
          setUsers([...users, newUser]);
        });
        console.log(users);
      } catch (error) { }
    };
    getAllUsersData();
  }, [users]);

  const sentAtRelativeTime = dayjs(message.sentAt).fromNow();

  return (
    <div className="flex items-center space-x-4 p-4 border-b rounded-xl border-gray-200 bg-gray-50 transition-all relative">
      {/* Avatar */}
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
        <MessageSquareText />
      </div>

      <div className="flex-1">
        {!isExpanded ? (
          <div className="text-sm font-semibold text-gray-900 overflow-hidden transition-all duration-700 ease-in-out">
            {message.content.length > 156
              ? message.content.slice(0, 153) + "..."
              : message.content}
          </div>
        ) : (
          <div className="text-sm font-semibold text-gray-900">
            {message.content}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-1">
          sent to <strong>{message.userId}</strong> by{" "}
          <strong>{sentAtRelativeTime}</strong>
        </div>
      </div>

      {message.content.length > 156 && (
        <button
          onClick={toggleExpand}
          className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center
                     rounded-full bg-deep-magenta text-white transition-transform duration-300
                     hover:scale-105 cursor-pointer"
        >
          {isExpanded ? <ArrowUp /> : <ArrowDown />}
        </button>
      )}
    </div>
  );
};

export default AdminMessageCard;