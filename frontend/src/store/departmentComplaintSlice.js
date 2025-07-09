import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignedComplaints: [],    
  rejectedComplaints: [],    
  resolvedComplaints: [],    
  pendingComplaints: [],     
  loading: false,            
  error: null,               
};

const departmentComplaintSlice = createSlice({
  name: "departmentComplaints",
  initialState,
  reducers: {
    // Setters for each type of complaint
    setDeptAssignedComplaints(state, action) {
      state.assignedComplaints = action.payload;
    },
    setDeptRejectedComplaints(state, action) {
      state.rejectedComplaints = action.payload;
    },
    setDeptResolvedComplaints(state, action) {
      state.resolvedComplaints = action.payload;
    },
    setDeptPendingComplaints(state, action) {
      state.pendingComplaints = action.payload;
    },

    // Loader and error management
    setLoadingDept(state, action) {
      state.loading = action.payload;
    },
    setErrorDept(state, action) {
      state.error = action.payload;
    },

    // Optional: Reset all complaints (useful on logout or refresh)
    resetDepartmentComplaints(state) {
      state.assignedComplaints = [];
      state.rejectedComplaints = [];
      state.resolvedComplaints = [];
      state.pendingComplaints = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions and reducer
export const {
  setDeptAssignedComplaints,
  setDeptRejectedComplaints,
  setDeptResolvedComplaints,
  setDeptPendingComplaints,
  setLoadingDept,
  setErrorDept,
  resetDepartmentComplaints,
} = departmentComplaintSlice.actions;

export default departmentComplaintSlice.reducer;
