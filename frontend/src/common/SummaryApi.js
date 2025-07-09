export const baseURL = "http://localhost:3000";

const SummaryApi = {
  userLogin : {
    url : "/api/user/login",
    method : "POST",
  },
  userLogout : {
    url : "/api/user/logout",
    method : "GET",
  },
  userRegister : {
    url : "/api/user/register",
    method : "POST",
  },
  userComplaintRegister : {
    url: "/api/user/register/complaint",
    method: "POST",
  },
  userUpdateProfile : {
    url: "/api/user/update/profile",
    method: "PUT",
  },
  userUpdateProfilePassword : {
    url: "/api/user/update/password",
    method: "PUT",
  },
  userAllComplaints : {
    url : "/api/user/complaints",
    method : "GET"
  },
  viewUserSingleComplaint : {
    url : "/api/user/complaint",
    method : "GET"
  },
  adminLogin : {
    url : "/api/admin/login",
    method : "POST",
  },
  adminLogout :{
    url : "/api/admin/logout",
    method : "GET",
  },
  adminCreateDepartment : {
    url : "/api/admin/create/department",
    method : "POST",
  },
  adminGetAllComplaints : {
    url : "/api/admin/all-complaints",
    method : "GET",
  },
  adminGetAllForwardComplaint : {
    url : "/api/admin/forwarded-complaints",
    method : "GET",
  },
  adminGetAllRejectedComplaint : {
    url : "/api/admin/rejected-complaints",
    method : "GET",
  },
  adminGetAllClosedComplaint : {
    url : "/api/admin/closed-complaints",
    method : "GET",
  },
  adminGetAllPendingComplaint : {
    url : "/api/admin/pending/complaints",
    method : "GET",
  },
  adminForwardComplaint : {
    url : "/api/admin/forward",
    method : "PUT",
  },
  viewAdminSingleComplaint : {
    url : "/api/admin/complaint",
    method : "GET"
  },
  departmentLogin: {
    url: "/api/department/login",
    method: "POST",
  },
  departmentLogout: {
    url: "/api/department/logout",
    method: "GET",
  },
  departmentGetAllAssignedComplaints: {
    url : "/api/department/assigned-complaints",
    method : "GET"
  },
  departmentGetAllRejectedComplaints : {
    url : "/api/department/rejected-complaints",
    method : "GET"
  },
  departmentGetAllResolvedComplaints : {
    url : "/api/department/resolved-complaints",
    method : "GET"
  },
  departmentGetAllPendingComplaints : {
    url : "/api/department/pending-complaints",
    method : "GET"
  },
  departmentComplaintUpdateStatus : {
    url : "/api/department/update-complaint-status",
    method : "POST"
  },

};

export default SummaryApi;
