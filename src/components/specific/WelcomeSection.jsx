import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { chatPageAnim } from "../animation/animationList";

const WelcomeSection = () => {
  const { activeChat } = useSelector((state) => state.activeChatStates);
  return (
    <AnimatePresence>
      {!activeChat && (
        <motion.div
          {...chatPageAnim}
          className="w-full h-full p-3 grid place-items-center"
        >
          <div className="w-[90%] max-w-lg flex flex-col text-center justify-center items-center gap-3 p-4 select-none">
            <img src="" alt="" />
            <h1 className="text-4xl md:text-5xl font-bold flex flex-wrap text-center gap-2 justify-center items-center text-foreground gap-y-4">
              Welcome to
              <span className="text-primary-500 drop-shadow-xl shadow-primary-500">
                Chatfolio
              </span>
            </h1>
            <p className="text-foreground-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
              sequi tempore perferendis illo mollitia ipsa?
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeSection;
