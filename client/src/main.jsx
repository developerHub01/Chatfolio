import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import MainRoute from "./routes/MainRoute";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReduxProvider store={store}>
        <main className="dark">
          <MainRoute />
        </main>
      </ReduxProvider>
    </NextUIProvider>
  </React.StrictMode>
);
