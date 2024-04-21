import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import MainRoute from "./routes/MainRoute";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import LayoutLoader from "./components/loaders/LayoutLoader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReduxProvider store={store}>
        <main className="dark" onContextMenu={(e) => e.preventDefault()}>
          <Suspense fallback={<LayoutLoader />}>
            <App />
          </Suspense>
        </main>
      </ReduxProvider>
    </NextUIProvider>
  </React.StrictMode>
);
