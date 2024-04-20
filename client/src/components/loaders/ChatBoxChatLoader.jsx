import { Skeleton } from "@nextui-org/react";
import React, { memo } from "react";

const ChatBoxChatLoader = () => {
  return (
    <div className="w-full h-auto flex-1 overflow-hidden flex justify-center items-end pb-5">
      <div className="w-full flex flex-col gap-2">
        {Array(10)
          .fill(0)
          .map((_, key) => {
            const height = Math.round(1 + Math.random() * 2) * 35;
            const direction = !!(Math.round(Math.random() * 100) % 2);
            return (
              <Skeleton
                key={key}
                className="w-96 h-5 flex-grow-0 flex-shrink-0 rounded-xl"
                style={{
                  width: "",
                  height: `${height}px`,
                  alignSelf: direction ? "flex-start" : "flex-end",
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default memo(ChatBoxChatLoader);
