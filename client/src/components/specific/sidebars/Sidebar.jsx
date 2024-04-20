import { memo } from "react";
import { IoStarOutline as StarIcon } from "react-icons/io5";
import SidebarButtonListWrapper from "./SidebarButtonListWrapper";
import { FaGear as SettingIcon } from "react-icons/fa6";
import {
  IoChatboxEllipsesOutline as ChatIcon,
  IoCallOutline as CallIcon,
} from "react-icons/io5";
import { BsPostcard as StoryIcon } from "react-icons/bs";
import { GoInbox as InboxIcon } from "react-icons/go";

const Sidebar = () => {
  const buttonListTop = [
    {
      id: "chat",
      Icon: ChatIcon,
      content: "Chats",
    },
    {
      id: "call",
      Icon: CallIcon,
      content: "Calls",
    },
    {
      id: "story",
      Icon: StoryIcon,
      content: "Stories",
    },
  ];

  const buttonListBottom = [
    {
      id: "star",
      Icon: StarIcon,
      content: "Starred Messages",
    },
    {
      id: "archivedChats",
      Icon: InboxIcon,
      content: "Archived Chats",
    },
    {
      id: "setting",
      Icon: SettingIcon,
      content: "Setting",
      isPopUp: true,
    },
    {
      id: "profile",
      Icon: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
      content: "Profile",
      type: "img",
      isPopUp: true,
    },
  ];

  return (
    <>
      <div className="h-full flex flex-grow-0 flex-shrink-0 bg-foreground-50 overflow-y-auto flex-col p-2 gap-5 justify-between item-center shadow-xl border-r-2 border-foreground-300">
        <SidebarButtonListWrapper buttonList={buttonListTop} />
        <SidebarButtonListWrapper buttonList={buttonListBottom} />
      </div>
    </>
  );
};

export default memo(Sidebar);
