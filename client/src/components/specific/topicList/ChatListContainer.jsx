import React, { memo } from "react";
import MainListContainerHeader from "../../shared/MainListContainerHeader";
import ListContainer from "../../shared/ListContainer";
import ChatItem from "../../shared/ChatItem";
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { VscListFilter as FilterIcon } from "react-icons/vsc";
import NewChatPopupWindow from "../../popups/newChat/NewChatPopupWindow";
import FilterChatPopupWindow from "../../popups/filterChat/FilterChatPopupWindow";

const buttonList = [
  {
    id: "newChat",
    Icon: EditIcon,
    PopupComponent: NewChatPopupWindow,
  },
  {
    id: "filter",
    Icon: FilterIcon,
    PopupComponent: FilterChatPopupWindow,
  },
];

const ChatListContainer = () => {
  return (
    <>
      <MainListContainerHeader buttonList={buttonList} headingText="Chats" />
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

export default memo(ChatListContainer);
