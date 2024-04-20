import { memo } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FiMenu as MenuIcon } from "react-icons/fi";

const BigPopupWindowMenu = ({ buttonDataList }) => {
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
      <DropdownMenu aria-label="details-menu">
        {buttonDataList.map(({ text, Icon }) => (
          <DropdownItem
            key={text}
            startContent={Icon}
            className="text-xl"
            color="primary"
          >
            {text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default memo(BigPopupWindowMenu);
