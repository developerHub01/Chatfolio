import React, { lazy } from "react";
import { useSelector } from "react-redux";
import Personalization from "../../specific/setting/Personalization";
import { buttonDataList } from "../../../utils/settingButtonDataList.js";

const Profile = lazy(() => import("../../specific/setting/Profile"));

const Content = () => {
  const { activeOption } = useSelector(
    (state) => state.uiStates.settingOptions
  );
  switch (activeOption) {
    case "general":
      return <>General</>;
    case "account":
      return <>Account</>;
    case "chats":
      return <>Chats</>;
    case "video":
      return <>Video</>;
    case "notifications":
      return <>Notifications</>;
    case "personalization":
      return <Personalization />;
    case "storage":
      return <>Storage</>;
    case "shortcuts":
      return <>Shortcuts</>;
    case "help":
      return <>Help</>;
    case "profile":
      return <Profile />;
    default:
      return <></>;
  }
};

const SettingPopupWindowContent = () => {
  const { activeOption } = useSelector(
    (state) => state.uiStates.settingOptions
  );

  const { text: activText } = buttonDataList.find(
    ({ id }) => id === activeOption
  );
  return (
    <div className="w-full h-full overflow-hidden p-3 flex flex-col gap-2">
      <h3 className="text-center justify-center items-center text-2xl font-bold capitalize p-1 text-foreground-100 select-none">
        {activText}
      </h3>
      <div className="w-full h-full overflow-y-auto p-2">
        <Content />
      </div>
    </div>
  );
};

export default SettingPopupWindowContent;
