import React, { memo } from "react";
import ChatBoxTopLoader from "./ChatBoxTopLoader";
import ChatBoxChatLoader from "./ChatBoxChatLoader";
import ChatBoxInputLoader from "./ChatBoxInputLoader";

const ChatBoxLoader = () => {
  return (
    <div className="hidden h-screen w-full md:flex flex-col px-3 divide-y-2 divide-white/5">
      <ChatBoxTopLoader />
      <ChatBoxChatLoader />
      <ChatBoxInputLoader />
    </div>
  );
};

export default memo(ChatBoxLoader);
