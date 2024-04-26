import React, { Suspense, useEffect, useRef } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { closeContextMenu } from "../../redux/slices/uiStatesSlice";
import { AnimatePresence, animate, motion } from "framer-motion";
import { handlePosition } from "../../utils/contextMenu";

const animationProps = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};

const ContextMenu = ({ menuItems }) => {
  const { position: contextMenuPosition, contextData } = useSelector(
    (state) => state.uiStates.contextMenu
  );
  const contextMenuRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (!contextMenuRef?.current?.contains(e.target)) {
        dispatch(closeContextMenu());
      }
    };
    document.addEventListener("click", handleContextMenu);
    document.addEventListener("scroll", (e) => {
      console.log("scroll==================");
    });
    return () => {
      document.removeEventListener("click", handleContextMenu);
      document.removeEventListener("scroll", handleContextMenu);
    };
  }, []);

  console.log("=========================");
  console.log(contextMenuPosition);
  console.log(window.innerHeight);
  console.log(contextMenuRef?.current?.clientWidth);

  const { clientX, clientY } = handlePosition(
    contextMenuRef,
    contextMenuPosition?.clientX,
    contextMenuPosition?.clientY
  );

  const handleListAction = (key) => {
    dispatch(closeContextMenu());
  };

  return (
    <AnimatePresence>
      {contextMenuPosition && (
        <motion.div
          {...animationProps}
          key={contextData.id}
          ref={contextMenuRef}
          className={`fixed w-48 flex justify-center items-center rounded-md bg-foreground-50 shadow-sm z-40`}
          style={{
            left: `${clientX}px`,
            top: `${clientY}px`,
            // originX: 0,
            // originY: 0,
          }}
        >
          <Listbox
            variant="solid"
            color="primary"
            aria-label="Actions"
            className="w-full flex flex-col justify-center bg-background-900 text-foreground-50"
            onAction={handleListAction}
          >
            {menuItems.map(({ id, Icon, text, onClick }, i) => (
              <ListboxItem
                key={id}
                startContent={<Icon className="" />}
                className="rounded-md text-ellipsis"
                showDivider={i < menuItems.length - 1}
              >
                {text}
              </ListboxItem>
            ))}
          </Listbox>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
