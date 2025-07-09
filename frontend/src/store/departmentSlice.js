import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  dept_id: "",
  email: "",
  phone: "",
  zone: "",
  assignedComplaints: [],
  actionsTaken: [],
  createdAt: "",
  login: false,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setDepartment: (state, action) => {
      const { department } = action.payload;

      state._id = department?._id || "";
      state.name = department?.name || "";
      state.dept_id = department?.dept_id || "";
      state.email = department?.email || "";
      state.phone = department?.phone || "";
      state.zone = department?.zone || "";
      state.assignedComplaints = department?.assignedComplaints || [];
      state.actionsTaken = department?.actionsTaken || [];
      state.createdAt = department?.createdAt || "";
      state.login = true; // custom field: jab department login karega
    },
    logoutDepartment: (state) => {
      state._id = "";
      state.name = "";
      state.dept_id = "";
      state.email = "";
      state.phone = "";
      state.zone = "";
      state.assignedComplaints = [];
      state.actionsTaken = [];
      state.createdAt = "";
      state.login = false;
    },
  },
});

export const { setDepartment, logoutDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
