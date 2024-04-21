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
  addStory: {
    active: false,
  },
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
    toggleAddStory: (state, action) => {
      state.addStory.active = !state.addStory.active;
    },
  },
});

export const {
  changeSidebarActiveTab,
  changeSidebarActivePopup,
  changeSettingActiveOptions,
  toggleActionIconButton,
  toggleAddStory,
} = uiStatesSlice.actions;
export default uiStatesSlice.reducer;
