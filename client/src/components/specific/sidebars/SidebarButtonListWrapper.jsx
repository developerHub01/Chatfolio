import { memo } from "react";
import SidebarIconButton from "./SidebarIconButton";

const SidebarButtonListWrapper = ({ buttonList }) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      {buttonList.map((item, index) => (
        <SidebarIconButton key={item.id} {...item} />
      ))}
    </div>
  );
};

export default memo(SidebarButtonListWrapper);
