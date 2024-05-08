import { Button, ButtonGroup, Skeleton } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  BackIcon,
  ResizeIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../../constants/icons";
import { togglePreviewImage } from "../../redux/slices/uiStatesSlice";

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
  const [zoomPosition, setZoomPosition] = useState(null);

  const maxZoomLimit = 1000,
    minZoomLimit = 20;

  const handleZoomIn = () => {
    setZoomLevel((prev) => prev + 10);
    setZoomPosition((prev) => null);
  };
  const handleZoomOut = () => {
    setZoomLevel((prev) => prev - 10);
    setZoomPosition((prev) => null);
  };
  const handleZoomResize = () => {
    setZoomLevel((prev) => 100);
    setZoomPosition((prev) => null);
  };

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

  const handleImageScroll = (e) => {
    const scrollAmout = e.deltaX || e.deltaY;

    let newScale = 0;
    if (scrollAmout >= 0 && zoomLevel > minZoomLimit) newScale = zoomLevel - 15;
    else if (scrollAmout < 0 && zoomLevel < maxZoomLimit)
      newScale = zoomLevel + 15;
    else return;

    const ratio = 1 - newScale / zoomLevel;

    setZoomLevel((prev) => newScale);

    setZoomPosition((prev) => () => {
      const left = prev?.x ? prev.x : 0,
        top = prev?.x ? prev.x : 0;
      return {
        x: left + (e.clientX - left) * ratio,
        y: top + (e.clientY - top) * ratio,
      };
    });
  };

  return (
    <motion.div
      {...animProp}
      key={previewImage}
      className="fixed top-0 left-0 w-screen h-screen z-[9999999] bg-background-900/50 backdrop-blur-sm flex flex-col justify-between items-center gap-2 p-4"
    >
      <div className="w-full flex justify-between items-center gap-1">
        <Button
          isIconOnly
          color="primary"
          radius="sm"
          onClick={handleClosePreviewImage}
        >
          <BackIcon className="text-xl" />
        </Button>
        <ButtonGroup radius="sm" color="primary">
          {sizeButtonList.map(({ id, Icon, onClick, isDisable }, index) => (
            <Button
              key={`${id}-${index + 1}`}
              isIconOnly
              onClick={onClick}
              isDisabled={isDisable}
            >
              <Icon className="text-xl" />
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        {previewImage ? (
          <img
            onWheelCapture={handleImageScroll}
            radius="sm"
            onDoubleClick={handleDoubleClickZoom}
            className="h-full w-full object-contain"
            alt="Chatfolio Preview Image"
            src={previewImage}
            style={{
              transform: `scale(${zoomLevel / 100}) translate(${
                zoomPosition?.x ? zoomPosition.x : 0
              }px, ${zoomPosition?.y ? zoomPosition.y : 0}px)`,
            }}
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
    </motion.div>
  );
};

export default PreviewImage;
