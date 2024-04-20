import React from "react";
import { useSelector } from "react-redux";
import ChatListContainer from "./ChatListContainer";
import CallListContainer from "./CallListContainer";
import ArchivedChatListContainer from "./ArchivedChatListContainer";
import StoryListContainer from "./StoryListContainer";
import SavedChatListContainer from "./SavedChatListContainer";

const Content = () => {
  const { activeTabId } = useSelector((state) => state.uiStates.sidebar);
  switch (activeTabId) {
    case "chat":
      return <ChatListContainer />;
    case "call":
      return <CallListContainer />;
    case "story":
      return <StoryListContainer />;
    case "save":
      return <SavedChatListContainer />;
    case "archivedChats":
      return <ArchivedChatListContainer />;
    default:
      return <></>;
  }
};

const MainListContainer = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col p-3 gap-4 bg-foreground-50">
      <Content />
    </div>
  );
};

export default MainListContainer;
