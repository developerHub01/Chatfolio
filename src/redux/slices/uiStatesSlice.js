import { createSlice } from "@reduxjs/toolkit";
import { EMOJI, GIFS } from "../../constants/values";

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
  activeEmojiOrGifs: {
    isActive: false,
    activeTab: EMOJI,
    activeEmojiSubCategory: "all",
    activeGifSubCategory: "all",
  },
  message: "",
  // it is the user or chat-id or story-id data

  previewImage: null,
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
    changeActiveEmojiOrGifs: (state, action) => {
      if (action.payload === null || action.payload === undefined) {
        state.activeEmojiOrGifs.isActive = false;
        state.activeEmojiOrGifs.activeTab = EMOJI;
        state.activeEmojiOrGifs.activeEmojiSubCategory = "all";
        state.activeEmojiOrGifs.activeGifSubCategory = "all";
        return;
      }
      state.activeEmojiOrGifs.isActive = true;
      let activeTab = action.payload.activeTab;
      if (![EMOJI, GIFS].includes(action.payload.activeTab)) activeTab = EMOJI;

      if (activeTab) state.activeEmojiOrGifs.activeTab = activeTab;

      state.activeEmojiOrGifs.activeEmojiSubCategory = "all";
      state.activeEmojiOrGifs.activeGifSubCategory = "all";
    },
    changeActiveEmojiOrGifsSubCategory: (state, action) => {
      state.activeEmojiOrGifs.isActive = true;
      const activeEmojiSubCategory = action.payload.activeEmojiSubCategory;
      const activeGifSubCategory = action.payload.activeGifSubCategory;

      state.activeEmojiOrGifs.activeEmojiSubCategory = activeEmojiSubCategory
        ? activeEmojiSubCategory
        : "all";
      state.activeEmojiOrGifs.activeGifSubCategory = activeGifSubCategory
        ? activeGifSubCategory
        : "all";
    },
    changeMessage: (state, action) => {
      state.message = action.payload;
    },
    togglePreviewImage: (state, action) => {
      state.previewImage = action.payload ? action.payload : null;
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
  changeActiveEmojiOrGifs,
  changeActiveEmojiOrGifsSubCategory,
  changeMessage,
  togglePreviewImage,
} = uiStatesSlice.actions;
export default uiStatesSlice.reducer;
