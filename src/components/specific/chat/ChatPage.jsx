import React from "react";
import ChatTop from "./ChatTop";
import ChatBottom from "./ChatBottom";
import ChatContents from "./ChatContents";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { chatPageAnim } from "../../animation/animationList";

const ChatPage = () => {
  const { activeChat } = useSelector((state) => state.activeChatStates);
  return (
    <AnimatePresence>
      {!!activeChat && (
        <motion.section
          {...chatPageAnim}
          className="h-screen w-full flex flex-col"
        >
          <ChatTop />
          <ChatContents />
          <ChatBottom />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default ChatPage;
