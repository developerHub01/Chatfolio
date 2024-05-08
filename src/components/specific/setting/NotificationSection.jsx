import React, { Suspense, useRef, useState } from "react";
import SettingPopupWindowLoader from "../../loaders/SettingPopupWindowLoader";
import { AnimatePresence, motion } from "framer-motion";
import { animProps1 } from "../../animation/animationList";
import {
  Button,
  Chip,
  Divider,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import useAuthPatch from "../../../hooks/useAuthPatch";
import { USER_PREFERENCES_DATA_API } from "../../../constants/values";
import { setPreferencesState } from "../../../redux/slices/preferencesSlice";
import { LoaderIcon, PlayIcon } from "../../../constants/icons";
import SettingHeading from "./SettingHeading";

const permissionAnim = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
  exit: {
    scale: 0,
  },
};

const toneList = [
  ...Array(7)
    .fill(0)
    .map((item, i) => ({
      id: i + 1 + "",
      text: `Tone ${i + 1}`,
    })),
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

const Permissions = ({ messagesNotification, callsNotification }) => {
  const [isLoading, setLoading] = useState({
    messagesNotification: false,
    callsNotification: false,
  });
  const dispatch = useDispatch();
  const updateMethod = useAuthPatch();
  const permissionList = [
    {
      id: "messagesNotification",
      text: "messages",
      isActive: messagesNotification,
    },
    {
      id: "callsNotification",
      text: "calls",
      isActive: callsNotification,
    },
  ];

  const handlePermissionChange = async (value, id) => {
    setLoading((prev) => ({
      ...prev,
      [id]: true,
    }));
    const { success, data } = await updateMethod(USER_PREFERENCES_DATA_API, {
      [id]: value,
    });

    setLoading((prev) => ({
      ...prev,
      [id]: false,
    }));
    if (success) return dispatch(setPreferencesState(data));
  };

  return (
    <SubSectionWrapper>
      {permissionList.map(({ id, text, isActive }, _) => (
        <div key={id} className="w-full flex justify-between flex-wrap gap-1">
          <h5 className="text-lg capitalize select-none text-foreground-200 font-semibold">
            {text}
          </h5>
          <div className="flex justify-center items-center gap-2">
            <div className="capitalize text-lg font-medium text-foreground-300">
              <Chip
                color="primary"
                variant="bordered"
                className="select-none"
                startContent={
                  <AnimatePresence>
                    {isLoading[id] && (
                      <motion.span {...permissionAnim}>
                        <LoaderIcon className="animate-spin" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                }
              >
                {isActive ? "on" : "off"}
              </Chip>
            </div>
            <Switch
              isSelected={isActive}
              size="md"
              onValueChange={(value) => handlePermissionChange(value, id)}
            />
          </div>
        </div>
      ))}
    </SubSectionWrapper>
  );
};
const Tones = ({ notificationMessagesTone, notificationGroupsTone }) => {
  const dispatch = useDispatch();
  const updateMethod = useAuthPatch();
  const toneTypeList = [
    {
      id: "notificationMessagesTone",
      activeTone: notificationMessagesTone,
      text: "messages",
    },
    {
      id: "notificationGroupsTone",
      activeTone: notificationGroupsTone,
      text: "groups",
    },
  ];

  const handleChangeTone = async (value, id) => {
    const { success, data } = await updateMethod(USER_PREFERENCES_DATA_API, {
      [id]: [...value][0],
    });
    if (!success) return;

    return dispatch(setPreferencesState(data));
  };

  const handlePlayTone = (typeOfTone) => {
    const audioPath = `./notifications/${
      typeOfTone === "notificationMessagesTone"
        ? notificationMessagesTone
        : notificationGroupsTone
    }.wav`;

    const player = new Audio(audioPath);
    player.play();
  };

  return (
    <SubSectionWrapper>
      <SettingHeading>Notification tones</SettingHeading>
      <div className="w-full flex flex-col gap-3">
        {toneTypeList.map(({ id, activeTone, text }, _) => {
          return (
            <div key={id} className="w-full flex flex-col justify-center gap-3">
              <span className="capitalize text-base text-foreground-200 font-semibold select-none">
                {text}
              </span>
              <div className="flex gap-3 justify-start items-center">
                <Button
                  isIconOnly
                  radius="sm"
                  size="md"
                  color="primary"
                  onClick={() => handlePlayTone(id)}
                >
                  <PlayIcon className="text-xl" />
                </Button>
                <Select
                  selectionMode="single"
                  label="Select Tones"
                  placeholder="Select Tones"
                  variant="bordered"
                  color="primary"
                  defaultSelectedKeys={[activeTone]}
                  onSelectionChange={(value) => handleChangeTone(value, id)}
                  size="sm"
                  classNames={{
                    label: "hidden",
                    innerWrapper: "!pt-0 border-primary-500",
                    trigger: "!hover:border-primary-500 !p-0 !px-4",
                    listboxWrapper: "!p-0",
                  }}
                >
                  {toneList.map(({ id, text }, _) => {
                    return (
                      <SelectItem
                        key={id}
                        value={id}
                        variant="solid"
                        color="primary"
                        className="text-capitalize"
                      >
                        {text}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>
            </div>
          );
        })}
      </div>
    </SubSectionWrapper>
  );
};

const NotificationSection = () => {
  const {
    messagesNotification,
    callsNotification,
    notificationMessagesTone,
    notificationGroupsTone,
  } = useSelector((state) => state.preferencesState.preference);

  return (
    <Suspense fallback={<SettingPopupWindowLoader />}>
      <div className="w-full flex flex-col justify-center items-center gap-2 sm:gap-4">
        <Permissions
          messagesNotification={messagesNotification}
          callsNotification={callsNotification}
        />
        <Divider orientation="horizontal" className="bg-primary-500/20 h-1" />
        <Tones
          notificationMessagesTone={notificationMessagesTone}
          notificationGroupsTone={notificationGroupsTone}
        />
      </div>
    </Suspense>
  );
};

export default NotificationSection;
