import React, { Suspense, lazy, memo } from "react";
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
      return (
        <Suspense fallback={<ChatListLoader />}>
          <ChatListContainer />
        </Suspense>
      );
    case "call":
      return (
        <Suspense fallback={<ChatListLoader />}>
          <CallListContainer />
        </Suspense>
      );
    case "story":
      return (
        <Suspense fallback={<ChatListLoader />}>
          <StoryListContainer />
        </Suspense>
      );
    case "save":
      return (
        <Suspense fallback={<ChatListLoader />}>
          <SavedChatListContainer />
        </Suspense>
      );
    case "archivedChats":
      return (
        <Suspense fallback={<ChatListLoader />}>
          <ArchivedChatListContainer />
        </Suspense>
      );
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

export default memo(MainListContainer);
