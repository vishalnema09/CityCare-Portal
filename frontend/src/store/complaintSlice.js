import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allComplaints: [],         // getAssignedComplaintsController
  forwardedComplaints: [],   // getForwardedComplaints
  rejectedComplaints: [],    // fetchRejectedComplaints
  closedComplaints: [],      // fetchClosedComplaints
  pendingComplaints: [],     // getPendingComplaintsAssignedToAdmin
  loading: false,            // common loading state
  error: null,               // common error state
};

const complaintSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    // Setters for each type of complaint
    setAllComplaints(state, action) {
      state.allComplaints = action.payload;
    },
    setForwardedComplaints(state, action) {
      state.forwardedComplaints = action.payload;
    },
    setRejectedComplaints(state, action) {
      state.rejectedComplaints = action.payload;
    },
    setClosedComplaints(state, action) {
      state.closedComplaints = action.payload;
    },
    setPendingComplaints(state, action) {
      state.pendingComplaints = action.payload;
    },
    // Loader and error management
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    // Optional: Resetting all complaints (agar kabhi logout ya refresh me karna pade)
    resetComplaints(state) {
      state.allComplaints = [];
      state.forwardedComplaints = [];
      state.rejectedComplaints = [];
      state.closedComplaints = [];
      state.pendingComplaints = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions and reducer
export const {
  setAllComplaints,
  setForwardedComplaints,
  setRejectedComplaints,
  setClosedComplaints,
  setPendingComplaints,
  setLoading,
  setError,
  resetComplaints,
} = complaintSlice.actions;

export default complaintSlice.reducer;
