import React, { Suspense, useRef, useState } from "react";
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
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import {
  CheckIcon,
  EditIcon,
  LogoutIcon,
  ThreeDotIcon,
} from "../../../constants/icons";
import useAuthGet from "../../../hooks/useAuthGet";
import { LOGOUT_API, UPDATE_USER_INFO_API } from "../../../constants/values";
import { setUserData } from "../../../redux/slices/userAuthSlice";
import useAuthPatch from "../../../hooks/useAuthPatch";
import { togglePreviewImage } from "../../../redux/slices/uiStatesSlice";

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

const ProfileAvatar = () => {
  const dispatch = useDispatch();
  const updateMethod = useAuthPatch();
  const { avatar } = useSelector((state) => state.authStates.user);
  const uploadProfileAvatarRef = useRef();
  const [avatarImageFile, setAvatarImageFile] = useState(null);
  const handleAvatar = async (key) => {
    console.log(key);
    if (key === "viewAvatarImage") return dispatch(togglePreviewImage(avatar));
    else if (["changeAvatarImage", "uploadAvatarImage"].includes(key)) {
      if (uploadProfileAvatarRef?.current)
        uploadProfileAvatarRef.current.click();
      return;
    } else if (key === "removeAvatarImage") {
      const data = await updateMethod(UPDATE_USER_INFO_API, {
        avatar: "",
      });
    }
  };

  const handleAvatarClick = () =>
    avatar && dispatch(togglePreviewImage(avatar));

  const handleChangeAvatar = (e) => {
    console.log(e);
  };

  return (
    <div className="w-full flex flex-wrap justify-between items-center mb-4">
      <Avatar
        src={avatar}
        onClick={handleAvatarClick}
        isBordered
        color="primary"
        className={`w-20 h-20 sm:w-32 sm:h-32 rounded-full ring-4 ${
          avatar ? "cursor-pointer" : ""
        }`}
      />
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
              <React.Fragment>
                {/*  If already any avatar exist */}
                {avatarOptions.map(({ id, text }, _) => (
                  <ListboxItem key={id} className="text-capitalize ">
                    {text}
                  </ListboxItem>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/*  If no avatar exist */}
                <ListboxItem
                  key="uploadAvatarImage"
                  className="text-capitalize "
                >
                  Upload Image
                </ListboxItem>
              </React.Fragment>
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
        value={avatarImageFile}
        onChange={handleChangeAvatar}
        ref={uploadProfileAvatarRef}
      />
    </div>
  );
};

const UserDetailsListItem = ({ detailsType }) => {
  const { user } = useSelector((state) => state.authStates);
  const detailsItemData = user[detailsType];

  const dispatch = useDispatch();
  const [isEdiable, setIsEditable] = useState(false);
  const [updatedDetailsItemData, setUpdatedDetailsItemData] =
    useState(detailsItemData);
  const updateMethod = useAuthPatch();
  const bioMaxLength = 100;
  const handleToggleEdit = () => setIsEditable((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatedDetailsItemData && updatedDetailsItemData !== detailsItemData) {
      const data = await updateMethod(UPDATE_USER_INFO_API, {
        [detailsType]: updatedDetailsItemData,
      });
      if (data?.success) {
        dispatch(setUserData(data?.user));
        setUpdatedDetailsItemData((prev) => data?.user?.detailsItemData);
      } else setUpdatedDetailsItemData((prev) => detailsItemData);
    }
    setIsEditable((prev) => false);
  };
  const handleChange = (e) => {
    detailsType === "bio"
      ? e.target.value.length <= bioMaxLength &&
        setUpdatedDetailsItemData(
          (prev) => e.target.value
        ) /* This is for preventing max length of bio text */
      : setUpdatedDetailsItemData((prev) => e.target.value);
  };

  const handleKeyDown = (e) => e.key === "Enter" && e.preventDefault();

  return (
    <div className="w-full py-1 flex gap-2 justify-between items-center">
      {isEdiable ? (
        <div className="w-full flex flex-col gap-2">
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-between items-center gap-2"
          >
            <React.Fragment>
              {detailsType === "bio" ? (
                <Textarea
                  className="w-full text-foreground-300 text-base"
                  placeholder="Enter your bio"
                  type="text"
                  variant="faded"
                  color="primary"
                  defaultValue={detailsItemData}
                  value={updatedDetailsItemData}
                  minRows={1}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <Input
                  className="w-full text-foreground-300"
                  type="text"
                  variant="faded"
                  color="primary"
                  defaultValue={detailsItemData}
                  value={updatedDetailsItemData}
                  onChange={handleChange}
                />
              )}
            </React.Fragment>

            <Tooltip
              content="Save"
              color="primary"
              radius="sm"
              showArrow
              size="sm"
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
          </form>
          {detailsType === "bio" && (
            <div className="w-full flex justify-end items-center gap-2 select-none">
              <Chip color="primary" variant="bordered" radius="sm">
                {updatedDetailsItemData.length}
              </Chip>
              <Chip color="primary" radius="sm">
                {bioMaxLength}
              </Chip>
            </div>
          )}
        </div>
      ) : (
        <React.Fragment>
          {detailsType === "fullName" ? (
            <h1 className="text-lg sm:text-xl font-bold text-foreground-200">
              {detailsItemData}
            </h1>
          ) : (
            <p className="text-base text-foreground-200">{detailsItemData}</p>
          )}
          <Tooltip
            content="Edit"
            color="primary"
            radius="sm"
            showArrow
            size="sm"
          >
            <Button
              type="button"
              isIconOnly
              radius="full"
              size="sm"
              color="primary"
              onClick={handleToggleEdit}
              className="group bg-transparent text-primary-500 hover:text-white relative"
            >
              <span className="absolute w-full h-full bg-primary-500 rounded-full z-0 scale-0 group-hover:scale-100 transition-all duration-75 opacity-0 group-hover:opacity-100"></span>
              <EditIcon className="text-base sm:text-lg relative z-10" />
            </Button>
          </Tooltip>
        </React.Fragment>
      )}
    </div>
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
  );
};

const Profile = () => {
  return (
    <Suspense fallback={<SettingPopupWindowLoader />}>
      <div className="w-full flex flex-col justify-center items-center gap-2 sm:gap-4">
        <ProfileAvatar />
        <React.Fragment>
          <UserDetailsListItem detailsType="fullName" />
          <UserDetailsListItem detailsType="userName" />
          <UserDetailsListItem detailsType="bio" />
        </React.Fragment>
        <Divider orientation="horizontal" className="bg-primary-500/20 h-1" />
        <LogoutButton />
      </div>
    </Suspense>
  );
};

export default Profile;
