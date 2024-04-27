import { ScrollShadow } from "@nextui-org/react";
import {
  buttonListBottom,
  buttonListTop,
} from "../../../utils/sidebarButtonDataList";
import SidebarButtonListWrapper from "./SidebarButtonListWrapper";
import { memo } from "react";

const Sidebar = () => {
  return (
    <ScrollShadow
      hideScrollBar
      className="h-full flex flex-grow-0 flex-shrink-0 flex-col p-2 gap-5 justify-between item-center shadow-2xl border-r-4 border-background-800"
      size={10}
    >
      <SidebarButtonListWrapper buttonList={buttonListTop} />
      <SidebarButtonListWrapper buttonList={buttonListBottom} />
    </ScrollShadow>
  );
};

export default memo(Sidebar);
