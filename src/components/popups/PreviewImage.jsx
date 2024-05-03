import { Button, ButtonGroup, Image } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  BackIcon,
  ResizeIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../../constants/icons";
import { togglePreviewImage } from "../../redux/slices/uiStatesSlice";
import { IMAGE_FALLBACK } from "../../constants/values";

const animProp = {
  initial: {
    opacity: 0,
    scale: 0.5,
    filter: "blur(25px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0)",
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    filter: "blur(25px)",
  },
};

const PreviewImage = () => {
  const { previewImage } = useSelector((state) => state.uiStates);
  const dispatch = useDispatch();
  const [zoomLevel, setZoomLevel] = useState(100);
  const wrapperRef = useRef(null);
  const buttonGroupRef = useRef(null);
  const backButtonRef = useRef(null);
  const previewImageRef = useRef(null);

  const maxZoomLimit = 200,
    minZoomLimit = 20;

  useEffect(() => {
    const handleWrapperRefClick = (e) => {
      const isClickedBlank = ![
        buttonGroupRef,
        backButtonRef,
        previewImageRef,
      ].some((item) => item.current.contains(e.target));
      isClickedBlank && dispatch(togglePreviewImage(null));
    };

    wrapperRef?.current &&
      wrapperRef.current.addEventListener("click", handleWrapperRefClick);

    return () =>
      wrapperRef?.current &&
      wrapperRef.current.removeEventListener("click", handleWrapperRefClick);
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => prev + 10);
  const handleZoomOut = () => setZoomLevel((prev) => prev - 10);
  const handleZoomResize = () => setZoomLevel((prev) => 100);

  const sizeButtonList = [
    {
      id: "resize",
      Icon: ResizeIcon,
      onClick: handleZoomResize,
      isDisable: zoomLevel === 100,
    },
    {
      id: "zoomIn",
      Icon: ZoomInIcon,
      onClick: handleZoomIn,
      isDisable: zoomLevel >= maxZoomLimit,
    },
    {
      id: "zoomOut",
      Icon: ZoomOutIcon,
      onClick: handleZoomOut,
      isDisable: zoomLevel <= minZoomLimit,
    },
  ];

  const handleClosePreviewImage = () => dispatch(togglePreviewImage(null));
  const handleDoubleClickZoom = (e) => {
    setZoomLevel((prev) =>
      prev - minZoomLimit > (maxZoomLimit - minZoomLimit) / 2
        ? prev - Math.round(20 + Math.random() * 30)
        : prev + Math.round(20 + Math.random() * 30)
    );
  };

  return (
    <motion.div
      {...animProp}
      ref={wrapperRef}
      key={previewImage}
      className="fixed top-0 left-0 w-screen h-screen z-[9999999] bg-background-900/50 grid place-items-center"
    >
      <motion.div className="w-full h-full flex flex-col gap-1 p-4">
        <div className="w-full flex justify-between items-center gap-1">
          <Button
            isIconOnly
            color="primary"
            radius="sm"
            onClick={handleClosePreviewImage}
            ref={backButtonRef}
          >
            <BackIcon className="text-xl" />
          </Button>
          <ButtonGroup radius="sm" color="primary" ref={buttonGroupRef}>
            {sizeButtonList.map(({ id, Icon, onClick, isDisable }) => (
              <Button
                key={id}
                isIconOnly
                onClick={onClick}
                isDisabled={isDisable}
              >
                <Icon className="text-xl" />
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="w-full h-full max-h-[100%] max-w-[90vw] flex justify-center items-center overflow-hidden">
          <Image
            ref={previewImageRef}
            radius="sm"
            onDoubleClick={handleDoubleClickZoom}
            className="w-full h-full object-contain shadow-2xl cursor-pointer"
            alt="Chatfolio Preview Image"
            src={previewImage}
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transition: `all 0.3s ease`,
            }}
            fallbackSrc={IMAGE_FALLBACK}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreviewImage;
