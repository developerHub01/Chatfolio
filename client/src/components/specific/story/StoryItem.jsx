import React from "react";
import ChatAvatar from "../../shared/ChatAvatar";
import ChatItemWrapper from "../../shared/ChatItemWrapper";

const StoryItem = ({ id, name = "My Stories", time }) => {
  return (
    <ChatItemWrapper>
      <ChatAvatar />
      <div className="w-full">
        <h4 className="text-base sm:text-lg font-bold truncate text-ellipsis">
          {name}
        </h4>
        <p className="text-sm sm:text-base w-full max-w-52 truncate text-ellipsis">
          Today, 10AM
        </p>
      </div>
    </ChatItemWrapper>
  );
};

export default StoryItem;
