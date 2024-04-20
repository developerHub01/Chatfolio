import React from "react";
import ChatItem from "../../shared/ChatItem";
import ListContainer from "../../shared/ListContainer";
import MainListContainerHeader from "../../shared/MainListContainerHeader";

const ArchivedChatListContainer = () => {
  return (
    <>
      <MainListContainerHeader headingText="Archived Chats" />
      <ListContainer>
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        {Array(20)
          .fill(0)
          .map((item, key) => (
            <ChatItem key={key} />
          ))}
      </ListContainer>
    </>
  );
};

export default ArchivedChatListContainer;
