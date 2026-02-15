// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// interface AuthState {
//   token: string | null;
//   refresh_token: string | null;
// }

// const initialState: AuthState = {
//   token: null,
//   refresh_token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ token: any}>) => {
//       state.token = action.payload.token;
//     },
//     setRefreshToken: (
//       state,
//       action: PayloadAction<{ refresh_token: string }>
//     ) => {
//       state.refresh_token = action.payload.refresh_token;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.refresh_token = null;
//       Cookies.remove("accessToken");
//     },
//   },
// });

// export const { setUser, setRefreshToken, logout } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  // It is better to store basic user info in Redux 
  // so you don't have to wait for the 'getMe' query for every UI check
  user: {
    id: string;
    email: string;
    role: string;
    name?: string;
  } | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null, // Initialize from cookie to prevent flicker on refresh
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Senior tip: Name the action 'setCredentials' to be more descriptive
    setCredentials: (
      state, 
      action: PayloadAction<{ token: string | null; user?: AuthState["user"] }>
    ) => {
      const { token, user } = action.payload;
      state.token = token;
      if (user) {
        state.user = user;
      }
    },
    
    // Move the cookie removal logic into the reducer to keep it centralized
    logout: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
