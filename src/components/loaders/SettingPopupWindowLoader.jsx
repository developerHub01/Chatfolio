import { Skeleton } from "@nextui-org/react";
import React, { memo } from "react";

const SettingPopupWindowContent = () => {
  return (
    <div className="w-[70vw] h-[80vh] max-w-md max-h-[550px] overflow-hidden bg-foreground-50 text-foreground-500 flex flex-col p-3">
      <div className="overflow-hidden">
        <Skeleton className="absolute top-2 left-2 size-10 rounded-md flex-shrink-0 flex-grow-0" />
        <div className="w-full overflow-auto flex flex-col justify-center items-center gap-4">
          <Skeleton className="size-32 rounded-full" />
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            <Skeleton className="w-[80%] rounded-full h-6" />
            <Skeleton className="w-[90%] rounded-full h-3" />
            <Skeleton className="w-[90%] rounded-full h-3" />
            <div className="flex justify-center items-center flex-wrap gap-2 pt-4">
              {Array(4)
                .fill(0)
                .map((_, key) => (
                  <Skeleton key={key} className="size-10 rounded-full" />
                ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            {Array(5)
              .fill(0)
              .map((_, key) => (
                <div
                  key={key}
                  className="w-full flex flex-col sm:flex-row justify-between gap-2"
                >
                  <div className="w-full flex flex-col gap-2 flex-1">
                    <Skeleton className="w-[80%] rounded-full h-6" />
                    <Skeleton className="w-[90%] rounded-full h-3" />
                  </div>
                  <Skeleton className="w-24 h-9 flex-shrink-0 rounded-full" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SettingPopupWindowContent);
