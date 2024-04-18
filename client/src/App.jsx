import { Outlet } from "react-router-dom";
import Sidebar from "./components/Specific/Sidebar";

const App = () => {
  return (
    <div className="h-screen flex bg-red-500">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
