import { Skeleton } from "@nextui-org/react";
import React, { memo } from "react";

const ChatBoxInputLoader = () => {
  return (
    <div className="w-full h-14 py-3 flex gap-2">
      <Skeleton className="w-14 h-full rounded-md" />
      <Skeleton className="w-full h-full rounded-full" />
      <Skeleton className="w-10 h-full rounded-md" />
      <Skeleton className="w-10 h-full rounded-md" />
    </div>
  );
};

export default memo(ChatBoxInputLoader);
