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

const ChatItemWrapper = ({ children, ...props }) => {
  const { position } = useSelector((state) => state.uiStates.contextMenu);
  return (
    <motion.div
      whileHover={{ scale: 0.95 }}
      className="w-full flex items-center gap-3 sm:gap-4 p-3 bg-foreground-50 select-none cursor-pointer hover:bg-primary-50 rounded-lg md:rounded-xl border-b-2 border-foreground-100"
      {...props}
    >
      {children}
      {/* {position && <ContextMenu menuItems={menuItems} />} */}
    </motion.div>
  );
};

export default ChatItemWrapper;
