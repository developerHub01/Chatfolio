import React from "react";

const ChatItemWrapper = ({ children, ...props }) => {
  return (
    <div
      className="w-full flex items-center gap-3 sm:gap-4 p-3 bg-foreground-50 select-none cursor-pointer hover:bg-primary-50 rounded-lg md:rounded-xl border-b-2 border-foreground-100"
      {...props}
    >
      {children}
    </div>
  );
};

export default ChatItemWrapper;
