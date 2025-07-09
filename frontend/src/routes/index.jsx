import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import UserDashboard from "../pages/UserDashboard";
import { useSelector } from "react-redux";
import RegisterComplaint from "../components/RegisterComplaint";
import UserProfile from "../components/UserProfile";
import UserUpdateProfilePassword from "../components/UserUpdateProfilePassword";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminDashboardHome from "../components/AdminDashboardHome";
import CreateDepartment from "../components/CreateDepartment";
import AdminAllResolvedComplaints from "../components/AdminAllResolvedComplaints";
import AdminAllComplaints from "../components/AdminAllComplaints";
import AdminAllRejectedComplaints from "../components/AdminAllRejectedComplaints";
import AdminAllForwardedComplaints from "../components/AdminAllForwardedComplaints";
import AdminAllPendingComplaints from "../components/AdminAllPendingComplaints";
import DepartmentLogin from "../pages/DepartmentLogin";
import DepartmentDashboard from "../pages/DepartmentDashboard";
import DepartmentDashboardHome from "../components/DepartmentDashboardHome";
import DepartmentAllComplaints from "../components/DepartmentAllComplaints";
import DepartmentAllPendingComplaints from "../components/DepartmentAllPendingComplaints";
import DepartmentAllRejectedComplaints from "../components/DepartmentAllRejectedComplaints";
import DepartmentAllResolvedComplaints from "../components/DepartmentAllResolvedComplaints";
import ViewAllUserComplaints from "../components/ViewAllUserComplaints";
import ViewUserSingleComplaint from "../components/ViewUserSingleComplaint";
import ViewAdminSingleComplaint from "../components/ViewAdminSingleComplaint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path : "/user/login",
        element: <UserLogin />,
      },
      {
        path: "/user/register",
        element: <UserRegister />,
      },
      {
        path: "/user/dashboard",
        element: <UserDashboard />,
        children : [
          {
            path : "/user/dashboard",
            element : <RegisterComplaint />,
          },
          {
            path : "/user/dashboard/profile",
            element : <UserProfile />,
          },
          {
            path : "/user/dashboard/updatePassword",
            element : <UserUpdateProfilePassword />,
          },
          {
            path : "/user/dashboard/mycomplaints",
            element : <ViewAllUserComplaints />
          },
          {
            path : "/user/dashboard/complaint/:id",
            element : <ViewUserSingleComplaint />
          }
        ]
      },
      {
        path : "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
        children : [
          {
            path : "/admin/dashboard",
            element : <AdminDashboardHome />
          },
          {
            path : "/admin/dashboard/createdepartment",
            element : <CreateDepartment />,
          },
          {
            path : "/admin/dashboard/allcomplaints",
            element : <AdminAllComplaints />
          },
          {
            path: "/admin/dashboard/resolvedcomplaints",
            element: <AdminAllResolvedComplaints />,
          },
          {
            path : "/admin/dashboard/rejectedcomplaints",
            element : <AdminAllRejectedComplaints />
          },
          {
            path : "/admin/dashboard/forwardedcomplaints",
            element : <AdminAllForwardedComplaints />
          },
          {
            path : "/admin/dashboard/pendingcomplaints",
            element : <AdminAllPendingComplaints />
          },
          {
            path : "/admin/dashboard/complaint/:id",
            element : <ViewAdminSingleComplaint /> 
          }
        ]
      },
      {
        path: "/department/login",
        element: <DepartmentLogin />,
      },
      {
        path: "/department/dashboard",
        element: <DepartmentDashboard />,
        children: [
          {
            path: "/department/dashboard",
            element: <DepartmentDashboardHome />,
          },
          {
            path : "/department/dashboard/allcomplaints",
            element : <DepartmentAllComplaints />
          },
          {
            path : "/department/dashboard/allPendingComplaint",
            element : <DepartmentAllPendingComplaints />
          },
          {
            path : "/department/dashboard/allRejectedComplaint",
            element : <DepartmentAllRejectedComplaints />
          },
          {
            path : "/department/dashboard/closedComplaints",
            element : <DepartmentAllResolvedComplaints />
          },
        ]
      }
    ],
  },
]);


export default router;
