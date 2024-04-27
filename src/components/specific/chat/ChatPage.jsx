import React from "react";
import ChatTop from "./ChatTop";
import ChatBottom from "./ChatBottom";
import ChatContents from "./ChatContents";

const ChatPage = () => {
  return (
    <section className="h-screen w-full md:flex flex-col px-3">
      <ChatTop />
      <ChatContents />
      <ChatBottom />
    </section>
  );
};

export default ChatPage;
