import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";

const ListContainer = ({ children }) => {
  const { activeTabId } = useSelector((state) => state.uiStates.sidebar);

  return (
    <AnimatePresence>
      <motion.div
        className="w-full h-full flex flex-col gap-2 p-1 pb-2 overflow-x-hidden overflow-y-auto"
        key={activeTabId}
        initial={{ y: "50%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ListContainer;
