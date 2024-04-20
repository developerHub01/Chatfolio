import React, { memo } from "react";
import ChatListLoader from "./ChatListLoader";
import SidebarLoader from "./SidebarLoader";
import ChatBoxLoader from "./ChatBoxLoader";

const LayoutLoader = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-foreground-50">
      <SidebarLoader />

      <div className="w-full h-full grid grid-cols-12 divide-x-2 divide-white/5">
        <div className="w-full col-span-full md:col-span-5 lg:col-span-4">
          <ChatListLoader />
        </div>
        <div className="w-full hidden md:block md:col-span-7 lg:col-span-8">
          <ChatBoxLoader />
        </div>
      </div>
    </div>
  );
};

export default memo(LayoutLoader);
