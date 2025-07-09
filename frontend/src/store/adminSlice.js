// src/redux/slices/adminSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  assignedComplaints: [],
  complaintActions: [],
  createdAt: "",
  login: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      const { admin } = action.payload;

      state._id = admin?._id || "";
      state.name = admin?.name || "";
      state.email = admin?.email || "";
      state.phone = admin?.phone || "";
      state.role = admin?.role || "";
      state.assignedComplaints = admin?.assignedComplaints || [];
      state.complaintActions = admin?.complaintActions || [];
      state.createdAt = admin?.createdAt || "";
      state.login = true; // Hamara custom field, ki abhi login hai
    },
    logoutAdmin: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.role = "";
      state.assignedComplaints = [];
      state.complaintActions = [];
      state.createdAt = "";
      state.login = false;
    },
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
