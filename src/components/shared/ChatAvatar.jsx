import { Avatar, Badge } from "@nextui-org/react";
import React from "react";
import { RxAvatar as AvatarIcon } from "react-icons/rx";

const ProfileAvatar = (props) => {
  return (
    <Avatar
      isBordered
      color="primary"
      showFallback
      {...props}
      className="flex-grow-0 flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16"
      fallback={<AvatarIcon className="text-5xl" />}
    />
  );
};

const avatarPic =
  "https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg";

const ChatAvatar = ({ src = avatarPic, name = "Avatar", isActive = false }) => {
  return (
    <>
      {isActive ? (
        <Badge
          color="success"
          content=""
          placement="bottom-right"
          shape="circle"
          size="lg"
          className="flex-grow-0 flex-shrink-0"
        >
          <ProfileAvatar src={src} name={name} />
        </Badge>
      ) : (
        <ProfileAvatar src={src} name={name} />
      )}
    </>
  );
};

export default ChatAvatar;
