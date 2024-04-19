import { Divider, Skeleton, Spacer } from "@nextui-org/react";
import React from "react";

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
  <div className="h-fll w-12 p-2 flex flex-shrink-0 flex-grow-0 flex-col justify-between items-center">
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
  <div className="w-full flex-grow flex-shrink sm:w-[300px] md:w-[350px] h-full sm:flex-grow-0 sm:flex-shrink-0 flex-col gap-2 justify-start items-center overflow-hidden">
    {Array(10)
      .fill(0)
      .map((_, key) => (
        <React.Fragment key={key}>
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
          <Divider orientation="horizontal" className="" />
        </React.Fragment>
      ))}
  </div>
);

const ChatBoxTopSkeleton = () => (
  <>
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
    <Divider orientation="horizontal" className="" />
    <Spacer x={1} />
  </>
);
const ChatBoxChatSkeleton = () => (
  <div className="w-full overflow-hidden flex justify-end items-end h-full flex-1">
    <div className="w-full flex flex-col gap-2">
      {Array(20)
        .fill(0)
        .map((_, key) => {
          const height = Math.round(1 + Math.random() * 2) * 35;
          const direction = !!(Math.round(Math.random() * 100) % 2);
          console.log(height, direction);
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
  <>
    <Spacer x={1} />
    <Divider orientation="horizontal" className="" />
    <div className="w-full h-16 py-3 flex gap-2">
      <Skeleton className="w-14 h-full rounded-md" />
      <Skeleton className="w-full h-full rounded-full" />
      <Skeleton className="w-10 h-full rounded-md" />
      <Skeleton className="w-10 h-full rounded-md" />
    </div>
  </>
);

const ChatBoxSkeleton = () => (
  <div className="hidden h-full w-full sm:flex flex-col px-3">
    <ChatBoxTopSkeleton />
    <ChatBoxChatSkeleton />
    <ChatBoxInputSkeleton />
  </div>
);

const LayoutLoader = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-foreground-50">
      <SidebarSkeleton />
      <Divider orientation="vertical" className="" />
      <Spacer x={1} />
      <div className="w-full h-full flex">
        <ChatListSkeleton />
        <Spacer x={1} className="hidden sm:block" />
        <Divider orientation="vertical" className="hidden sm:block" />
        <Spacer x={1} className="hidden sm:block" />
        <ChatBoxSkeleton />
      </div>
    </div>
  );
};

export default LayoutLoader;
