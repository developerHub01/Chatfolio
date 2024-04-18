import { Button, Tooltip } from "@nextui-org/react";

import { IoStarOutline as StarIcon } from "react-icons/io5";
import SidebarButtonListWrapper from "./SidebarButtonListWrapper";
import { FaGear as SettingIcon } from "react-icons/fa6";
import {
  IoChatboxEllipsesOutline as ChatIcon,
  IoCallOutline as CallIcon,
} from "react-icons/io5";
import { BsPostcard as StoryIcon } from "react-icons/bs";

const buttonListTop = [
  {
    Icon: ChatIcon,
    content: "Chats",
    onclick: () => {},
  },
  {
    Icon: CallIcon,
    content: "Calls",
    onclick: () => {},
  },
  {
    Icon: StoryIcon,
    content: "Stories",
    onclick: () => {},
  },
];

const buttonListBottom = [
  {
    Icon: StarIcon,
    content: "Starred Messages",
    onclick: () => {},
  },
  {
    Icon: CallIcon,
    content: "Archived Chats",
    onclick: () => {},
  },
  // {
  //   Icon: StoryIcon,
  //   content: "Setting",
  //   onclick: () => {},
  // },
  {
    Icon: SettingIcon,
    content: "Setting",
    onclick: () => {},
  },
  {
    Icon: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    content: "Profile",
    type: "img",
    onclick: () => {},
  },
];

const Sidebar = () => {
  return (
    <div className="h-full flex-grow-0 flex-shrink-0 bg-foreground-50 overflow-y-auto flex flex-col p-2 gap-5 justify-between item-center">
      <SidebarButtonListWrapper buttonList={buttonListTop} />
      <SidebarButtonListWrapper buttonList={buttonListBottom} />
    </div>
  );
};

export default Sidebar;
