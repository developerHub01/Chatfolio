import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    activeTabId: "chat",
  },
};

const uiStatesSlice = createSlice({
  name: "uiStateSlice",
  initialState: initialState,
  reducers: {
    changeSidebarActiveTab: (state, action) => {
      console.log(action);
      state.sidebar.activeTabId = action.payload ? action.payload : null;
    },
  },
});

export const { changeSidebarActiveTab } = uiStatesSlice.actions;
export default uiStatesSlice.reducer;
