import { Avatar, Badge } from "@nextui-org/react";
import React from "react";
import { AvatarIcon } from "../../constants/icons";

const ProfileAvatar = (props) => {
  const { size = "16", ...otherProps } = props;
  return (
    <Avatar
      isBordered
      color="primary"
      showFallback
      {...otherProps}
      className={`cursor-pointer flex-grow-0 flex-shrink-0 w-10 h-10 sm:w-${size} sm:h-${size}`}
      fallback={<AvatarIcon className="text-5xl" />}
    />
  );
};

const ChatAvatar = ({
  src,
  name = "Avatar",
  isActive = false,
  size = "16",
}) => {
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
          <ProfileAvatar src={src} name={name} size={size} />
        </Badge>
      ) : (
        <ProfileAvatar src={src} name={name} size={size} />
      )}
    </>
  );
};

export default ChatAvatar;
