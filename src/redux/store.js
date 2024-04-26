import { configureStore } from "@reduxjs/toolkit";
import uiStatesSlice from "./slices/uiStatesSlice";
export const store = configureStore({
  reducer: {
    uiStates: uiStatesSlice,
  },
});
