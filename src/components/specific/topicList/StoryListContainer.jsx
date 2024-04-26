import React from "react";
import MainListContainerHeader from "../../shared/MainListContainerHeader";
import ListContainer from "../../shared/ListContainer";
import StoryItem from "../story/StoryItem";
import { IoMdAdd as AddIcon } from "react-icons/io";
import MyStories from "../story/MyStories";

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
      <MyStories />
      <ListContainer>
        {Array(20)
          .fill(0)
          .map((item, key) => (
            <StoryItem key={key} name="Name one" />
          ))}
      </ListContainer>
    </>
  );
};

export default StoryListContainer;
