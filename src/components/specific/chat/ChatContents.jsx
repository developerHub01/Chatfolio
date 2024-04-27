import { ScrollShadow } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

const ChatContents = () => {
  const { message } = useSelector((state) => state.uiStates);
  return (
    <div className="w-full h-auto flex-1 overflow-hidden flex justify-center items-end py-1">
      <ScrollShadow hideScrollBar className="w-full h-full ">
        <p className="whitespace-pre">{message}</p>
      </ScrollShadow>
    </div>
  );
};

export default ChatContents;
