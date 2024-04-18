import { Avatar, Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { MdAccountCircle as ProfileIcon } from "react-icons/md";

const SidebarIconButton = ({ content, Icon, type = null, onClick }) => {
  console.log(content);
  return (
    <Tooltip showArrow content={content} placement="right">
      <Button
        isIconOnly
        onClick={onClick}
        className="bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white"
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
    </Tooltip>
  );
};

export default SidebarIconButton;
