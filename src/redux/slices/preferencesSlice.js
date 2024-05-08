import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preference: null,
};

const preferencesSlice = createSlice({
  name: "preferencesSlice",
  initialState: initialState,
  reducers: {
    setPreferencesState: (state, action) => {
      state.preference = action.payload ? action.payload : null;
    },
  },
});

export const { setPreferencesState } = preferencesSlice.actions;
export default preferencesSlice.reducer;
