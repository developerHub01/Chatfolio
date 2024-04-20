import { memo } from "react";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { MdAccountCircle as ProfileIcon } from "react-icons/md";
import SidebarPopupButton from "./SidebarPopupButton";

const SidebarButton = ({ content, Icon, type = null, onClick }) => {
  return (
    <Tooltip
      showArrow
      content={content}
      placement="right"
      color="primary"
      radius="sm"
    >
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
            src={<Icon />}
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

const SidebarIconButton = ({
  id,
  content,
  Icon,
  type = null,
  onClick,
  isPopUp = false,
}) => {
  const props = {
    id,
    content,
    Icon,
    type,
    onClick,
    isPopUp,
  };
  return (
    <>
      {isPopUp ? (
        <SidebarPopupButton {...props} />
      ) : (
        <SidebarButton content={content} Icon={Icon} onClick={onClick} />
      )}
    </>
  );
};

export default memo(SidebarIconButton);
