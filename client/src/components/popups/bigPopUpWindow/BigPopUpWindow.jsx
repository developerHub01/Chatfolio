import BigPopUpWindowContent from "./BigPopUpWindowContent";
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
import BigPopUpWindowMenu from "./BigPopUpWindowMenu";
import { memo } from "react";

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

const BigPopUpWindow = () => {
  return (
    <div className="w-[70vw] h-[80vh] max-w-md max-h-[550px] overflow-hidden">
      <BigPopUpWindowMenu buttonDataList={buttonDataList} />
      <BigPopUpWindowContent />
    </div>
  );
};

export default memo(BigPopUpWindow);
