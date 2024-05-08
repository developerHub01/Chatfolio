import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { changeSettingActiveOptions } from "../../../redux/slices/uiStatesSlice";
import { memo } from "react";
import { buttonDataList } from "../../../utils/settingButtonDataList";
import { MenuIcon } from "../../../constants/icons";

const SettingPopupWindowMenu = () => {
  const { activeOption } = useSelector(
    (state) => state.uiStates.settingOptions
  );
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
          radius="sm"
          variant="bordered"
          className="absolute top-2 left-2 text-2xl hover:text-white hover:bg-primary-500"
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
              startContent={<Icon />}
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

export default memo(SettingPopupWindowMenu);
