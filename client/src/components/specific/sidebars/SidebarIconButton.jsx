import { memo } from "react";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { MdAccountCircle as ProfileIcon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SidebarPopupButton from "./SidebarPopupButton";
import { changeSidebarActiveTab } from "../../../redux/slices/uiStatesSlice";

const SidebarButton = ({ id, content, Icon, type }) => {
  // getter active tab
  const { activeTabId } = useSelector((state) => state.uiStates.sidebar);
  const isActiveTab = activeTabId === id;
  const dispatch = useDispatch();

  // setter active tab
  const handleChageSidebarActiveTab = () =>
    dispatch(changeSidebarActiveTab(id));
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
        onClick={handleChageSidebarActiveTab}
        className={`${
          isActiveTab
            ? "bg-primary-500 text-white"
            : "bg-transparent text-primary-500 "
        } ${type ? "" : "hover:bg-primary-500"} hover:text-white`}
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
  content = "",
  Icon,
  type = null,
  isPopUp = false,
}) => {
  const props = {
    id,
    content,
    Icon,
    type,
    isPopUp,
  };
  return (
    <>
      {isPopUp ? (
        <SidebarPopupButton {...props} />
      ) : (
        <SidebarButton {...props} />
      )}
    </>
  );
};

export default memo(SidebarIconButton);
