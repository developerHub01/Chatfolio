import { Outlet } from "react-router-dom";
import Sidebar from "./components/specific/sidebars/Sidebar";

const App = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
