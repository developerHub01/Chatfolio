import React, {
  Suspense,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingPopupWindowLoader from "../../loaders/SettingPopupWindowLoader";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Input,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import {
  AvatarIcon,
  CheckIcon,
  CloseIcon,
  EditIcon,
  LogoutIcon,
  ThreeDotIcon,
} from "../../../constants/icons";
import useAuthGet from "../../../hooks/useAuthGet";
import { LOGOUT_API, UPDATE_USER_INFO_API } from "../../../constants/values";
import { setUserData } from "../../../redux/slices/userAuthSlice";
import useAuthPatch from "../../../hooks/useAuthPatch";
import { togglePreviewImage } from "../../../redux/slices/uiStatesSlice";
import { AnimatePresence, motion } from "framer-motion";
import { animProps1 } from "../../animation/animationList";

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const BIO_MAX_LENGTH = 100;
const preventEditModeList = ["gender", "email"];

const avatarOptions = [
  {
    id: "removeAvatarImage",
    text: "Remove Image",
  },
  {
    id: "viewAvatarImage",
    text: "View Image",
  },
  {
    id: "changeAvatarImage",
    text: "Change Image",
  },
];

const detailsTextList = {
  fullName: "Full Name",
  userName: "username",
  email: "Email",
  gender: "Gender",
  bio: "Bio",
};

const ProfileAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const updateMethod = useAuthPatch();
  const { avatar } = useSelector((state) => state.authStates.user);
  const uploadProfileAvatarRef = useRef();
  const [avatarImageFile, setAvatarImageFile] = useState(null);
  const handleAvatar = async (key) => {
    if (key === "viewAvatarImage") return dispatch(togglePreviewImage(avatar));
    else if (["changeAvatarImage", "uploadAvatarImage"].includes(key)) {
      if (uploadProfileAvatarRef?.current)
        uploadProfileAvatarRef.current.click();
      return;
    } else if (key === "removeAvatarImage") {
      setIsLoading((prev) => true);
      const formData = new FormData();
      formData.append("avatar", "");

      const { success, user } = await updateMethod(
        UPDATE_USER_INFO_API,
        formData
      );
      setIsLoading((prev) => false);
      if (success) return dispatch(setUserData(user));
    }
  };

  const handleAvatarClick = () =>
    avatar && dispatch(togglePreviewImage(avatar));

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.size > MAX_AVATAR_SIZE) return;

    setIsLoading((prev) => true);
    const formData = new FormData();
    formData.append("avatar", file);

    const { success, user } = await updateMethod(
      UPDATE_USER_INFO_API,
      formData
    );

    setIsLoading((prev) => false);

    if (success) return dispatch(setUserData(user));
  };

  return (
    <motion.div
      {...animProps1}
      className="w-full flex flex-wrap justify-between items-center mb-4"
    >
      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-full" />
        ) : (
          <Avatar
            src={avatar}
            onClick={handleAvatarClick}
            isBordered
            radius="full"
            color="primary"
            className={`w-full h-full ring-4 ${avatar ? "cursor-pointer" : ""}`}
          />
        )}
      </div>
      <Popover placement="bottom-end" showArrow={true} radius="sm">
        <PopoverTrigger>
          <Button
            isIconOnly
            type="button"
            radius="full"
            size="sm"
            color="primary"
            className="group bg-transparent text-primary-500 hover:text-white relative"
          >
            <span className="absolute w-full h-full bg-primary-500 rounded-full z-0 scale-0 group-hover:scale-100 transition-all duration-75 opacity-0 group-hover:opacity-100"></span>
            <ThreeDotIcon className="text-base sm:text-lg relative z-10" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 py-0 w-36">
          <Listbox aria-label="Actions" onAction={handleAvatar} color="primary">
            {avatar ? (
              avatarOptions.map(({ id, text }, _) => (
                <ListboxItem key={id} className="text-capitalize ">
                  {text}
                </ListboxItem>
              ))
            ) : (
              <ListboxItem key="uploadAvatarImage" className="text-capitalize ">
                Upload Image
              </ListboxItem>
            )}
          </Listbox>
        </PopoverContent>
      </Popover>

      {/* Change or upload avatar image input */}
      <input
        type="file"
        name="uploadProfileAvatar"
        id="uploadProfileAvatar"
        hidden
        value={avatarImageFile || ""}
        onChange={handleChangeAvatar}
        ref={uploadProfileAvatarRef}
        accept="image/*"
      />
    </motion.div>
  );
};

const EditDataButton = ({ isLoading, handleOpenEdit }) => {
  return (
    <>
      {isLoading ? (
        <Skeleton className="size-10 rounded-full flex-shrink-0" />
      ) : (
        <Tooltip content="Edit" color="primary" radius="sm" showArrow size="sm">
          <Button
            type="button"
            isIconOnly
            radius="full"
            size="sm"
            color="primary"
            onClick={handleOpenEdit}
            className="group bg-transparent text-primary-500 hover:text-white relative"
          >
            <span className="absolute w-full h-full bg-primary-500 rounded-full z-0 scale-0 group-hover:scale-100 transition-all duration-75 opacity-0 group-hover:opacity-100"></span>
            <EditIcon className="text-base sm:text-lg relative z-10" />
          </Button>
        </Tooltip>
      )}
    </>
  );
};

const EditableField = forwardRef(
  (
    {
      handleSubmit,
      detailsType,
      detailsItemData,
      updatedDetailsItemData,
      handleChange,
      handleKeyDown,
      handleCancelEdit,
    },
    ref
  ) => {
    const inputWrapperRef = useRef(null);
    const bioLimitBox = useRef(null);
    const saveButtonRef = useRef(null);

    useEffect(() => {
      const preventDOMList = [
        inputWrapperRef,
        bioLimitBox,
        // saveButtonRef
      ];
      const handleClick = (e) => {
        if (
          inputWrapperRef?.current &&
          preventDOMList.every((item) => !item?.current?.contains(e.target))
        )
          handleCancelEdit();
      };

      document.addEventListener("click", handleClick);

      return () => document.removeEventListener("click", handleClick);
    }, [inputWrapperRef]);

    const inputProps = {
      className: "w-full text-foreground-300 text-base",
      type: "text",
      variant: "faded",
      color: "primary",
      defaultValue: detailsItemData,
      value: updatedDetailsItemData,
      onChange: handleChange,
    };

    return (
      <motion.div
        key={detailsType}
        {...animProps1}
        className="w-full flex flex-col gap-2"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-between items-center gap-2"
        >
          <div className="w-full" ref={inputWrapperRef}>
            <div className="w-full" ref={ref}>
              {detailsType === "bio" ? (
                <Textarea
                  placeholder="Enter your bio"
                  {...inputProps}
                  minRows={1}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <Input {...inputProps} />
              )}
            </div>
          </div>

          <div
            className="flex justify-center items-center gap-2"
            ref={saveButtonRef}
          >
            <Tooltip
              content="Save"
              color="primary"
              radius="sm"
              showArrow
              size="sm"
              className="pointer-events-none"
            >
              <Button
                type="submit"
                isIconOnly
                radius="full"
                size="sm"
                color="primary"
              >
                <CheckIcon className="text-base" />
              </Button>
            </Tooltip>
          </div>
        </form>
        {detailsType === "bio" && (
          <div
            className="w-full justify-end items-center gap-2 select-none flex flex-wrap"
            ref={bioLimitBox}
          >
            <Chip color="primary" variant="bordered" radius="sm">
              {updatedDetailsItemData.length}
            </Chip>
            <Chip color="primary" radius="sm">
              {BIO_MAX_LENGTH}
            </Chip>
          </div>
        )}
      </motion.div>
    );
  }
);

const UserDetailsListItem = ({ detailsType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.authStates);
  const detailsItemData = user[detailsType];
  const editFieldRef = useRef(null);

  const dispatch = useDispatch();
  const [isEdiable, setIsEditable] = useState(false);
  const [updatedDetailsItemData, setUpdatedDetailsItemData] =
    useState(detailsItemData);

  const updateMethod = useAuthPatch();

  useEffect(() => {
    if (editFieldRef?.current) {
      editFieldRef.current.querySelector("input, textarea").focus();
    }
  }, [isEdiable]);

  const handleOpenEdit = () => setIsEditable((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => true);
    if (updatedDetailsItemData && updatedDetailsItemData !== detailsItemData) {
      const data = await updateMethod(UPDATE_USER_INFO_API, {
        [detailsType]: updatedDetailsItemData,
      });
      if (data?.success) dispatch(setUserData(data?.user));
    }
    setIsEditable((prev) => false);
    setIsLoading((prev) => false);
  };
  const handleChange = (e) => {
    detailsType === "bio"
      ? e.target.value.length <= BIO_MAX_LENGTH &&
        setUpdatedDetailsItemData(
          (prev) => e.target.value
        ) /* This is for preventing max length of bio text */
      : setUpdatedDetailsItemData((prev) => e.target.value);
  };

  const handleKeyDown = (e) => e.key === "Enter" && e.preventDefault();

  const handleCancelEdit = () => setIsEditable((prev) => false);

  const editableFieldOptions = {
    handleSubmit,
    detailsType,
    detailsItemData,
    updatedDetailsItemData,
    handleChange,
    handleKeyDown,
    handleCancelEdit,
  };

  return (
    <motion.div
      {...animProps1}
      className="w-full py-1 flex gap-2 justify-between items-center"
    >
      <AnimatePresence>
        {isEdiable && !preventEditModeList.includes(detailsType) ? (
          <EditableField {...editableFieldOptions} ref={editFieldRef} />
        ) : (
          <React.Fragment>
            {detailsType === "fullName" ? (
              isLoading ? (
                <Skeleton className="w-full h-12 rounded-md" />
              ) : (
                <h1 className="text-lg sm:text-xl font-bold text-foreground-200 capitalize">
                  {detailsItemData}
                </h1>
              )
            ) : isLoading ? (
              <Skeleton className="w-full h-8 rounded-md" />
            ) : (
              <p
                className={`text-base text-foreground-200 ${
                  !["gender"].includes(detailsType) ? "" : "capitalize"
                }`}
              >
                <span className="font-bold capitalize pr-1">
                  {detailsTextList[detailsType]} :
                </span>
                {detailsItemData}
              </p>
            )}

            {!preventEditModeList.includes(detailsType) && (
              <EditDataButton
                isLoading={isLoading}
                handleOpenEdit={handleOpenEdit}
              />
            )}
          </React.Fragment>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logout = useAuthGet();
  const handleLogout = async () => {
    const data = await logout(LOGOUT_API);
    if (data?.success) dispatch(setUserData(null));
  };
  return (
    <motion.div {...animProps1}>
      <Button
        onClick={handleLogout}
        startContent={<LogoutIcon className="text-xl" />}
        radius="sm"
        color="primary"
        size="md"
        className="w-full max-w-48 text-base gap-3"
      >
        Logout
      </Button>
    </motion.div>
  );
};

const ProfileSection = () => {
  return (
    <Suspense fallback={<SettingPopupWindowLoader />}>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <ProfileAvatar />
        <React.Fragment>
          <UserDetailsListItem detailsType="fullName" />
          <UserDetailsListItem detailsType="userName" />
          <UserDetailsListItem detailsType="email" />
          <UserDetailsListItem detailsType="gender" />
          <UserDetailsListItem detailsType="bio" />
        </React.Fragment>

        <p className="text-center text-xs text-gray-500 dark:text-gray-200 py-3 my-0 sm:my-2">
          To cancel edit click outside of input box
        </p>

        <Divider orientation="horizontal" className="bg-primary-500/20 h-1" />
        <LogoutButton />
      </div>
    </Suspense>
  );
};

export default ProfileSection;
