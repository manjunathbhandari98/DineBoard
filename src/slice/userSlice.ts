import { createSlice } from "@reduxjs/toolkit";
import {
  getToken,
  removeToken,
  setToken,
} from "../service/localStorageService";

const TOKEN_KEY = "authToken";

const initialState = {
  token: getToken(TOKEN_KEY) || null,
  profile: null,
  isAuthenticated: !!getToken(TOKEN_KEY),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Called after login success
    setUserSession: (state, action) => {
      const { token, profile } = action.payload;
      state.token = token;
      state.profile = profile;
      state.isAuthenticated = true;
      setToken(TOKEN_KEY, token);
    },

    // Update user profile data (e.g., after editing)
    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    // Called on logout
    clearUserSession: (state) => {
      removeToken(TOKEN_KEY);
      state.token = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserSession, setProfile, clearUserSession } =
  userSlice.actions;

export default userSlice.reducer;
