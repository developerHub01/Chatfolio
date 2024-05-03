import { Button } from "@nextui-org/react";
import React from "react";
import { CloseIcon } from "../../constants/icons";

const FriendProfile = () => {
  return (
    <div className="fixed top-0 right-0 z-50 translate-x-0 w-[90%] max-w-[500px] h-screen shadow-lg p-2 bg-background-900">
      <Button isIconOnly className="">
        <CloseIcon />
      </Button>
    </div>
  );
};

export default FriendProfile;
