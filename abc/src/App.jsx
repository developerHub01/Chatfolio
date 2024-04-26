import Sidebar from "./components/specific/sidebars/Sidebar";
import MainListContainer from "./components/specific/topicList/MainListContainer";
import WelcomeSection from "./components/specific/WelcomeSection";

const App = () => {
  return (
    <div className="h-screen flex text-foreground-500 overflow-hidden bg-background-900">
      <Sidebar />
      <div className="h-full w-full grid grid-cols-12 bg-background-900">
        <div className="h-full col-span-full md:col-span-5 border-r-4 border-background-800">
          <MainListContainer />
        </div>
        <div className="hidden md:block md:col-span-7">
          <WelcomeSection />
        </div>
      </div>
    </div>
  );
};

export default App;
