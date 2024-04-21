import { Avatar, Badge } from "@nextui-org/react";
import React, { memo } from "react";
import { RxAvatar as AvatarIcon } from "react-icons/rx";

const avatarPic =
  "https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg";

const ChatAvatar = ({ src = avatarPic, name = "Avatar" }) => {
  return (
    <Badge
      color="success"
      content=""
      placement="bottom-right"
      shape="circle"
      size="lg"
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
  );
};

export default memo(ChatAvatar);
