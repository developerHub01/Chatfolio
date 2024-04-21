import { ScrollShadow } from "@nextui-org/react";
import React, { memo } from "react";

const ListContainer = ({ children }) => {
  return (
    <ScrollShadow className="w-full h-full flex flex-col gap-2">
      {children}
    </ScrollShadow>
  );
};

export default memo(ListContainer);
