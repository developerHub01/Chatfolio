import { memo } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
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
import { FiMenu as MenuIcon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeSettingActiveOptions } from "../../../redux/slices/uiStatesSlice";

const buttonDataList = [
  {
    id: "general",
    text: "general",
    Icon: <GeneralIcon />,
  },
  {
    id: "account",
    text: "account",
    Icon: <ProfileIcon />,
  },
  {
    id: "chats",
    text: "chats",
    Icon: <ChatIcon />,
  },
  {
    id: "video",
    text: "video & voice",
    Icon: <VideoIcon />,
  },
  {
    id: "notifications",
    text: "notifications",
    Icon: <NotificationIcon />,
  },
  {
    id: "personalization",
    text: "personalization",
    Icon: <PersonalizationIcon />,
  },
  {
    id: "storage",
    text: "storage",
    Icon: <StorageIcon />,
  },
  {
    id: "shortcuts",
    text: "shortcuts",
    Icon: <ShortCutsIcon />,
  },
  {
    id: "help",
    text: "help",
    Icon: <HelpIcon />,
  },
  {
    id: "profile",
    text: "profile",
    Icon: <ProfileIcon />,
  },
];

const BigPopupWindowMenu = () => {
  const { activeOption } = useSelector(
    (state) => state.uiStates.settingOptions
  );
  useSelector((state) => console.log(state.uiStates));
  const dispatch = useDispatch();
  const handleChangeActiveOption = (id) =>
    dispatch(changeSettingActiveOptions(id));

  return (
    <Dropdown size="sm" className="">
      <DropdownTrigger>
        <Button
          isIconOnly
          color="primary"
          aria-label="Menu"
          className="absolute top-2 left-2 text-2xl"
        >
          <MenuIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="details-menu"
        onAction={handleChangeActiveOption}
        color="primary"
        variant="solid"
      >
        {buttonDataList.map(({ id, text, Icon }) => {
          const isActiveOption = activeOption === id;
          return (
            <DropdownItem
              key={id}
              startContent={Icon}
              className={`text-xl items-center capitalize ${
                isActiveOption ? "bg-primary-500 text-white" : ""
              }`}
              color="primary"
              variant="solid"
            >
              {text}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(BigPopupWindowMenu);
