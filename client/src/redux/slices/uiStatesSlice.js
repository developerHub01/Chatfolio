import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    activeTabId: "chat",
    tempActivePopup: null,
  },
  settingOptions: {
    activeOption: "general",
  },
  actionIconButtons: {},
};

const uiStatesSlice = createSlice({
  name: "uiStateSlice",
  initialState: initialState,
  reducers: {
    changeSidebarActiveTab: (state, action) => {
      state.sidebar.activeTabId = action.payload ? action.payload : null;
    },
    changeSidebarActivePopup: (state, action) => {
      state.sidebar.tempActivePopup = action.payload ? action.payload : null;
    },
    changeSettingActiveOptions: (state, action) => {
      state.settingOptions.activeOption = action.payload
        ? action.payload
        : "general";
    },
    toggleActionIconButton: (state, action) => {
      state.actionIconButtons[action.payload] =
        !state.actionIconButtons[action.payload];
    },
  },
});

export const {
  changeSidebarActiveTab,
  changeSidebarActivePopup,
  changeSettingActiveOptions,
  toggleActionIconButton,
} = uiStatesSlice.actions;
export default uiStatesSlice.reducer;
