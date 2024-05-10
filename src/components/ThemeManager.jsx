import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import LayoutLoader from "./loaders/LayoutLoader";
import MainPage from "../MainPage";

const ThemeManager = () => {
  const { theme } =
    useSelector((state) => state.preferencesStates.preference) || "light";
  return (
    <main className={theme} onContextMenu={(e) => e.preventDefault()}>
      <Suspense fallback={<LayoutLoader />}>
        <MainPage />
      </Suspense>
    </main>
  );
};

export default ThemeManager;
