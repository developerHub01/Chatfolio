import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import MainRoute from "./Routes/MainRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="">
        <MainRoute />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
