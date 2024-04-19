import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: ""
};

const uiStatesSlice = createSlice({
  name: "uiStateSlice",
  initialState: initialState,
  reducers: {
    
  },
});

export const { } = uiStatesSlice.actions;
export default uiStatesSlice.reducer;
