import React from "react";
import EmojiGifSearchbar from "./EmojiGifSearchbar";
import { EMOJI } from "../../../constants/values";
import { useDispatch, useSelector } from "react-redux";
import {
  emojiByCategoryApi,
  emojiCategoriesApi,
} from "../../../constants/apis";
import useFetchData from "../../../hooks/useFetchData";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { changeActiveEmojiOrGifsSubCategory } from "../../../redux/slices/uiStatesSlice";
import { motion } from "framer-motion";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { UpArrowIcon } from "../../../constants/icons";
const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

const EmojiSkeleton = () => {
  return (
    <div className="w-full h-full overflow-y-auto grid grid-cols-4 md:grid-cols-5 gap-2">
      {Array(12)
        .fill(0)
        .map((_, key) => (
          <Skeleton key={key} className="block w-full h-full rounded-md" />
        ))}
    </div>
  );
};

const EmojiList = () => {
  const { activeEmojiSubCategory } = useSelector(
    (state) => state.uiStates.activeEmojiOrGifs
  );
  const { data, isLoading, error } = useFetchData(
    ["emoji", activeEmojiSubCategory],
    emojiByCategoryApi(activeEmojiSubCategory)
  );

  if (isLoading || !data) return <EmojiSkeleton />;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="w-full h-full overflow-y-auto grid grid-cols-4 md:grid-cols-5 gap-2">
      {data.map(({ character, codePoint }, i) => (
        <motion.div
          key={`${codePoint}-${i}`}
          whileHover={{
            scale: 0.9,
          }}
          className="w-full h-full grid place-items-center bg-slate-500 cursor-pointer rounded-md aspect-square overflow-hidden"
        >
          <p className="text-xl md:text-2xl">{character}</p>
        </motion.div>
      ))}
    </div>
  );
};

const EmojiContainerLayout = () => {
  const fetchGifs = (offset) => gf.trending({ offset, limit: 10 });
  const { activeTab } = useSelector(
    (state) => state.uiStates.activeEmojiOrGifs
  );
  const dispatch = useDispatch();
  const {
    data: emojiData,
    isLoading: emojiIsLoading,
    refetch: emojiRefetch,
    error: emojiError,
  } = useFetchData([activeTab], emojiCategoriesApi);
  if (emojiIsLoading) return <h1>Loading...</h1>;
  if (emojiError) return <h1>{emojiError.message}</h1>;

  const handleChangeSubCategory = (category) => {
    if (activeTab === EMOJI)
      dispatch(
        changeActiveEmojiOrGifsSubCategory({ activeEmojiSubCategory: category })
      );
    else
      dispatch(
        changeActiveEmojiOrGifsSubCategory({ activeGifSubCategory: category })
      );
  };

  return (
    <div className="w-full flex-1 overflow-hidden flex flex-col items-center gap-1 ">
      <EmojiGifSearchbar />
      <div className="w-full h-auto overflow-hidden flex-1">
        <div className="w-full h-full overflow-y-auto">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam sint
            temporibus laboriosam numquam, suscipit, illum nam pariatur minima
            esse at obcaecati molestiae maiores aliquam, itaque maxime minus
            modi? Recusandae odit eaque, sint minus eius fugit facere laudantium
            exercitationem praesentium numquam quod, quaerat quos illo iure
            accusamus, rerum laboriosam! Odit libero molestiae ullam alias eos
            enim at eum nisi dolorem dolores voluptas, obcaecati dicta, velit,
            natus dolore ut veniam inventore sed. Explicabo, natus inventore. Ut
            accusamus qui aut placeat! Ipsum nemo a esse labore exercitationem,
            dolorum aperiam ex praesentium illum ea nulla ad eveniet dolore,
            veniam sed libero sequi tempora asperiores eligendi. Veritatis,
            officiis! Dignissimos expedita laborum sunt, neque dolore ratione
            maxime tempora magnam fugit doloremque repellendus quibusdam itaque
            reprehenderit qui voluptates rerum iure aliquid voluptatibus
            corrupti. Vitae itaque ea praesentium, beatae ab ullam rerum
            delectus. Corrupti, harum amet modi aliquam veritatis corporis quod
            nihil repellendus ullam nemo? At voluptatibus perspiciatis facilis
            autem omnis dolore modi unde, laboriosam esse itaque laborum
            accusantium quam cupiditate iure, nostrum id ratione odit
            necessitatibus dolores fugit minus? Animi commodi optio labore
            maiores amet, quam numquam iusto temporibus vitae explicabo quidem,
            nostrum aut? Voluptatum reprehenderit, molestias recusandae ab sint
            assumenda expedita fugit impedit modi neque similique?
          </p>
        </div>
      </div>
      {activeTab === EMOJI ? (
        emojiIsLoading ? (
          <EmojiSkeleton />
        ) : (
          <EmojiList />
        )
      ) : (
        <div className="w-full flex-1 h-full">{isLoading ? <></> : <></>}</div>
      )}
      <div className="w-full flex justify-between items-center gap-1">
        <Dropdown size="sm">
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="w-full"
              startContent={<UpArrowIcon />}
            >
              Categories
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={handleChangeSubCategory}
          >
            <DropdownItem key={"all"} className="">
              All
            </DropdownItem>

            {activeTab === EMOJI
              ? emojiData.map(({ slug }, _) => (
                  <DropdownItem key={slug} className="">
                    {slug}
                  </DropdownItem>
                ))
              : emojiData.map(({ slug }, _) => (
                  <DropdownItem key={slug} className="">
                    {slug}
                  </DropdownItem>
                ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default EmojiContainerLayout;
