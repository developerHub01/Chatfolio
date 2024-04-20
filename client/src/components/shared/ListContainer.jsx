import { ScrollShadow } from "@nextui-org/react";
import React from "react";

const ListContainer = ({ children }) => {
  return (
    <ScrollShadow className="w-full h-full flex flex-col gap-2">
      {children}
    </ScrollShadow>
  );
};

export default ListContainer;
