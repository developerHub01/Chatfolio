import { Button, Input, Skeleton } from "@nextui-org/react";
import React, { memo } from "react";

const LoginRegisterLoader = () => {
  return (
    <div className="w-screen h-screen !overflow-hidden p-5 flex justify-center items-center flex-col">
      <div className="absolute h-[150vh] w-[400px] flex gap-11 -skew-x-[30deg]">
        {Array(3)
          .fill(0)
          .map((_, key) => (
            <Skeleton key={key} className="w-full h-full shadow-2xl" />
          ))}
      </div>
      <div className="w-full max-w-md max-h-[90vh] flex flex-col justify-center items-center gap-4 text-foreground-300 shadow-2xl px-4 sm:px-5 py-6 sm:py-8 rounded-md bg-background-900 backdrop-blur-xl overflow-hidden">
        <div className="w-full h-14 overflow-hidden flex flex-col justify-center items-center">
          <Skeleton className="w-full max-w-60 h-14 rounded-md" />
        </div>
        <form className="p-1 w-full flex-1 overflow-hidden flex flex-col gap-4">
          {Array(2)
            .fill(0)
            .map((_, key) => (
              <Skeleton key={key} className="w-full h-12 rounded-md" />
            ))}
          <Skeleton className="w-full h-10 rounded-md" />
          <div className="w-full flex justify-between items-center gap-2 flex-wrap">
            <Skeleton className="w-full max-w-40 h-10 rounded-md" />
            <Skeleton className="w-full max-w-24 h-10 rounded-md" />
          </div>
        </form>
        <div className="w-full flex justify-between items-center gap-2 flex-col sm:flex-row">
          {Array(2)
            .fill(0)
            .map((_, key) => (
              <Skeleton key={key} className="w-full h-10 rounded-md" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(LoginRegisterLoader);
