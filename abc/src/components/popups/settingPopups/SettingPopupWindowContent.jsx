import React from "react";
import { useSelector } from "react-redux";
import Profile from "../../specific/setting/Profile";
import Personalization from "../../specific/setting/Personalization";
import { buttonDataList } from "../../../utils/settingButtonDataList.js";

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
    <div className="w-full h-full p-4 overflow-hidden">
      <h3 className="text-center justify-center items-center text-2xl font-bold capitalize p-1">
        {activText}
      </h3>
      <div className="w-full h-full px-2 py-5 overflow-y-auto p-5">
        <Content />
      </div>
    </div>
  );
};

export default SettingPopupWindowContent;
