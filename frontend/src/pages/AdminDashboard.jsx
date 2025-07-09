import { Link, Outlet } from "react-router-dom";
import {
  Home,
  User,
  Shield,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setAllComplaints,
  setClosedComplaints,
  setError,
  setForwardedComplaints,
  setLoading,
  setPendingComplaints,
  setRejectedComplaints,
} from "../store/complaintSlice";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const AdminDashboard = () => {
  const admin = useSelector((state) => state.admin);
  const complaint = useSelector((state) => state.complaint);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const fetchAllComplaintsData = async () => {
      try {
        dispatch(setLoading(true));
        const allComplaintsRes = await Axios({ ...SummaryApi.adminGetAllComplaints });
        dispatch(setAllComplaints(allComplaintsRes.data.complaints));
        const forwardedRes = await Axios({ ...SummaryApi.adminGetAllForwardComplaint });
        dispatch(setForwardedComplaints(forwardedRes.data.complaints));
        const rejectedRes = await Axios({ ...SummaryApi.adminGetAllRejectedComplaint });
        dispatch(setRejectedComplaints(rejectedRes.data.complaints));
        const closedRes = await Axios({ ...SummaryApi.adminGetAllClosedComplaint });
        dispatch(setClosedComplaints(closedRes.data.complaints));
        const pendingRes = await Axios({ ...SummaryApi.adminGetAllPendingComplaint });
        dispatch(setPendingComplaints(pendingRes.data.complaints));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    };

    fetchAllComplaintsData();
  }, [dispatch]);

  return admin.login ? (
    <div className="min-h-screen bg-amber-50 flex">
      {/* Sidebar */}
      <div className="bg-white w-64 py-6 px-4 shadow-xl border-r border-teal-100 flex flex-col justify-between animate-fadeIn">
        <div>
          {/* Admin Profile Header */}
          <div className="flex flex-col items-center justify-center mb-8 animate-slideDown">
            <div className="p-3 bg-teal-700 rounded-full text-white shadow-lg mb-3">
              <Shield size={28} />
            </div>
            <span className="text-xl font-semibold text-teal-800">Admin</span>
            <span className="text-sm text-teal-600">Admin Panel</span>
          </div>

          {/* Navigation Menu */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-700 rounded"></div>

            <nav className="mt-6 pl-2">
              <ul className="space-y-3">
                <li className="animate-slideRight" style={{ animationDelay: "0.1s" }}>
                  <Link to="/admin/dashboard" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                    <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                      <Home size={18} />
                    </div>
                    <span className="font-medium">Dashboard</span>
                  </Link>
                </li>
                <li className="animate-slideRight" style={{ animationDelay: "0.2s" }}>
                  <Link to="/admin/dashboard/CreateDepartment" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                    <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                      <User size={18} />
                    </div>
                    <span className="font-medium">Create Department</span>
                  </Link>
                </li>
                <li className="relative animate-slideRight" style={{ animationDelay: "0.3s" }}>
                  <button onClick={toggleDropdown} className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                    <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                      <Settings size={18} />
                    </div>
                    <span className="font-medium flex-1 text-left">Manage Complaints</span>
                    <ChevronDown size={18} />
                  </button>
                  {dropdownOpen && (
                    <div className="mt-2 ml-3 space-y-1 animate-fadeIn">
                      <Link to="/admin/dashboard/allcomplaints" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                        All Complaints
                      </Link>
                      <Link to="/admin/dashboard/resolvedcomplaints" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                        Resolved Complaints
                      </Link>
                      <Link to="/admin/dashboard/rejectedcomplaints" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                        Rejected Complaints
                      </Link>
                      <Link to="/admin/dashboard/forwardedcomplaints" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                        Forwarded Complaints
                      </Link>
                      <Link to="/admin/dashboard/pendingcomplaints" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                        Pending Complaints
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Logout */}
        <button className="flex items-center p-3 mt-6 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-300 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          <div className="p-2 bg-red-100 rounded-lg mr-3 text-red-600">
            <LogOut size={18} />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Right Side Content */}
      {complaint.loading ? (
        <div className="flex justify-center items-center w-full">
          <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex-1 bg-white m-4 rounded-xl shadow-lg p-6 animate-fadeIn">
          <div className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-700 rounded-r-lg animate-slideDown">
            <h1 className="text-2xl font-bold text-teal-800">Welcome, {admin.name || "Admin"}</h1>
            <p className="text-teal-600">Manage users and complaints from this admin panel.</p>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 animate-fadeIn">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md transform hover:scale-105 transition-all duration-300">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <Shield size={32} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-teal-800">Access Denied</h2>
        <p className="text-gray-600 mb-6">You need to be logged in as an admin to access this dashboard.</p>
        <Link to="/admin/login" className="inline-block px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
