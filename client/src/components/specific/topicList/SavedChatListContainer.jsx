import React, { memo } from "react";
import ChatItem from "../../shared/ChatItem";
import ListContainer from "../../shared/ListContainer";
import MainListContainerHeader from "../../shared/MainListContainerHeader";

const SavedChatListContainer = () => {
  return (
    <>
      <MainListContainerHeader headingText="Saved messages" />
      <ListContainer>
        {Array(20)
          .fill(0)
          .map((item, key) => (
            <ChatItem key={key} />
          ))}
      </ListContainer>
    </>
  );
};

export default memo(SavedChatListContainer);
