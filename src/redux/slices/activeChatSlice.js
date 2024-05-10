import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChat: null,
};

const activeChatSlice = createSlice({
  name: "activeChatSlice",
  initialState: initialState,
  reducers: {
    setActiveChatState: (state, action) => {
      state.activeChat = action.payload ? action.payload : null;
    },
  },
});

export const { setActiveChatState } = activeChatSlice.actions;
export default activeChatSlice.reducer;
