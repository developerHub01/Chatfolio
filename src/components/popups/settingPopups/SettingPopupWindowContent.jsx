import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { buttonDataList } from "../../../utils/settingButtonDataList.js";
import { ScrollShadow } from "@nextui-org/react";

const ChatsSection = lazy(() =>
  import("../../specific/setting/ChatsSection.jsx")
);
const NotificationSection = lazy(() =>
  import("../../specific/setting/NotificationSection.jsx")
);
const PersonalizationSection = lazy(() =>
  import("../../specific/setting/PersonalizationSection.jsx")
);
const ProfileSection = lazy(() =>
  import("../../specific/setting/ProfileSection.jsx")
);

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
      return <ChatsSection />;
    case "video":
      return <>Video</>;
    case "notifications":
      return <NotificationSection />;
    case "personalization":
      return <PersonalizationSection />;
    case "storage":
      return <>Storage</>;
    case "help":
      return <>Help</>;
    case "profile":
      return <ProfileSection />;
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
      <h3 className="text-center justify-center items-center text-xl sm:text-2xl font-bold capitalize p-1 text-foreground-100 select-none">
        {activText}
      </h3>
      <ScrollShadow hideScrollBar className="w-full h-full p-2 pb-3" size={5}>
        <Content />
      </ScrollShadow>
    </div>
  );
};

export default SettingPopupWindowContent;
