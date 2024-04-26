import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import LayoutLoader from "./loaders/LayoutLoader";
const App = lazy(() => import("../App"));

const ThemeManager = () => {
  const { theme } = useSelector((state) => state.uiStates);
  return (
    <main className={theme} onContextMenu={(e) => e.preventDefault()}>
      <Suspense fallback={<LayoutLoader />}>
        <App />
      </Suspense>
    </main>
  );
};

export default ThemeManager;
