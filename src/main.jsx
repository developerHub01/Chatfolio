import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { store } from "./redux/store.js";
import ThemeManager from "./components/ThemeManager.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeManager />
        </QueryClientProvider>
      </ReduxProvider>
    </NextUIProvider>
  </React.StrictMode>
);
