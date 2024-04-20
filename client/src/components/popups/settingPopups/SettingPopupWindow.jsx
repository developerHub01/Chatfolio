import { Suspense, memo } from "react";
import { LuLaptop as GeneralIcon } from "react-icons/lu";
import {
  IoChatboxEllipsesOutline as ChatIcon,
  IoNotifications as NotificationIcon,
  IoHelp as HelpIcon,
} from "react-icons/io5";
import { FiVideo as VideoIcon } from "react-icons/fi";
import { MdOutlineEdit as PersonalizationIcon } from "react-icons/md";
import { GrStorage as StorageIcon } from "react-icons/gr";
import { FaRegKeyboard as ShortCutsIcon } from "react-icons/fa6";
import { RxAvatar as ProfileIcon } from "react-icons/rx";
import SettingPopupWindowMenu from "./SettingPopupWindowMenu";
import SettingPopupWindowContent from "./SettingPopupWindowContent";
import SettingPopupWindowLoader from "../../loaders/SettingPopupWindowLoader";

const buttonDataList = [
  {
    text: "general",
    Icon: <GeneralIcon />,
  },
  {
    text: "account",
    Icon: <ProfileIcon />,
  },
  {
    text: "chats",
    Icon: <ChatIcon />,
  },
  {
    text: "video & voice",
    Icon: <VideoIcon />,
  },
  {
    text: "notifications",
    Icon: <NotificationIcon />,
  },
  {
    text: "personalization",
    Icon: <PersonalizationIcon />,
  },
  {
    text: "storage",
    Icon: <StorageIcon />,
  },
  {
    text: "shortcuts",
    Icon: <ShortCutsIcon />,
  },
  {
    text: "help",
    Icon: <HelpIcon />,
  },
  {
    text: "Profile",
    Icon: <ProfileIcon />,
  },
];

const BigPopupWindow = () => {
  return (
    <Suspense fallback={<SettingPopupWindowLoader />}>
      <div className="w-[70vw] h-[80vh] max-w-md max-h-[550px] overflow-hidden bg-foreground-50 text-foreground-500">
        <SettingPopupWindowMenu buttonDataList={buttonDataList} />
        <SettingPopupWindowContent />
      </div>
    </Suspense>
  );
};

export default memo(BigPopupWindow);
