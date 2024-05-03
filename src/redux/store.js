import { configureStore } from "@reduxjs/toolkit";
import uiStatesSlice from "./slices/uiStatesSlice";
import userAuthSlice from "./slices/userAuthSlice";
export const store = configureStore({
  reducer: {
    uiStates: uiStatesSlice,
    authStates: userAuthSlice,
  },
});
