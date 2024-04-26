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

export const buttonDataList = [
  {
    id: "general",
    text: "general",
    Icon: GeneralIcon,
  },
  {
    id: "account",
    text: "account",
    Icon: ProfileIcon,
  },
  {
    id: "chats",
    text: "chats",
    Icon: ChatIcon,
  },
  {
    id: "video",
    text: "video & voice",
    Icon: VideoIcon,
  },
  {
    id: "notifications",
    text: "notifications",
    Icon: NotificationIcon,
  },
  {
    id: "personalization",
    text: "personalization",
    Icon: PersonalizationIcon,
  },
  {
    id: "storage",
    text: "storage",
    Icon: StorageIcon,
  },
  {
    id: "shortcuts",
    text: "shortcuts",
    Icon: ShortCutsIcon,
  },
  {
    id: "help",
    text: "help",
    Icon: HelpIcon,
  },
  {
    id: "profile",
    text: "profile",
    Icon: ProfileIcon,
  },
];
