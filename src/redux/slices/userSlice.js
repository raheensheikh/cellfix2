// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLogin: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogin: (state) => {
      state.isLogin = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      state.user = {};
      state.isLogin = false;
      state.token = "";
    },
  },
});

export const { setUser, setLogin, setToken, setLogout } = userSlice.actions;
export default userSlice.reducer;
