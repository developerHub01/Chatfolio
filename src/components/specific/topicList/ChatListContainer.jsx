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

const chatItemList = [
  {
    id: "1",
    fullName: "Mr. Harold Williamson",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: "2",
    fullName: "Dr. Eduardo Windler",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc077l8bsEiMg0sud-pNCAPw7m0rj30tyr8L2lLWGq7P6NqsdJkXFVzEN_SvvQj7dNYmg&usqp=CAU",
  },
  {
    id: "3",
    fullName: "Mr. Elinor Haley",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: "4",
    fullName: "Mr. Margot Mayer",
    avatar:
      "https://images.unsplash.com/photo-1611178206041-54d5e075be45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: "5",
    fullName: "Mr. Sarai Hand",
    avatar:
      "https://plus.unsplash.com/premium_photo-1682144187125-b55e638cf286?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: "6",
    fullName: "Dr. Gillian Marks",
    avatar:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: "7",
    fullName: "Dr. Dorcas Upton",
    avatar:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: "8",
    fullName: "Mr. Emory Strosin",
    avatar:
      "https://images.unsplash.com/photo-1584984647264-7e6f4e6d6b91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: "9",
    fullName: "Mr. Bella Wiegand",
    avatar: "https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1",
  },
  {
    id: "10",
    fullName: "Mr. Chadrick Douglas",
    avatar:
      "https://images.unsplash.com/photo-1616273313747-cb6841ac108d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww6",
  },
];

const ChatListContainer = () => {
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
        {chatItemList.map((item, key) => (
          <ChatItem key={key} {...item} />
        ))}
      </ListContainer>
      {position && <ContextMenu menuItems={menuItems} />}
    </>
  );
};

export default ChatListContainer;
