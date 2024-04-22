import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { RxAvatar as ProfileIcon } from "react-icons/rx";
import React, { lazy, memo } from "react";
import { useDispatch } from "react-redux";
import {
  changeSettingActiveOptions,
  changeSidebarActivePopup,
} from "../../../redux/slices/uiStatesSlice";

const SettingPopupWindow = lazy(() =>
  import("../../popups/settingPopups/SettingPopupWindow")
);

const SidebarPopupButton = ({ id, content, Icon, type }) => {
  const dispatch = useDispatch();

  const handleChangeSidebarActivePopup = (open) => {
    dispatch(changeSidebarActivePopup(open ? id : null));
    dispatch(
      changeSettingActiveOptions(
        open ? (id === "setting" ? "general" : "profile") : null
      )
    );
  };

  return (
    <Popover
      placement="right"
      offset={-40}
      radius="md"
      onOpenChange={handleChangeSidebarActivePopup}
    >
      <PopoverTrigger>
        <Button
          radius="sm"
          isIconOnly
          className={`hover:scale-80 bg-transparent text-primary-500 ${
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
            <Icon className="text-2xl" />
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
