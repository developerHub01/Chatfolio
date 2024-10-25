import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChatPreview: null,
  activeChat: {
    id: null,
    data: [],
    isLoading: false,
    isError: false,
  },
};

const activeChatSlice = createSlice({
  name: "activeChatSlice",
  initialState: initialState,
  reducers: {
    setActiveChatPreviewState: (state, action) => {
      state.activeChatPreview = action.payload ? action.payload : null;
      state.activeChat = { id: null, data: null };
    },
    setActiveChatIdState: (state, action) => {
      state.activeChat.id = action.payload ? action.payload : null;
      state.activeChatPreview = null;
    },
    setActiveChatDataState: (state, action) => {
      state.activeChat = action.payload ? {
        ...state.activeChat,
        ...action.payload
      } : null;
      state.activeChatPreview = null;
    },
  },
});

export const {
  setActiveChatPreviewState,
  setActiveChatIdState,
  setActiveChatDataState,
} = activeChatSlice.actions;
export default activeChatSlice.reducer;
