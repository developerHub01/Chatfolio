import { createSlice } from "@reduxjs/toolkit";
import searchTypeList from "../../utils/searchTypeList";

const initialState = {
  activeSearchType: "name",
  activeSearchFilterType: "all",
  searchResult: {
    isLoading: false,
    isError: false,
    data: [],
  },
};

const searchChatSlice = createSlice({
  name: "searchChatSlice",
  initialState: initialState,
  reducers: {
    changeActiveSearchType: (state, action) => {
      state.activeSearchType = searchTypeList
        .map(({ id }) => id)
        .includes(action.payload)
        ? action.payload
        : "name";
    },
    updateSearchResult: (state, action) => {
      state.searchResult = action.payload
        ? action.payload
        : { isLoading: false, isError: false, data: [] };
    },
    changeFilterType: (state, action) => {
      state.activeSearchFilterType = ["all", "connected"].includes(
        action.payload
      )
        ? action.payload
        : "all";
    },
  },
});

export const { changeActiveSearchType, updateSearchResult, changeFilterType } =
  searchChatSlice.actions;
export default searchChatSlice.reducer;
