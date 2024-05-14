import {
  Avatar,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  Skeleton,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionIconButton } from "../../redux/slices/uiStatesSlice";
import { setActiveChatState } from "../../redux/slices/activeChatSlice.js";
import {
  CloseIcon,
  NotFoundIcon,
  SearchIcon,
  SettingIcon,
} from "../../constants/icons";
import searchTypeList from "../../utils/searchTypeList";
import {
  changeActiveSearchType,
  updateSearchResult,
  changeFilterType,
} from "../../redux/slices/searchChatSlice";
import { SEARCH_CHAT_API } from "../../constants/values";
import useAuthPost from "../../hooks/useAuthPost";
import { AnimatePresence, motion } from "framer-motion";
import { animProps1, layoutAnimProps } from "../animation/animationList";

const MAX_CHAT_PER_SEARCH = 6;

const searchFilterTypeList = [
  {
    id: "all",
    text: "All",
  },
  {
    id: "connected",
    text: "Connected",
  },
];

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

const SearchResultLoadingSkeleton = () => {
  return (
    <>
      {Array(MAX_CHAT_PER_SEARCH)
        .fill(0)
        .map((item, key) => (
          <motion.div
            {...animProps1}
            className="w-full flex gap-3 items-center"
            key={key + 1}
          >
            <Skeleton className="size-12 rounded-full flex-shrink-0 flex-grow-0" />
            <div className="w-full flex flex-col gap-2">
              <Skeleton
                className="h-5 rounded-full"
                style={{
                  width: `${30 + Math.random() * (100 - 30)}%`,
                }}
              />
              <Skeleton
                className="w-24 h-3 rounded-full"
                style={{
                  width: `${10 + Math.random() * (50 - 10)}%`,
                }}
              />
            </div>
          </motion.div>
        ))}
    </>
  );
};

const SearchResultItem = ({ resultItem }) => {
  const { _id, avatar, fullName, name, userName, members = [] } = resultItem;
  const dispatch = useDispatch();
  const handleClickSearchItem = (activeChat) => {
    dispatch(setActiveChatState(activeChat));
    dispatch(updateSearchResult());
  };
  return (
    <motion.div
      {...animProps1}
      className="w-full flex gap-3 items-center hover:bg-background-800 px-2 py-2 sm:py-3 rounded-md cursor-pointer duration-100 transition-all ease-in-out"
      key={_id || i + 1}
      onClick={() => handleClickSearchItem(resultItem)}
    >
      <Avatar
        radius="full"
        src={avatar}
        name={fullName || name}
        isBordered
        color="primary"
        className="w-12 h-12 flex-shrink-0 flex-grow-0"
      />
      <div className="w-full flex flex-col gap-1 overflow-hidden">
        <h4 className="h4 truncate capitalize">{fullName || name}</h4>
        <p className="text">
          {userName ||
            `${
              members?.length >= 1000
                ? `${Number(members?.length?.toFixed(2))} K`
                : members?.length
            } members`}
        </p>
      </div>
    </motion.div>
  );
};

const SearchResult = () => {
  const {
    activeSearchFilterType,
    searchResult: { isLoading = true, isError, data: chatList },
  } = useSelector((state) => state.searchChatStates);

  const dispatch = useDispatch();

  const handleChangeFilterType = (type) => () => {
    dispatch(changeFilterType(type));
  };

  return (
    <motion.div
      {...layoutAnimProps}
      exit={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      className="w-full absolute top-12 left-1/2 -translate-x-1/2 z-20 flex"
    >
      <div className="w-full bg-background-900 drop-shadow-2xl rounded-lg p-2 border-background-800/50 border-2 flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full flex gap-2 items-center justify-start pb-2">
          {searchFilterTypeList.map(({ id, text }) => (
            <Button
              key={id}
              size="sm"
              radius="sm"
              className={`text-sm ${
                activeSearchFilterType === id ? "bg-primary-500 scale-85" : ""
              } hover:scale-85 hover:bg-primary-500 text-white`}
              onClick={handleChangeFilterType(id)}
            >
              {text}
            </Button>
          ))}
        </div>
        <ScrollShadow
          hideScrollBar
          className="w-full max-h-96 p-1 flex flex-col gap-3"
          size={3}
        >
          {!isLoading && !chatList.length && (
            <motion.h4
              {...animProps1}
              className="capitalize text-lg sm:text-xl text-foreground-200 text-center px-2 py-4 select-none flex justify-center items-center gap-2"
            >
              <NotFoundIcon className="text-3xl text-primary-500" /> No result
              found
            </motion.h4>
          )}
          {chatList.map((item, i) => (
            <React.Fragment key={item._id || i}>
              <SearchResultItem resultItem={item} />
            </React.Fragment>
          ))}
          {isLoading && <SearchResultLoadingSkeleton />}
          {isError && (
            <p className="text-center text-lg text-red-500 font-bold">
              {isError}
            </p>
          )}
        </ScrollShadow>
      </div>
      {/* <div className="w-14 h-full pointer-events-none"></div> */}
    </motion.div>
  );
};

const MainListContainerHeader = ({
  buttonList = [],
  headingText = "",
  isSearchBar = true,
}) => {
  const { activeSearchType, activeSearchFilterType } = useSelector(
    (state) => state.searchChatStates
  );

  const [searchPage, setSearchPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const postDataMethod = useAuthPost();

  const searchSectionRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchSectionRef?.current?.contains(e?.target)) return;

      setSearchTerm((prev) => "");
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleDropDownState = (value) => setIsOpen((prev) => value);

  const handleChangeDropDown = (newValue) =>
    dispatch(changeActiveSearchType(newValue));

  const fetchSearchData = async () => {
    dispatch(
      updateSearchResult({
        isLoading: true,
        isError: false,
        data: [],
      })
    );

    if (!searchTerm)
      return dispatch(
        updateSearchResult({
          isLoading: false,
          isError: false,
          data: [],
        })
      );

    try {
      const res = await postDataMethod(
        `${SEARCH_CHAT_API}?page=${searchPage}&number=${MAX_CHAT_PER_SEARCH}`,
        {
          searchType: activeSearchType,
          searchTerm,
          filterType: activeSearchFilterType,
        }
      );

      const data = await res.data;

      console.log(data);

      dispatch(
        updateSearchResult({
          isLoading: false,
          isError: false,
          data: data || [],
        })
      );
    } catch (error) {
      dispatch(
        updateSearchResult({
          isLoading: false,
          isError: error.message,
          data: [],
        })
      );
    }
  };
  useEffect(() => {
    fetchSearchData();
  }, [searchTerm, activeSearchFilterType]);

  const handleClearInput = () => setSearchTerm((prev) => "");

  const handleChangeInput = (value) => setSearchTerm((prev) => value);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center gap-2">
        <h2 className="h2">{headingText}</h2>
        {!!buttonList.length && (
          <div className="flex gap-2 justify-center items-center">
            {buttonList.map((item, i) => (
              <IconButtonList key={item.id || i + 1} {...item} />
            ))}
          </div>
        )}
      </div>
      {isSearchBar && (
        <div className="flex gap-2 relative" ref={searchSectionRef}>
          <Input
            variant="faded"
            color="primary"
            type="text"
            placeholder={`Search by ${activeSearchType}`}
            onValueChange={handleChangeInput}
            value={searchTerm}
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
            endContent={
              searchTerm && (
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  radius="full"
                  variant="solid"
                  className="bg-transparent hover:bg-background-700 text-white"
                  onClick={handleClearInput}
                >
                  <CloseIcon className="text-xl pointer-events-none flex-shrink-0 text-foreground-100" />
                </Button>
              )
            }
          />
          <Dropdown
            placement="bottom-end"
            radius="sm"
            onOpenChange={handleDropDownState}
          >
            <DropdownTrigger>
              <Button
                isIconOnly
                color="primary"
                className={`${
                  isOpen
                    ? "bg-primary-500 text-white"
                    : "bg-transparent text-primary-500"
                } w-10 h-10  hover:bg-primary-500 hover:text-white ring-0`}
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
              {searchTypeList.map(({ id, text }, i) => (
                <DropdownItem
                  key={id || i + 1}
                  className={`capitalize ${
                    activeSearchType === id ? "bg-primary-500 text-white" : ""
                  }`}
                >
                  {text}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <AnimatePresence>{searchTerm && <SearchResult />}</AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MainListContainerHeader;
