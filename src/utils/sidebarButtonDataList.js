import {
  CallIcon,
  ChatIcon,
  GroupIcon,
  InboxIcon,
  SettingIcon,
  StoryIcon,
} from "../constants/icons";

export const buttonListTop = [
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

export const buttonListBottom = [
  {
    id: "group",
    Icon: GroupIcon,
    content: "Groups",
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
