// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLogin: false,
  token: "",
  loginModal: false,
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
    openLoginModal: (state) => {
      state.loginModal = true
    },
    closeLoginModal: (state) => {
      state.loginModal = false
    }
  },
});

export const { setUser, setLogin, setToken, setLogout, openLoginModal, closeLoginModal } = userSlice.actions;
export default userSlice.reducer;
