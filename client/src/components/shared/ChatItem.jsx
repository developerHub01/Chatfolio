import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import ChatAvatar from "./ChatAvatar";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useHover } from "@uidotdev/usehooks";
import { BsThreeDotsVertical as ThreeDotIcon } from "react-icons/bs";
import ChatMenuList from "./ChatMenuList";
import ContextMenu from "./ContextMenu";
import { useSelector } from "react-redux";

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
      <h4 className="text-base sm:text-lg font-bold truncate text-ellipsis">
        {name}
      </h4>
      <p className="text-sm sm:text-base w-full max-w-52 truncate text-ellipsis">
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
    <div className="flex flex-col justify-center items-end gap-2">
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
      <Dropdown placement="left">
        <DropdownTrigger>
          <Button isIconOnly size="sm">
            <ThreeDotIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const ChatItem = () => {
  const { activeTabId } = useSelector((state) => state.uiStates.sidebar);
  console.log(activeTabId);
  const isArchived = activeTabId === "archivedChats";
  return (
    <div className="flex flex-shrink-0 justify-between items-center gap-3 p-3 bg-foreground-50 select-none cursor-pointer hover:bg-primary-50 rounded-lg md:rounded-xl border-b-2 border-foreground-100">
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
    </div>
  );
};

export default ChatItem;
