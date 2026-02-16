import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
  categoryId: string | null;
  isSearching: boolean;
}

const initialState: SearchState = {
  searchTerm: "",
  categoryId: null,
  isSearching: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // ...existing code...
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.isSearching =
        action.payload.length > 0 || state.categoryId !== null;
    },

    // Updates the categoryId
    setCategoryId: (state, action: PayloadAction<string | null>) => {
      state.categoryId = action.payload;
      state.isSearching =
        state.searchTerm.length > 0 || action.payload !== null;
    },

    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },

    // Resets everything to initial state
    resetSearch: (state) => {
      state.searchTerm = "";
      state.categoryId = null;
      state.isSearching = false;
    },
  },
});

export const { setSearchTerm, setCategoryId, setIsSearching, resetSearch } =
  filterSlice.actions;
export default filterSlice.reducer;
