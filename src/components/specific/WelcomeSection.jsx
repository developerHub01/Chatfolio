import { Button } from "@nextui-org/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/slices/uiStatesSlice";

const WelcomeSection = () => {
  const { theme } = useSelector((state) => state.uiStates);
  const disptach = useDispatch();

  const handleTheme = () => {
    if (theme === "light") disptach(changeTheme("dark"));
    else disptach(changeTheme("light"));
  };
  return (
    <div className="w-full h-full p-3 flex flex-col justify-center items-center gap-5">
      <img src="" alt="" />
      <h1 className="text-3xl md:text-5xl font-bold flex flex-wrap text-center gap-2 justify-center items-center text-foreground">
        Welcome to
        <span className="text-primary-500 drop-shadow-xl shadow-primary-500">
          Chatfolio
        </span>
      </h1>
      <Button variant="shadow" color="primary" onClick={handleTheme}>
        Mode
      </Button>
    </div>
  );
};

export default WelcomeSection;
