import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import React from "react";
import { IoCallOutline as CallIcon } from "react-icons/io5";
import {
  IoMdSearch as SearchIcon,
  IoIosInformationCircle as InfoIcon,
} from "react-icons/io";
import ChatAvatar from "../../shared/ChatAvatar";
import IconButton from "../../shared/IconButton";

const buttonList = [
  {
    id: "call",
    text: "Call",
    Icon: CallIcon,
    onClick: () => {},
  },
  {
    id: "search",
    text: "Search",
    Icon: SearchIcon,
    onClick: () => {},
  },
  {
    id: "info",
    text: "Info",
    Icon: InfoIcon,
    onClick: () => {},
  },
];

const ChatLeft = () => {
  return (
    <div className="flex justify-start items-center gap-3 flex-1">
      <ChatAvatar size="15" />
      <div className="w-full flex-1 overflow-hidden flex flex-col">
        <h3 className="h3">Full Name</h3>
        <p className="text-sm max-w-52">Active</p>
      </div>
    </div>
  );
};
const ChatRight = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      {buttonList.map((item, _) => (
        <IconButton {...item} key={item.id} />
      ))}
    </div>
  );
};

const ChatTop = () => {
  return (
    <div className="w-full flex gap-3 justify-between items-center py-3 border-b-4">
      <ChatLeft />
      <ChatRight />
    </div>
  );
};

export default ChatTop;