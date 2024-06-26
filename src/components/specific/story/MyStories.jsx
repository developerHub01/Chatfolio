import React, { lazy } from "react";
import StoryItem from "./StoryItem";
import { Avatar, Badge, Tooltip } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { toggleAddStory } from "../../../redux/slices/uiStatesSlice";
import { AnimatePresence, motion } from "framer-motion";
import { AddIcon, AvatarIcon, EyeIcon } from "../../../constants/icons";

const CreateStoryModal = lazy(() => import("./CreateStoryModal"));

const isThereMyStories = true;
const avatarPic =
  "https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg";

const StoryAvatar = ({ onClick, content, Icon, src, name }) => {
  return (
    <motion.div
      whileHover={{
        scale: 0.8,
      }}
      className="flex flex-shrink-0 justify-center items-center"
      onClick={onClick}
    >
      <Tooltip
        placement="bottom"
        showArrow={true}
        content={content}
        color="primary"
        radius="sm"
      >
        <div className="cursor-pointer px-4">
          <Badge
            color="success"
            content={<Icon className="text-xl" />}
            placement="bottom-right"
            shape="circle"
            className="size-7"
          >
            <Avatar
              isBordered
              color="primary"
              showFallback
              src={src}
              name={name}
              className="flex-grow-0 flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16"
              fallback={<AvatarIcon className="text-5xl" />}
            />
          </Badge>
        </div>
      </Tooltip>
    </motion.div>
  );
};

const storyAvatarData = [
  {
    id: "addStory",
    content: "Add story",
    src: avatarPic,
    name: "You",
    Icon: AddIcon,
  },
  {
    id: "viewYourStory",
    content: "View Your stories",
    src: avatarPic,
    name: "You",
    Icon: EyeIcon,
  },
];

const MyStories = ({ src = avatarPic, name = "Me" }) => {
  const dispatch = useDispatch();
  const handleOpenAddStoryModal = () => {
    dispatch(toggleAddStory());
  };
  const handleOpenMyStoryModal = () => {
    // dispatch(toggleAddStory());
  };
  storyAvatarData[0].onClick = handleOpenAddStoryModal;
  storyAvatarData[1].onClick = handleOpenMyStoryModal;
  return (
    <AnimatePresence>
      <motion.div
        className="w-full flex justify-evenly items-center gap-3"
        key={"myStories"}
        initial={{ y: "50%", scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
      >
        {storyAvatarData.map((item, _) => (
          <StoryAvatar key={item.id} {...item} />
        ))}
        <CreateStoryModal />
      </motion.div>
    </AnimatePresence>
  );
};

export default MyStories;
