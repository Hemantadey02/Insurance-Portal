import { ArrowDown, ArrowUp, MessageSquareText } from "lucide-react";
import React, { useState } from "react"; // Assuming you're using react-feather for icons
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Message = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to manage message expansion

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const sentAtRelativeTime = dayjs(message.sentAt).fromNow();

  return (
    <div className="flex items-center space-x-4 p-4 border-b rounded-xl border-gray-200 bg-gray-50 transition-all relative">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
        <MessageSquareText />
      </div>

      <div className="flex-1">
        {!isExpanded ? (
          <div className="text-sm font-semibold text-gray-900">
            {message.content.length > 156
              ? message.content.slice(0, 153) + "..."
              : message.content}
          </div>
        ) : (
          <div className="text-sm font-semibold text-gray-900">
            {message.content}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-1">{sentAtRelativeTime}</div>
      </div>

      <div
        onClick={toggleExpand}
        className="absolute bottom-2 right-2 cursor-pointer text-gray-500 hover:text-gray-900 transition-all"
      >
        {!isExpanded ? (
          <button className="w-8 h-8 px-1 cursor-pointer border rounded-full bg-deep-magenta text-white">
            <ArrowDown />
          </button>
        ) : (
          <button className="w-8 h-8 px-1 cursor-pointer border rounded-full bg-deep-magenta text-white">
            <ArrowUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
