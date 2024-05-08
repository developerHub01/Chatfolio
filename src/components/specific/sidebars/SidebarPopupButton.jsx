import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { lazy, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSettingActiveOptions } from "../../../redux/slices/uiStatesSlice";
import { ProfileIcon } from "../../../constants/icons";

const SettingPopupWindow = lazy(() =>
  import("../../popups/settingPopups/SettingPopupWindow")
);

const SidebarPopupButton = ({ id, content, Icon, type }) => {
  const {
    user: { avatar },
  } = useSelector((state) => state.authStates);
  const dispatch = useDispatch();

  const handleChangeSidebarActivePopup = (open) => {
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
      className=""
      classNames={{
        content: "",
      }}
    >
      <PopoverTrigger>
        <Button
          radius="sm"
          isIconOnly
          color="primary"
          className={`hover:scale-80 bg-transparent text-primary-500 ${
            type ? "" : "hover:bg-primary-500"
          } hover:text-white`}
        >
          {type ? (
            <Avatar
              className="block"
              src={avatar || Icon}
              name={content}
              isBordered
              color="primary"
              radius="full"
              size="sm"
              fallback={<ProfileIcon className="text-2xl" />}
            />
          ) : (
            <Icon className="text-2xl" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full px-0 py-0 overflow-hidden !top-0 !z-10">
        <SettingPopupWindow />
      </PopoverContent>
    </Popover>
  );
};

export default memo(SidebarPopupButton);
