import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveSearchType,
  toggleActionIconButton,
} from "../../redux/slices/uiStatesSlice";
import { SearchIcon, SettingIcon } from "../../constants/icons";
import searchTypeList from "../../utils/searchTypeList";

const IconButtonList = ({
  id,
  Icon = "",
  text = "",
  PopupComponent = "",
  isIconInLeft = false,
}) => {
  const actionIconButtons = useSelector(
    (state) => state.uiStates.actionIconButtons
  );
  const dispatch = useDispatch();
  const isActive = !!actionIconButtons[id];

  const handleToggleButtonState = () => dispatch(toggleActionIconButton(id));

  let iconAndTextButtonIconDirection = {};
  isIconInLeft
    ? (iconAndTextButtonIconDirection["startContent"] = (
        <Icon className="text-2xl" />
      ))
    : (iconAndTextButtonIconDirection["endContent"] = (
        <Icon className="text-2xl" />
      ));

  return (
    <>
      {PopupComponent ? (
        <Popover placement="bottom" onOpenChange={handleToggleButtonState}>
          <PopoverTrigger>
            <Button
              isIconOnly
              color="primary"
              className={`hover:scale-80 text-xl sm:text-2xl ${
                isActive
                  ? "scale-80 text-white bg-primary-500"
                  : "scale-100 text-primary-500 bg-transparent"
              }  hover:text-white hover:bg-primary-500`}
            >
              <Icon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopupComponent />
          </PopoverContent>
        </Popover>
      ) : Icon && text ? (
        <Button
          isIconOnly={!text}
          {...iconAndTextButtonIconDirection}
          className={`text-xl ${
            isActive
              ? "text-white bg-primary-500"
              : "text-primary-500 bg-transparent"
          }  hover:text-white hover:bg-primary-500 justify-center items-center`}
        >
          {text}
        </Button>
      ) : (
        <Button
          isIconOnly={!text}
          className={`text-xl sm:text-2xl ${
            isActive
              ? "text-white bg-primary-500"
              : "text-primary-500 bg-transparent"
          }  hover:text-white hover:bg-primary-500`}
        >
          {Icon ? <Icon /> : text}
        </Button>
      )}
    </>
  );
};

const MainListContainerHeader = ({
  buttonList = [],
  headingText = "",
  isSearchBar = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSearchType } = useSelector((state) => state.uiStates);
  const [selected, setSelected] = useState("name");
  const dispatch = useDispatch();

  const handleCloseDropDown = () => setIsOpen((prev) => false);
  const handleChangeDropDown = (newValue) =>
    dispatch(changeActiveSearchType(newValue));

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center gap-2">
        <h2 className="h2">{headingText}</h2>
        {!!buttonList.length && (
          <div className="flex gap-2 justify-center items-center">
            {buttonList.map((item) => (
              <IconButtonList key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>

      {isSearchBar && (
        <div className="flex gap-2">
          <Input
            variant="faded"
            color="primary"
            type="text"
            placeholder={`Search by ${activeSearchType}`}
            classNames={{
              inputWrapper: [
                "bg-foreground-900",
                "dark:bg-background-900",
                "text-foreground-100",
              ],
            }}
            startContent={
              <SearchIcon className="text-xl pointer-events-none flex-shrink-0 text-foreground-100" />
            }
          />
          <Dropdown
            placement="bottom-end"
            radius="sm"
            onClose={handleCloseDropDown}
          >
            <DropdownTrigger>
              <Button
                isIconOnly
                color="primary"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${
                  isOpen
                    ? "bg-primary-500 text-white"
                    : "bg-transparent text-primary-500"
                }   hover:bg-primary-500 hover:text-white ring-0`}
                radius="sm"
                style={{
                  transform: `scale(${isOpen ? 0.8 : 1})`,
                }}
              >
                <SettingIcon className="text-lg" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="search-type"
              color="primary"
              onAction={handleChangeDropDown}
            >
              {searchTypeList.map(({ id, text }) => (
                <DropdownItem
                  key={id}
                  className={`capitalize ${
                    activeSearchType === id ? "bg-primary-500 text-white" : ""
                  }`}
                >
                  {text}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default MainListContainerHeader;
