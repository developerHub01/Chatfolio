import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import SidebarPopupButton from "./SidebarPopupButton";
import { changeSidebarActiveTab } from "../../../redux/slices/uiStatesSlice";
import { memo } from "react";
import { ProfileIcon } from "../../../constants/icons";

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
        color="primary"
        onClick={handleChageSidebarActiveTab}
        className={`hover:scale-80 ${
          isActiveTab
            ? "scale-80 bg-primary-500"
            : "bg-transparent text-primary-500"
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
          <Icon className="text-2xl" />
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
