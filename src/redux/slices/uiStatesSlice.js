import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
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
    tempImage: null,
  },
  contextMenu: {
    position: null,
    refDom: null,
    contextData: null,
  },
};

const uiStatesSlice = createSlice({
  name: "uiStateSlice",
  initialState: initialState,
  reducers: {
    changeTheme: (state, action) => {
      let theme = localStorage.getItem("theme") || "light";
      if (["light", "dark"].includes(action.payload?.toLowerCase())) {
        theme = action.payload;
      }
      state.theme = theme;
    },
    changeSidebarActiveTab: (state, action) => {
      state.sidebar.activeTabId = action.payload ? action.payload : null;
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
    setStoryTempImage: (state, action) => {
      state.addStory.tempImage = action.payload;
    },
    openContextMenu: (state, action) => {
      console.log(action.payload);
      const { position, refDom, contextData } = action.payload;
      position && (state.contextMenu.position = position);
      refDom && (state.contextMenu.refDom = refDom);
      contextData && (state.contextMenu.contextData = contextData);
    },
    closeContextMenu: (state, action) => {
      state.contextMenu.position = null;
      state.contextMenu.refDom = null;
    },
  },
});

export const {
  changeTheme,
  changeSidebarActiveTab,
  changeSettingActiveOptions,
  toggleActionIconButton,
  toggleAddStory,
  setStoryTempImage,
  openContextMenu,
  closeContextMenu,
} = uiStatesSlice.actions;
export default uiStatesSlice.reducer;
