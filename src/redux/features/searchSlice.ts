import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
  categoryId: string | null; // Added categoryId
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
    // Updates the text and checks if searching is active
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // isSearching is true if there's text OR a category selected
      state.isSearching = action.payload.length > 0 || state.categoryId !== null;
    },
    
    // Updates the categoryId
    setCategoryId: (state, action: PayloadAction<string | null>) => {
      state.categoryId = action.payload;
      // isSearching is true if there's text OR a category selected
      state.isSearching = state.searchTerm.length > 0 || action.payload !== null;
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

export const { setSearchTerm, setCategoryId, setIsSearching, resetSearch } = filterSlice.actions;
export default filterSlice.reducer;