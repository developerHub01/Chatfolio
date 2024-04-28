import { Button, ScrollShadow } from "@nextui-org/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveEmojiOrGifs } from "../../../redux/slices/uiStatesSlice";
import { EMOJI, GIFS } from "../../../constants/values";
import EmojiContainerLayout from "./EmojiContainerLayout";

const EmojiGifsPopup = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector(
    (state) => state.uiStates.activeEmojiOrGifs
  );
  const handleChangeTab = (activeTab) => () => {
    dispatch(changeActiveEmojiOrGifs({ activeTab }));
  };

  return (
    <div className="w-80 md:w-[450px] h-96 md:h-[400px] max-w-full max-h-full bg-background-900 p-1 flex flex-col gap-2">
      <div className="w-full flex gap-2">
        <Button
          className="w-full px-3 py-2"
          radius="sm"
          color={activeTab === EMOJI ? "primary" : "default"}
          onClick={handleChangeTab(EMOJI)}
        >
          Emoji
        </Button>
        <Button
          className="w-full px-3 py-2"
          radius="sm"
          color={activeTab === GIFS ? "primary" : "default"}
          onClick={handleChangeTab(GIFS)}
        >
          Gifs
        </Button>
      </div>
      <EmojiContainerLayout />
    </div>
  );
};

export default EmojiGifsPopup;
