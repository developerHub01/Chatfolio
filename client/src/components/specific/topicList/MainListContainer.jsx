import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import ChatListLoader from "../../loaders/ChatListLoader";

const ChatListContainer = lazy(() => import("./ChatListContainer"));
const CallListContainer = lazy(() => import("./CallListContainer"));
const ArchivedChatListContainer = lazy(() =>
  import("./ArchivedChatListContainer")
);
const StoryListContainer = lazy(() => import("./StoryListContainer"));
const SavedChatListContainer = lazy(() => import("./SavedChatListContainer"));

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
    <Suspense fallback={<ChatListLoader />}>
      <div className="h-screen flex flex-col p-3 gap-4 bg-foreground-50">
        <Content />
      </div>
    </Suspense>
  );
};

export default MainListContainer;
