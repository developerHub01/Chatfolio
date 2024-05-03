import React, { useState } from "react";
import MainListContainerHeader from "../../shared/MainListContainerHeader";
import ListContainer from "../../shared/ListContainer";
import ChatItem from "../../shared/ChatItem";
import NewChatPopupWindow from "../../popups/newChat/NewChatPopupWindow";
import FilterChatPopupWindow from "../../popups/filterChat/FilterChatPopupWindow";

import ContextMenu from "../../shared/ContextMenu";
import { useSelector } from "react-redux";
import { ArchivedIcon, EditIcon, FilterIcon } from "../../../constants/icons";

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

const GroupListContainer = () => {
  const { position } = useSelector((state) => state.uiStates.contextMenu);
  const [test, setTest] = useState(
    Array(20)
      .fill(0)
      .map((curr, i) => curr + i)
  );
  return (
    <>
      <MainListContainerHeader buttonList={buttonList} headingText="Chats" />
      <ListContainer>
        {test.map((item, key) => (
          <ChatItem key={key} chatId={item} />
        ))}
      </ListContainer>
      {position && <ContextMenu menuItems={menuItems} />}
    </>
  );
};

export default GroupListContainer;
