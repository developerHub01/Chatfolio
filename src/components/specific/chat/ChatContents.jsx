import { ScrollShadow } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

const ChatContents = () => {
  const { wallpaper, wallpaperActive, wallpaperMode, wallpaperPosition } =
    useSelector((state) => state.preferencesState.preference) || {};

  const { message } = useSelector((state) => state.uiStates);
  const backgroundPositionStyle = wallpaperPosition?.includes("-")
    ? wallpaperPosition.split("-").join(" ")
    : wallpaperPosition;
  return (
    <div className="w-full h-auto flex-1 overflow-hidden flex justify-center items-end py-1 relative">
      {wallpaper && wallpaperActive && (
        <span
          className={`absolute top-0 left-0 w-full h-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full ${
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
      <ScrollShadow hideScrollBar className="w-full h-full ">
        <p className="whitespace-pre">{message}</p>
      </ScrollShadow>
    </div>
  );
};

export default ChatContents;
