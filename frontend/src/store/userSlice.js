// src/redux/slices/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  isBlocked: false,
  complaints: [],
  createdAt: "",
  updatedAt: "",
  login : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;

      state._id = user?._id || "";
      state.name = user?.name || "";
      state.email = user?.email || "";
      state.phone = user?.phone || "";
      state.isBlocked = user?.isBlocked || false;
      state.complaints = user?.complaints || [];
      state.createdAt = user?.createdAt || "";
      state.updatedAt = user?.updatedAt || "";
      state.login = true; // Set login to true when user is set
    },
    logoutUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.isBlocked = false;
      state.complaints = [];
      state.createdAt = "";
      state.updatedAt = "";
      state.login = false; // Set login to false when user logs out
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
