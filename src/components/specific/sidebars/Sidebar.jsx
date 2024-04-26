import {
  buttonListBottom,
  buttonListTop,
} from "../../../utils/sidebarButtonDataList";
import SidebarButtonListWrapper from "./SidebarButtonListWrapper";
import { memo } from "react";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-grow-0 flex-shrink-0 overflow-y-auto flex-col p-2 gap-5 justify-between item-center shadow-2xl border-r-4 border-background-800">
      <SidebarButtonListWrapper buttonList={buttonListTop} />
      <SidebarButtonListWrapper buttonList={buttonListBottom} />
    </div>
  );
};

export default memo(Sidebar);
