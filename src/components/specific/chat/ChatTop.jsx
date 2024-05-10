import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import React from "react";
import ChatAvatar from "../../shared/ChatAvatar";
import IconButton from "../../shared/IconButton";
import {
  CallIcon,
  InfoIcon,
  LeftArrowIcon,
  SearchIcon,
} from "../../../constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatState } from "../../../redux/slices/activeChatSlice";

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
  const { activeChat } = useSelector((state) => state.activeChatStates);
  console.log(activeChat);
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(setActiveChatState());
  };
  const { fullName, avatar, name: chatName } = activeChat || {};
  return (
    <div className="flex justify-start items-center gap-3 flex-1">
      <Button
        isIconOnly
        variant="light"
        size="sm"
        radius="full"
        color="primary"
        onClick={handleBack}
      >
        <LeftArrowIcon className="text-xl" />
      </Button>
      <ChatAvatar
        size="15"
        src={avatar}
        name={fullName || chatName}
        isActive={false}
      />
      <div className="w-full flex-1 overflow-hidden flex flex-col">
        <h3
          className="h3"
          style={{
            textTransform: "capitalize",
          }}
        >
          {fullName || chatName}
        </h3>
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
    <div className="w-full flex gap-3 justify-between items-center p-3 border-b-4 border-background-800">
      <ChatLeft />
      <ChatRight />
    </div>
  );
};

export default ChatTop;
