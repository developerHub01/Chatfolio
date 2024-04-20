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

const SidebarSkeleton = () => (
  <div className="h-fll w-12 p-2 px-3 flex flex-shrink-0 flex-grow-0 flex-col justify-between items-center border-r-2 border-white/5">
    <div className="flex flex-col gap-2 justify-center items-center">
      {Array(3)
        .fill(0)
        .map((_, key) => (
          <Skeleton key={key} className="w-10 h-10 rounded-full" />
        ))}
    </div>
    <div className="flex flex-col gap-2 justify-center items-center">
      {Array(4)
        .fill(0)
        .map((_, key) => (
          <Skeleton key={key} className="w-10 h-10 rounded-full" />
        ))}
    </div>
  </div>
);

const ChatListSkeleton = () => (
  <div className="w-full flex-grow flex-shrink h-full sm:flex-grow-0 sm:flex-shrink-0 flex-col gap-2 justify-start items-center overflow-hidden divide-y-2 divide-white/5">
    <div className="flex justify-between items-center p-3 gap-2">
      <Skeleton className="w-20 h-10 rounded-md" />
      <Skeleton className="w-full h-10 rounded-md flex-1" />
    </div>
    <div className="flex flex-col divide-y-2 divide-white/5">
      {Array(20)
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

const ChatBoxTopSkeleton = () => (
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
const ChatBoxChatSkeleton = () => (
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
const ChatBoxInputSkeleton = () => (
  <div className="w-full h-14 py-3 flex gap-2">
    <Skeleton className="w-14 h-full rounded-md" />
    <Skeleton className="w-full h-full rounded-full" />
    <Skeleton className="w-10 h-full rounded-md" />
    <Skeleton className="w-10 h-full rounded-md" />
  </div>
);

const ChatBoxSkeleton = () => (
  <div className="hidden h-screen w-full md:flex flex-col px-3 divide-y-2 divide-white/5">
    <ChatBoxTopSkeleton />
    <ChatBoxChatSkeleton />
    <ChatBoxInputSkeleton />
  </div>
);

const LayoutLoader = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-foreground-50">
      <SidebarSkeleton />

      <div className="w-full h-full grid grid-cols-12 divide-x-2 divide-white/5">
        <div className="w-full col-span-full md:col-span-5 lg:col-span-4">
          <ChatListSkeleton />
        </div>
        <div className="w-full hidden md:block md:col-span-7 lg:col-span-8">
          <ChatBoxSkeleton />
        </div>
      </div>
    </div>
  );
};

export default memo(LayoutLoader);
