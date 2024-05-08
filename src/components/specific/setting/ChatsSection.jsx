import React, { Suspense } from "react";
import SettingPopupWindowLoader from "../../loaders/SettingPopupWindowLoader";
import { Button } from "@nextui-org/react";

const ButtonWithDescription = ({ id, text, description, onClick }) => {
  return (
    <div className="w-full flex flex-col gap-3 items-start">
      <Button
        onClick={onClick}
        size="md"
        radius="sm"
        variant="solid"
        color="primary"
        className="shadow-md"
      >
        {text}
      </Button>
      <p className="text-foreground-300 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const ChatsSection = () => {
  const buttonList = [
    {
      id: "archiveAllChats",
      text: "Archive all chats",
      description: "You will still receive new messages from archived chats",
      onClick: () => {},
    },
    {
      id: "clearAllMessages",
      text: "Clear all chats",
      description: "Delete all messages from the chats and groups",
      onClick: () => {},
    },
    {
      id: "deleteAllChats",
      text: "Delete all chats",
      description:
        "Delete all messages and clear the the chats from your history",
      onClick: () => {},
    },
  ];
  return (
    <Suspense fallback={<SettingPopupWindowLoader />}>
      <div className="w-full flex flex-col justify-center items-center gap-2 sm:gap-4">
        {buttonList.map((item) => (
          <ButtonWithDescription key={item.id} {...item} />
        ))}
      </div>
    </Suspense>
  );
};

export default ChatsSection;
