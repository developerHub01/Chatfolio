import { Avatar, ScrollShadow } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { AvatarIcon } from "../../../constants/icons";
import { motion } from "framer-motion";

const ChatBackground = () => {
  const { wallpaper, wallpaperActive, wallpaperMode, wallpaperPosition } =
    useSelector((state) => state.preferencesStates.preference) || {};

  const backgroundPositionStyle = wallpaperPosition?.includes("-")
    ? wallpaperPosition.split("-").join(" ")
    : wallpaperPosition;

  return (
    <>
      {wallpaper && wallpaperActive && (
        <span
          className={`absolute top-0 left-0 w-full h-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full pointer-events-none -z-10 ${
            wallpaperMode === "dark"
              ? "before:bg-zinc-950/70"
              : "before:bg-white/70"
          } !bg-cover !bg-fixed`}
          style={{
            background: `url(${wallpaper})`,
            backgroundPosition: backgroundPositionStyle,
          }}
        ></span>
      )}
    </>
  );
};

const EmptyChat = ({ avatar, fullName, bio }) => {
  return (
    <motion.div
      exit={{
        scale: 0,
        opacity: 0,
      }}
      className="w-full h-full flex flex-col gap-2 justify-center items-center"
    >
      <Avatar
        src={avatar}
        isBordered
        color="primary"
        className="w-28 h-24 sm:h-28 mb-3"
        fallback={<AvatarIcon className="text-5xl" />}
      />
      <h3
        className="text-xl text-foreground-100 font-bold"
        style={{
          textTransform: "capitalize",
        }}
      >
        {fullName}
      </h3>
      <p className="text-foreground-200">{bio}</p>
    </motion.div>
  );
};

const ChatContents = () => {
  const { activeChat } = useSelector((state) => state.activeChatStates);
  const { chatName } = activeChat || {};
  const { message } = useSelector((state) => state.uiStates);
  return (
    <div className="w-full h-auto flex-1 overflow-hidden flex justify-center items-end py-1 relative">
      <ChatBackground />
      {chatName ? (
        <ScrollShadow hideScrollBar className="w-full h-full z-0">
          <p className="whitespace-pre">{message}</p>
        </ScrollShadow>
      ) : (
        <EmptyChat {...activeChat} />
      )}
    </div>
  );
};

export default ChatContents;
