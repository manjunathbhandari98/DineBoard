import { createSlice } from "@reduxjs/toolkit";
import {
  getToken,
  setToken,
  removeToken,
} from "../service/localStorageService";

const initialState = {
  token: getToken("authToken") || null,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload;
      setToken("authToken", action.payload); // use consistent key
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    removeUser: (state) => {
      removeToken("authToken"); // use consistent key
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setUser, setProfile, removeUser } =
  userSlice.actions;
export default userSlice.reducer;
