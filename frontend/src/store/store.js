import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice"; 
import complaintReducer from "./complaintSlice"; // Import the complaint reducer
import departmentReducer from "./departmentSlice"; // Import the department reducer
import departmentComplaintReducer from "./departmentComplaintSlice"; // Import the department complaint reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    admin : adminReducer, 
    complaint : complaintReducer, 
    department : departmentReducer, 
    departmentComplaint : departmentComplaintReducer, 
  },
});

export default store;