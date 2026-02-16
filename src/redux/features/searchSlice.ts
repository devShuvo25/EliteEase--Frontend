import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
  isSearching: boolean; // Useful for toggling UI overlays or loading spinners
}

const initialState: SearchState = {
  searchTerm: "",
  isSearching: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Updates the text and sets isSearching to true
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.isSearching = action.payload.length > 0;
    },
    // Manually toggle the searching status (e.g., when API starts/ends)
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    // Resets everything
    resetSearch: (state) => {
      state.searchTerm = "";
      state.isSearching = false;
    },
  },
});

export const { setSearchTerm, setIsSearching, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;