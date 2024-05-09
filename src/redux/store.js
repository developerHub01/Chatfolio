import { configureStore } from "@reduxjs/toolkit";
import uiStatesSlice from "./slices/uiStatesSlice";
import userAuthSlice from "./slices/userAuthSlice";
import preferencesSlice from "./slices/preferencesSlice";
import searchChatSlice from "./slices/searchChatSlice";
export const store = configureStore({
  reducer: {
    uiStates: uiStatesSlice,
    authStates: userAuthSlice,
    preferencesState: preferencesSlice,
    searchChatState: searchChatSlice,
  },
});
