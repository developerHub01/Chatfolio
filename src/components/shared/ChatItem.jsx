import React, { useState, useRef, lazy } from "react";
import ChatAvatar from "./ChatAvatar";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { BsThreeDotsVertical as ThreeDotIcon } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import ChatItemWrapper from "./ChatItemWrapper";
import { openContextMenu } from "../../redux/slices/uiStatesSlice";
import { motion } from "framer-motion";

const myUserId = "1";

const ChatInfo = ({
  name,
  lastMessage = "",
  lastMessageAuthorId = "1",
  lastMessageAuthorName = "John Doe",
  isGroup = false,
}) => {
  return (
    <div className="w-full flex-1 overflow-hidden flex flex-col gap-1">
      <h3 className="h3">{name}</h3>
      <p className="text max-w-52">
        {isGroup && (
          <span className="pr-1">
            {myUserId === lastMessageAuthorId ? "You" : lastMessageAuthorName}:
          </span>
        )}
        {lastMessage}
      </p>
    </div>
  );
};

const ChatTimeInfo = ({ time = "20/04/24", isArchived = false }) => {
  return (
    <div className="flex flex-col justify-center items-end gap-2 text-foreground-300">
      <p className="text-xs sm:text-sm">{time}</p>
      {isArchived && (
        <Chip color="primary" variant="faded" size="sm">
          Archived
        </Chip>
      )}
    </div>
  );
};

const ChatItemThreeDot = () => {
  return (
    <div className="block md:hidden">
      {/* <ChatMenuList /> */}
      <Dropdown
        placement="left"
        className="bg-background-900"
        classNames={{
          content:
            "bg-background-900 dark:bg-background-500 text-foreground-50",
        }}
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            radius="full"
            className="group bg-transparent hover:text-white relative"
          >
            <span className="absolute w-full h-full bg-primary-500 rounded-full z-0 scale-0 group-hover:scale-100 transition-all duration-75 opacity-0 group-hover:opacity-100"></span>
            <ThreeDotIcon className="text-base relative z-10" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          classNames={{
            content: "bg-red-500",
          }}
        >
          <DropdownItem color="primary" key="new1">
            New file
          </DropdownItem>
          <DropdownItem color="primary" key="new2">
            New file
          </DropdownItem>
          <DropdownItem color="primary" key="new3">
            New file
          </DropdownItem>
          <DropdownItem color="primary" key="new4">
            New file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const ChatItem = ({ chatId }) => {
  const { activeTabId } = useSelector((state) => state.uiStates.sidebar);
  const { position } = useSelector((state) => state.uiStates.contextMenu);
  const dispatch = useDispatch();
  const isArchived = activeTabId === "archivedChats";

  const handleContextMenu = (e) => {
    const { clientX, clientY } = e;
    dispatch(
      openContextMenu({
        position: { clientX, clientY },
        contextData: {
          id: chatId,
        },
      })
    );
  };
  return (
    <ChatItemWrapper onContextMenu={handleContextMenu}>
      <ChatAvatar />
      <ChatInfo
        name="Name one"
        lastMessage="Hello"
        lastMessageAuthorId="1"
        lastMessageAuthorName="John Doe"
        isGroup
      />
      <ChatTimeInfo isArchived={isArchived} />
      <span className="block md:hidden">
        <ChatItemThreeDot />
      </span>
    </ChatItemWrapper>
  );
};

export default ChatItem;
