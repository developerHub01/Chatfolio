export const animProps1 = {
  initial: {
    opacity: 0,
    scale: 0,
    filter: "blur(25px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0)",
  },
  exit: {
    opacity: 0,
    scale: 0,
    filter: "blur(25px)",
  },
  transition: {
    type: "spring",
    duration: 0.25,
  },
};

export const layoutAnimProps = {
  initial: {
    opacity: 0,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0)",
  },
  transition: {
    duration: 0.2,
  },
};

export const chatPageAnim = {
  initial: {
    x: "50%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "-50%",
    opacity: 0,
  },
};
