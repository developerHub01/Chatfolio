import React, { useCallback, useEffect, useState } from "react";
import MainListContainerHeader from "../../shared/MainListContainerHeader";
import ListContainer from "../../shared/ListContainer";
import ChatItem from "../../shared/ChatItem";
import NewChatPopupWindow from "../../popups/newChat/NewChatPopupWindow";
import FilterChatPopupWindow from "../../popups/filterChat/FilterChatPopupWindow";

import ContextMenu from "../../shared/ContextMenu";
import { useSelector } from "react-redux";
import { ArchivedIcon, EditIcon, FilterIcon } from "../../../constants/icons";
import useAuthGet from "../../../hooks/useAuthGet";
import axios from "axios";
import {
  ARCHIVED_CHAT_LIST_API,
  UNARCHIVED_CHAT_LIST_API,
} from "../../../constants/values";

const menuItems = [
  {
    id: "cut",
    Icon: ArchivedIcon,
    text: "Cut",
    onClick: () => {},
  },
  {
    id: "copy",
    Icon: ArchivedIcon,
    text: "Copy",
    onClick: () => {},
  },
  {
    id: "paste",
    Icon: ArchivedIcon,
    text: "Paste",
    onClick: () => {},
  },
];

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

const ChatListContainer = ({ isArchived = false, heading = "Chats" }) => {
  const { position } = useSelector((state) => state.uiStates.contextMenu);
  const [chatList, setChatList] = useState([]);
  const getMethod = useAuthGet();

  const URL = isArchived ? ARCHIVED_CHAT_LIST_API : UNARCHIVED_CHAT_LIST_API;
  console.log(URL);

  const getChatList = useCallback(async () => {
    const { success, error, data } = await getMethod(URL);

    if (!success) console.log(error.message);

    setChatList((prev) => data);
  }, [URL]);

  useEffect(() => {
    getChatList();
  }, [isArchived]);

  return (
    <>
      <MainListContainerHeader buttonList={buttonList} headingText={heading} />
      <ListContainer>
        {chatList.map(
          (
            {
              _id,
              isArchived,
              chatType,
              admin: { avatar, email, fullName, userName },
              lastMessage,
              lastMessageUserId,
              lastMessageUserName,
            },
            i
          ) => {
            const chatData = {
              _id,
              isArchived,
              chatType,
              avatar,
              email,
              fullName,
              lastMessage,
              lastMessageUserId,
              lastMessageUserName,
            };
            return <ChatItem key={_id || i} {...chatData} />;
          }
        )}
      </ListContainer>
      {/* {position && <ContextMenu menuItems={menuItems} />} */}
    </>
  );
};

export default ChatListContainer;
