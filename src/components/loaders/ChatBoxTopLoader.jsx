import { Skeleton } from "@nextui-org/react";
import React, { memo } from "react";

const ChatBoxTopLoader = () => {
  return (
    <div className="w-full flex gap-3 justify-start items-center py-3">
      <Skeleton className="size-14 rounded-full flex-grow-0 flex-shrink-0" />
      <div className="w-full flex flex-col gap-3">
        <Skeleton className="w-[90%] max-w-56 h-4 rounded-full" />
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-[90%] max-w-36 h-2 rounded-full" />
          <Skeleton className="w-[90%] max-w-40 h-1 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default memo(ChatBoxTopLoader);
