import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
// import { Navigation } from "./components/Navigation";
// import { Slider } from "./components/Slider";
import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStoryTempImage,
  toggleAddStory,
} from "../../../redux/slices/uiStatesSlice";
import uploadImage from "../../../assets/images/uploadImage.jpeg";
import { BrushIcon } from "../../../constants/icons";

const PreviewImage = ({ imageState }) => {
  return (
    <Image
      className="w-full h-full object-contain rounded-none"
      src={imageState ? URL.createObjectURL(imageState) : uploadImage}
      fallbackSrc="./uploadImage.jpg"
      alt="Story image"
    />
  );
};

const CreateStoryModal = () => {
  const [storyImage, setStoryImage] = useState(null);
  const { active: isActive } = useSelector((state) => state.uiStates.addStory);
  const dispatch = useDispatch();
  const handleOnOpenChange = (open) => {
    dispatch(toggleAddStory());
    if (!open) {
      dispatch(setStoryTempImage(null));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  const handleUploadImageOnChange = (e) => {
    setStoryImage((prev) => e.target.files[0]);
    dispatch(setStoryTempImage());
  };
  return (
    <Suspense fallback={<h1>Loading modal</h1>}>
      <Modal
        isOpen={isActive}
        onOpenChange={handleOnOpenChange}
        className=""
        classNames={{
          wrapper: "justify-center items-center",
          base: "!mt-0 !mb-0 !ml-0 !mr-0",
          footer: "flex justify-between items-center gap-1",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-center text-xl font-bold justify-center items-center">
                Create Story
              </ModalHeader>
              <ModalBody className="w-full relative">
                <input
                  type="file"
                  name="storyImage"
                  id="storyImage"
                  hidden
                  onChange={handleUploadImageOnChange}
                />
                <label
                  htmlFor="storyImage"
                  className="relative grid place-items-center rounded-lg overflow-hidden max-h-[90vh] max-w-[90vw]"
                >
                  <PreviewImage imageState={storyImage} />
                  {/* <div className="absolute inset-0 bg-foreground-50 z-10"></div> */}
                </label>
                {/* <Textarea
                  variant="bordered"
                  placeholder="Story Caption"
                  disableAnimation
                  maxRows={1}
                  disableAutosize
                  className="absolute left-1/2 bottom-2 -translate-x-1/2 w-full"
                /> */}
                {/* <Navigation mode={mode} onChange={setMode} /> */}
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={!storyImage}
                  endContent={<BrushIcon />}
                  radius="lg"
                  className=""
                  size="md"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  isDisabled={!storyImage}
                  color="primary"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Suspense>
  );
};

export default CreateStoryModal;
