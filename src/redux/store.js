import { configureStore } from "@reduxjs/toolkit";
import uiStatesSlice from "./slices/uiStatesSlice";
import userAuthSlice from "./slices/userAuthSlice";
import preferencesSlice from "./slices/preferencesSlice";
import searchChatSlice from "./slices/searchChatSlice";
import activeChatSlice from "./slices/activeChatSlice";
export const store = configureStore({
  reducer: {
    uiStates: uiStatesSlice,
    authStates: userAuthSlice,
    preferencesStates: preferencesSlice,
    searchChatStates: searchChatSlice,
    activeChatStates: activeChatSlice,
  },
});
