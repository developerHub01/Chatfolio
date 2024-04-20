import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { RxAvatar as ProfileIcon } from "react-icons/rx";
import React, { lazy, memo } from "react";

const SettingPopupWindow = lazy(() =>
  import("../../popups/settingPopups/SettingPopupWindow")
);

const SidebarPopupButton = ({ id, content, Icon, type, onClick, isPopUp }) => {
  return (
    <Popover placement="right" showArrow offset={15} radius="md">
      <PopoverTrigger>
        <Button
          radius="sm"
          isIconOnly
          onClick={onClick}
          className={`bg-transparent text-primary-500 ${
            type ? "" : "hover:bg-primary-500"
          } hover:text-white`}
        >
          {type ? (
            <Avatar
              className="block"
              src={Icon}
              name={content}
              isBordered
              color="primary"
              radius="full"
              size="sm"
              fallback={<ProfileIcon />}
            />
          ) : (
            <Icon className="text-xl md:text-2xl" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <SettingPopupWindow />
      </PopoverContent>
    </Popover>
  );
};

export default memo(SidebarPopupButton);
