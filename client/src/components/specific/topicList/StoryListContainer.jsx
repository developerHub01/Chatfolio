import React, { memo } from "react";
import MainListContainerHeader from "../../shared/MainListContainerHeader";
import ListContainer from "../../shared/ListContainer";
import StoryItem from "../../shared/StoryItem";
import { IoMdAdd as AddIcon } from "react-icons/io";

const buttonList = [
  {
    id: "newStory",
    Icon: AddIcon,
  },
];

const StoryListContainer = () => {
  return (
    <>
      <MainListContainerHeader buttonList={buttonList} headingText="Stories" />
      <ListContainer>
        {Array(20)
          .fill(0)
          .map((item, key) => (
            <StoryItem key={key} />
          ))}
      </ListContainer>
    </>
  );
};

export default memo(StoryListContainer);
