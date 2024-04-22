import { Skeleton } from "@nextui-org/react";
import React, { memo } from "react";

const RandomSkeleton = ({ height, total = 100 }) => (
  <div
    className={`${height}`}
    style={{
      width: `${Math.floor(30 + Math.random() * (total - 30))}%`,
    }}
  >
    <Skeleton className="rounded-full w-full h-full" />
  </div>
);

const ChatListLoader = ({ numberOfChat = 20 }) => {
  return (
    <div className="w-full flex-grow flex-shrink h-full sm:flex-grow-0 sm:flex-shrink-0 flex-col gap-2 justify-start items-center overflow-hidden divide-y-2 divide-white/5 bg-foreground-50">
      <div className="flex justify-between items-center p-3 gap-2">
        <Skeleton className="w-20 h-10 rounded-md" />
        <Skeleton className="w-full h-10 rounded-md flex-1" />
      </div>
      <div className="flex flex-col divide-y-2 divide-white/5">
        {Array(numberOfChat)
          .fill(0)
          .map((_, key) => (
            <div
              key={key}
              className="w-full p-2 flex gap-2 justify-start items-center"
            >
              <Skeleton className="size-16 rounded-full flex-shrink-0 flex-grow-0" />
              <div className="w-full flex flex-col gap-4">
                <RandomSkeleton height={"h-4"} />
                <div className="w-full flex flex-col gap-1">
                  <RandomSkeleton height={"h-2"} />
                  <RandomSkeleton height={"h-2"} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(ChatListLoader);
