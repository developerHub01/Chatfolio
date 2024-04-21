import { Outlet } from "react-router-dom";
import Sidebar from "./components/specific/sidebars/Sidebar";
import MainListContainer from "./components/specific/topicList/MainListContainer";
import WelcomeSection from "./components/specific/WelcomeSection";

const App = () => {
  return (
    <div className="h-screen flex bg-foreground-50 text-foreground-500 overflow-hidden">
      <Sidebar />
      <div className="h-full w-full grid grid-cols-12">
        <div className="h-full col-span-full md:col-span-5 bg-foreground-50 md:border-r-3 border-r-foreground-100">
          <MainListContainer />
        </div>
        <div className="hidden md:block md:col-span-7 bg-foreground-50">
          <WelcomeSection />
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
