import React from "react";
import EmojiGifSearchbar from "./EmojiGifSearchbar";
import { EMOJI } from "../../../constants/values";
import { useDispatch, useSelector } from "react-redux";
import { emojiCategoriesApi } from "../../../constants/apis";
import useFetchData from "../../../hooks/useFetchData";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ScrollShadow,
  Skeleton,
} from "@nextui-org/react";
import { IoIosArrowUp as UpArrowIcon } from "react-icons/io";
import { changeActiveEmojiOrGifsSubCategory } from "../../../redux/slices/uiStatesSlice";

const EmojiSkeleton = () => {
  return (
    <div className="w-full h-full overflow-y-auto grid grid-cols-4 md:grid-cols-5 gap-2">
      {Array(12)
        .fill(0)
        .map((_, key) => (
          <Skeleton
            key={key}
            className="block w-full h-full rounded-md"
          ></Skeleton>
        ))}
    </div>
  );
};

const EmojiContainerLayout = () => {
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
          <div className="w-full h-full overflow-y-auto grid grid-cols-4 md:grid-cols-5 gap-2">
            {/* <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ad
              ut, eveniet, dolores eaque veritatis, illum assumenda facere
              adipisci officiis culpa asperiores consectetur hic recusandae!
              Atque voluptate eos officia natus! Deserunt, laborum odio quisquam
              nobis assumenda deleniti iure expedita voluptate delectus nostrum
              dolorum nemo eligendi fuga enim facilis laboriosam iusto, ratione
              cumque. Facere repudiandae aspernatur sit unde soluta odio
              temporibus quis maxime minima voluptatum, nobis assumenda earum
              voluptates iure laboriosam rem. Blanditiis, cumque, distinctio ex,
              numquam commodi earum quas necessitatibus explicabo error ad
              libero recusandae? Earum commodi excepturi nihil in dolores quam,
              ex, porro, ipsa voluptates quae consequatur repudiandae atque
              tenetur quas molestiae ea reprehenderit provident pariatur
              molestias. Optio ratione exercitationem quos at provident magni
              nisi temporibus quibusdam alias! Est nesciunt iste inventore? A
              eaque rerum facilis omnis voluptatem assumenda accusantium nisi
              velit qui deserunt veritatis accusamus aliquid, maiores at quam
              est? Quasi, magni. Omnis nisi eveniet debitis dolor veritatis
              beatae nam ducimus ea sit, asperiores saepe eum officiis
              reiciendis tenetur commodi voluptatem. Rerum, culpa cum. Cum
              reiciendis placeat sequi debitis ullam voluptates dolore non
              aperiam fugiat impedit ab commodi, vitae maiores aliquam minus id
              soluta, in suscipit ut. Porro natus aliquid enim itaque! Culpa rem
              eveniet aliquam reprehenderit animi nesciunt! Officia, magnam.
              Quaerat quibusdam consequatur tenetur sequi repudiandae molestias
              eligendi blanditiis alias odit ipsum iusto sint, quo, maxime
              recusandae harum quod cum repellat ullam reiciendis perferendis
              iste assumenda! A iure deserunt aliquam veritatis quos architecto
              porro eveniet voluptatum rerum ipsum, possimus facere suscipit
              ipsam tempora vitae quibusdam! Repellendus ad incidunt vel
              consequuntur consectetur dolorem inventore quam placeat.
              Exercitationem, consequuntur tenetur. Illo eum minus possimus
              magni tempore, placeat ut sit explicabo modi! Fugit est provident
              molestiae. Quae dicta fugit quod provident voluptatibus odio quos
              facilis exercitationem possimus fuga accusamus quam aliquid
              dolores, dolor quia molestias nihil, alias facere! Accusantium
              fugit aut distinctio molestias nulla, modi ut assumenda iusto
              adipisci minima cupiditate explicabo quis voluptas, sed quaerat a
              dolore saepe repellendus voluptates repudiandae? Dicta pariatur
              sint harum impedit iusto quisquam ad minus consectetur consequatur
              delectus culpa, numquam omnis qui molestiae atque ipsum at enim,
              animi, aperiam veritatis fugiat inventore eum. A dolorum deleniti
              id, numquam eum soluta omnis, architecto nam nostrum esse
              similique impedit, sit blanditiis? Nostrum earum consectetur optio
              dicta porro natus suscipit aut corporis. Perspiciatis incidunt
              cupiditate aperiam quos velit sequi, optio, ullam itaque tempore
              accusamus ab hic reprehenderit ipsum quibusdam mollitia eaque quo,
              eius exercitationem ad iste sed expedita omnis magnam aliquid. Et
              eaque unde iusto earum saepe tempora expedita culpa facere
              eligendi vel, ut eos, ipsam optio dolorum consequuntur excepturi
              consequatur quod exercitationem quia. Cupiditate eum ea officiis
              possimus, quo tempore dicta, ipsum nulla eligendi, sed ipsa
              quaerat ratione quis? Est cum id totam temporibus eveniet
              distinctio enim facilis sapiente ipsam at ad doloremque cupiditate
              voluptatum quibusdam impedit, nesciunt maiores? Cum ratione ipsam
              suscipit ab. Esse, praesentium illum alias repellat cupiditate
              doloribus commodi animi dolorem. Inventore ex minus deleniti
              maxime nulla error a obcaecati perferendis provident, atque ullam
              perspiciatis voluptates, fugit totam exercitationem, eveniet fuga
              veritatis nobis?
            </p> */}
          </div>
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
