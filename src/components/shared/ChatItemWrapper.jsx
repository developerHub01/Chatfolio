import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// import { BsArchive as ArchivedIcon } from "react-icons/bs";
// import ContextMenu from "../shared/ContextMenu";

// const menuItems = [
//   {
//     id: "cut",
//     Icon: ArchivedIcon,
//     text: "Cut",
//     onClick: () => {},
//   },
//   {
//     id: "copy",
//     Icon: ArchivedIcon,
//     text: "Copy",
//     onClick: () => {},
//   },
//   {
//     id: "paste",
//     Icon: ArchivedIcon,
//     text: "Paste",
//     onClick: () => {},
//   },
// ];

const chatAnim = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  whileInView: {
    scale: 1,
    opacity: 1,
  },
  whileHover: {
    scale: 0.95,
  },
};

const ChatItemWrapper = ({ children, ...props }) => {
  const { position } = useSelector((state) => state.uiStates.contextMenu);
  return (
    <motion.div
      {...chatAnim}
      className="w-full flex items-center gap-3 sm:gap-4 p-3 bg-background-900 hover:bg-background-800/40 select-none cursor-pointer rounded-lg md:rounded-xl border-b-2 border-background-800/30"
      {...props}
    >
      {children}
      {/* {position && <ContextMenu menuItems={menuItems} />} */}
    </motion.div>
  );
};

export default ChatItemWrapper;
