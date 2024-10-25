import React, { Suspense, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import {
  DarkIcon,
  DotFillIcon,
  DotOutlineIcon,
  ImageIcon,
  LightIcon,
} from "../../../constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { animProps1 } from "../../animation/animationList";
import { setPreferencesStates } from "../../../redux/slices/preferencesSlice";
import useAuthPatch from "../../../hooks/useAuthPatch";
import { USER_PREFERENCES_DATA_API } from "../../../constants/values";
import SettingHeading from "./SettingHeading";
import SettingPopupWindowLoader from "../../loaders/SettingPopupWindowLoader";
import { wallpaperPositionList } from "../../../constants/constants";

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

const selectMenusItems = [
  {
    id: "light",
    text: "Light",
    Icon: LightIcon,
  },
  {
    id: "dark",
    text: "Dark",
    Icon: DarkIcon,
  },
];

const SubSectionWrapper = ({ children }) => {
  return (
    <motion.div
      {...animProps1}
      className="w-full flex flex-col gap-3 justify-center items-start"
    >
      {children}
    </motion.div>
  );
};

const ModeSetting = ({ mode, typeOfMode, heading }) => {
  const dispatch = useDispatch();
  const updateMethod = useAuthPatch();
  const currentMode = selectMenusItems.find((item) => item.id === mode);
  const handleChangeMode = async (e) => {
    if (!currentMode || !currentMode?.id || ![...e][0]) return;
    const data = await updateMethod(USER_PREFERENCES_DATA_API, {
      [typeOfMode]: [...e][0],
    });
    if (!data?.success) return;

    return dispatch(setPreferencesStates(data.data));
  };

  return (
    <SubSectionWrapper>
      <SettingHeading>{heading}</SettingHeading>
      <Select
        placeholder="Select theme"
        selectionMode="single"
        label="Select theme"
        radius="sm"
        variant="bordered"
        size="sm"
        color="primary"
        defaultSelectedKeys={[currentMode?.id]}
        startContent={
          <span className="text-primary-500 text-lg">{currentMode.Icon()}</span>
        }
        onSelectionChange={handleChangeMode}
        className="w-52 text-primary-500"
        classNames={{
          label: "hidden",
          innerWrapper: "!pt-0 border-primary-500",
          trigger: "!hover:border-primary-500",
        }}
        isRequired
      >
        {selectMenusItems.map(({ id, text, Icon }) => (
          <SelectItem
            key={id}
            value={id}
            startContent={<Icon className="text-lg mr-2" />}
            variant="solid"
            color="primary"
            className="text-capitalize"
          >
            {text}
          </SelectItem>
        ))}
      </Select>
    </SubSectionWrapper>
  );
};

const WallpapperSetting = ({ wallpaper, wallpaperActive }) => {
  const [isLoadingWallpaper, setIsLoadingWallpaper] = useState(false);
  const dispatch = useDispatch();
  const updateMethod = useAuthPatch();
  const wallpaperImageRef = useRef(null);
  const handleUploadImage = () => wallpaperImageRef?.current?.click();
  const handleWallPaperChange = async (e) => {
    const file = e?.target?.files[0];

    if (!file) return;
    if (file.size > MAX_AVATAR_SIZE) return;

    setIsLoadingWallpaper((prev) => true);

    const formData = new FormData();
    formData.append("wallpaper", file);

    const data = await updateMethod(USER_PREFERENCES_DATA_API, formData);
    setIsLoadingWallpaper((prev) => false);
    if (!data?.success) {
      return;
    }

    return dispatch(setPreferencesStates(data.data));
  };
  const handleChangeWallpaperActivity = async (value) => {
    const data = await updateMethod(USER_PREFERENCES_DATA_API, {
      wallpaperActive: value,
    });
    if (!data?.success) return;

    return dispatch(setPreferencesStates(data.data));
  };

  return (
    <SubSectionWrapper>
      <SettingHeading>Change wallpapper</SettingHeading>
      <input
        ref={wallpaperImageRef}
        type="file"
        name="wallpaperImage"
        id="wallpaperImage"
        hidden
        onChange={handleWallPaperChange}
        accept="image/*"
      />
      <AnimatePresence>
        {wallpaper && (
          <motion.label
            {...animProps1}
            htmlFor="wallpaperImage"
            className="cursor-pointer w-full h-36 sm:h-40 overflow-hidden rounded-md drop-shadow-lg"
          >
            {isLoadingWallpaper ? (
              <Skeleton
                htmlFor="wallpaperImage"
                className="cursor-pointer w-full h-36 sm:h-40 overflow-hidden rounded-md"
              />
            ) : (
              <img
                src={wallpaper}
                alt=""
                className="w-full h-full overflow-hidden object-cover hover:scale-110 duration-100"
                loading="lazy"
              />
            )}
          </motion.label>
        )}
      </AnimatePresence>
      <Button
        onClick={handleUploadImage}
        radius="sm"
        color="primary"
        startContent={<ImageIcon className="text-base" />}
      >
        Upload Wallpaper
      </Button>
      <Checkbox
        radius="sm"
        defaultSelected={wallpaperActive}
        onValueChange={handleChangeWallpaperActivity}
      >
        Active wallpaper
      </Checkbox>
    </SubSectionWrapper>
  );
};

const WallpaperPositions = ({ heading, wallpaperPosition }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const updateMethod = useAuthPatch();
  const handleChangeWallpaperPosition = async (e) => {
    if (!e?.target?.value) return;

    setIsLoading((prev) => true);

    const { success, data } = await updateMethod(USER_PREFERENCES_DATA_API, {
      wallpaperPosition: e.target.value,
    });

    setIsLoading((prev) => false);
    if (!success) return;

    return dispatch(setPreferencesStates(data));
  };
  const POSITION_BOX_CLASSES = "w-24 h-24 rounded-md shadow-2xl border-2";
  return (
    <SubSectionWrapper>
      <SettingHeading>{heading}</SettingHeading>
      <AnimatePresence>
        {isLoading ? (
          <motion.div {...animProps1}>
            <Skeleton className={POSITION_BOX_CLASSES} />
          </motion.div>
        ) : (
          <motion.form
            {...animProps1}
            className={`${POSITION_BOX_CLASSES} grid grid-cols-3 grid-rows-3 gap-2 p-2`}
          >
            {wallpaperPositionList.map((key, _) => (
              <React.Fragment key={key}>
                <input
                  type="radio"
                  name="wallpaper_position"
                  id={key}
                  value={key}
                  hidden
                  checked={key === wallpaperPosition}
                  onChange={handleChangeWallpaperPosition}
                />
                <label
                  className={`relative grid place-items-center w-full h-full rounded-full border-2 border-primary-500 cursor-pointer ${
                    key === wallpaperPosition
                      ? "scale-100 bg-primary-500"
                      : "scale-80 bg-transparent"
                  }`}
                  htmlFor={key}
                >
                  <span className="absolute inset-[2px] rounded-full border-2 border-background-900"></span>
                </label>
              </React.Fragment>
            ))}
          </motion.form>
        )}
      </AnimatePresence>
    </SubSectionWrapper>
  );
};

const PersonalizationSection = () => {
  const {
    theme,
    wallpaper,
    wallpaperActive,
    wallpaperMode,
    wallpaperPosition,
  } = useSelector((state) => state.preferencesStates.preference);
  return (
    <Suspense fallback={<SettingPopupWindowLoader />}>
      <div className="w-full flex flex-col gap-4 pb-4">
        <ModeSetting mode={theme} typeOfMode="theme" heading="Theme" />
        <WallpapperSetting
          wallpaper={wallpaper}
          wallpaperActive={wallpaperActive}
          wallpaperMode={wallpaperMode}
        />
        <ModeSetting
          mode={wallpaperMode}
          typeOfMode="wallpaperMode"
          heading="Wallpaper Mode"
        />
        <WallpaperPositions
          heading="Wallpaper Position"
          wallpaperPosition={wallpaperPosition}
        />
      </div>
    </Suspense>
  );
};

export default PersonalizationSection;
