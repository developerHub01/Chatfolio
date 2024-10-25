import React, { memo } from "react";
import ChatAvatar from "./ChatAvatar";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import ChatItemWrapper from "./ChatItemWrapper";
import { openContextMenu } from "../../redux/slices/uiStatesSlice";
import { ThreeDotIcon } from "../../constants/icons";

const ChatInfo = memo(
  ({
    name,
    lastMessage = "",
    lastMessageAuthorId,
    lastMessageAuthorName = "John Doe",
    isGroup = false,
  }) => {
    const { _id: myUserId } =
      useSelector((state) => state.authStates.user) || {};
    return (
      <div className="w-full flex-1 overflow-hidden flex flex-col gap-1">
        <h3 className="h3 capitalize">{name}</h3>
        <p className="text max-w-52">
          {isGroup && (
            <span className="pr-1">
              {myUserId === lastMessageAuthorId ? "You" : lastMessageAuthorName}
              :
            </span>
          )}
          {lastMessage}
        </p>
      </div>
    );
  }
);

const ChatTimeInfo = memo(({ time = "20/04/24", isArchived = false }) => {
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
});

const ChatItemThreeDot = memo(() => {
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
});

const ChatItem = memo(
  ({
    id,
    fullName,
    avatar,
    isArchived,
    lastMessage,
    lastMessageUserId,
    lastMessageUserName,
  }) => {
    // const {} = props;
    const { activeTabId } = useSelector((state) => state.uiStates.sidebar);
    const { position } = useSelector((state) => state.uiStates.contextMenu);
    const dispatch = useDispatch();
    // const isArchived = activeTabId === "archivedChats";

    const handleContextMenu = (e) => {
      const { clientX, clientY } = e;
      dispatch(
        openContextMenu({
          position: { clientX, clientY },
          contextData: {
            id,
          },
        })
      );
    };
    return (
      <ChatItemWrapper id={id} onContextMenu={handleContextMenu}>
        <ChatAvatar src={avatar} />
        <ChatInfo
          name={fullName}
          lastMessage={lastMessage}
          lastMessageAuthorId={lastMessageUserId}
          lastMessageAuthorName={lastMessageUserName}
          isGroup
        />
        <ChatTimeInfo isArchived={isArchived} />
        <span className="block md:hidden">
          <ChatItemThreeDot />
        </span>
      </ChatItemWrapper>
    );
  }
);

export default ChatItem;
