import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
  preference: null,
};

const preferencesSlice = createSlice({
  name: "preferencesSlice",
  initialState: initialStates,
  reducers: {
    setPreferencesStates: (state, action) => {
      state.preference = action.payload ? action.payload : null;
    },
  },
});

export const { setPreferencesStates } = preferencesSlice.actions;
export default preferencesSlice.reducer;
