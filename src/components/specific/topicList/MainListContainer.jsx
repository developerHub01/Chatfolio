import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import ChatListLoader from "../../loaders/ChatListLoader";

const ChatListContainer = lazy(() => import("./ChatListContainer"));
const CallListContainer = lazy(() => import("./CallListContainer"));
const StoryListContainer = lazy(() => import("./StoryListContainer"));
const GroupListContainer = lazy(() => import("./GroupListContainer"));

const Content = () => {
  const { activeTabId } = useSelector((state) => state.uiStates.sidebar);
  switch (activeTabId) {
    case "chat":
      return <ChatListContainer isArchived={false} heading="Chats" />;
    case "call":
      return <CallListContainer />;
    case "story":
      return <StoryListContainer />;
    case "group":
      return <GroupListContainer />;
    case "archivedChats":
      return <ChatListContainer isArchived={true} heading="Archived" />;
    default:
      return <></>;
  }
};

const MainListContainer = () => {
  return (
    <Suspense fallback={<ChatListLoader />}>
      <div className="h-screen flex flex-col p-3 gap-4">
        <Content />
      </div>
    </Suspense>
  );
};

export default MainListContainer;
