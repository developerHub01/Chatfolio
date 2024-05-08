import ChatPage from "./components/specific/chat/ChatPage";
import Sidebar from "./components/specific/sidebars/Sidebar";
import MainListContainer from "./components/specific/topicList/MainListContainer";
import WelcomeSection from "./components/specific/WelcomeSection";
import { Suspense } from "react";
import LayoutLoader from "./components/loaders/LayoutLoader";
import { motion } from "framer-motion";
import { layoutAnimProps } from "./components/animation/animationList";

const App = () => {
  return (
    <Suspense fallback={<LayoutLoader />}>
      <Sidebar />
      {/* <FriendProfile /> */}
      <motion.div
        {...layoutAnimProps}
        className="h-full w-full grid grid-cols-12 bg-background-900"
      >
        <div className="h-full col-span-full md:col-span-5 border-r-4 border-background-800">
          <MainListContainer />
        </div>
        <div className="hidden md:block md:col-span-7">
          {/* <WelcomeSection /> */}
          <ChatPage />
        </div>
      </motion.div>
    </Suspense>
  );
};

export default App;
