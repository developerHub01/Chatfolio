import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      if (action.payload) state.user = action.payload;
      else state.user = null;
    },
  },
});

export const { setUserData } = userAuthSlice.actions;
export default userAuthSlice.reducer;
