import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import React, { memo } from "react";
import { IoMdSearch as SearchIcon } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionIconButton } from "../../redux/slices/uiStatesSlice";

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
  const isActive = actionIconButtons[id];

  const handleToggleButtonState = () => {
    dispatch(toggleActionIconButton(id));
  };

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
              className={`text-xl sm:text-2xl ${
                isActive
                  ? "text-white bg-primary-500"
                  : "text-primary-500 bg-transparent"
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
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center gap-2 overflow-hidden">
        <h3 className="text-2xl font-bold capitalize truncate text-ellipsis">
          {headingText}
        </h3>
        {!!buttonList.length && (
          <div className="flex gap-2 justify-center items-center">
            {buttonList.map((item) => (
              <IconButtonList key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>

      {isSearchBar && (
        <Input
          variant="faded"
          color="primary"
          type="text"
          placeholder="Search"
          className=""
          startContent={
            <SearchIcon className="text-2xl pointer-events-none flex-shrink-0" />
          }
        />
      )}
    </div>
  );
};

export default memo(MainListContainerHeader);