import { Skeleton } from "@nextui-org/react";
import React, { memo } from "react";

const SidebarLoader = () => {
  return (
    <div className="h-fll w-12 p-2 px-3 flex flex-shrink-0 flex-grow-0 flex-col justify-between items-center border-r-2 border-white/5  bg-foreground-50">
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
};

export default memo(SidebarLoader);
