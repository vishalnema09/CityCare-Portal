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
    setDeptAssignedComplaints,
    setDeptPendingComplaints,
    setDeptRejectedComplaints,
    setDeptResolvedComplaints,
    setErrorDept,
    setLoadingDept
} from "../store/departmentComplaintSlice";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const DepartmentDashboard = () => {
    const department = useSelector((state) => state.department);
    const departmentComplaint = useSelector((state) => state.departmentComplaint);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const fetchAllComplaintsData = async () => {
            try {
                dispatch(setLoadingDept(true));
                const allAssignedComplaintsRes = await Axios({
                    ...SummaryApi.departmentGetAllAssignedComplaints,
                });
                dispatch(setDeptAssignedComplaints(allAssignedComplaintsRes.data.complaints));
                const allPendingComplaintsRes = await Axios({
                    ...SummaryApi.departmentGetAllPendingComplaints,
                });
                dispatch(setDeptPendingComplaints(allPendingComplaintsRes.data.complaints));
                const allRejectedComplaintsRes = await Axios({
                    ...SummaryApi.departmentGetAllRejectedComplaints,
                });
                dispatch(setDeptRejectedComplaints(allRejectedComplaintsRes.data.complaints));
                const allResolvedComplaintsRes = await Axios({
                    ...SummaryApi.departmentGetAllResolvedComplaints,
                });
                dispatch(setDeptResolvedComplaints(allResolvedComplaintsRes.data.complaints));
                dispatch(setLoadingDept(false));
            } catch (error) {
                dispatch(setErrorDept(error.message));
                dispatch(setLoadingDept(false));
            }
        };

        fetchAllComplaintsData();
    }, [dispatch]);

    return department.login ? (
        <div className="min-h-screen bg-amber-50 flex m-5">
            {/* Sidebar */}
            <div className="bg-white w-64 py-6 px-4 shadow-xl border-r border-teal-100 flex flex-col justify-between animate-fadeIn">
                <div>
                    <div className="flex flex-col items-center justify-center mb-8 animate-slideDown">
                        <div className="p-3 bg-teal-700 rounded-full text-white shadow-lg mb-3">
                            <Shield size={28} />
                        </div>
                        <span className="text-sm text-center font-semibold text-teal-800">{department.name}</span>
                        <span className="text-sm text-teal-600">Department Dashboard</span>
                    </div>

                    {/* Navigation Menu */}
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-700 rounded"></div>
                        <nav className="mt-6 pl-2">
                            <ul className="space-y-3">
                                <li className="animate-slideRight" style={{ animationDelay: "0.1s" }}>
                                    <Link to="/department/dashboard" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                                        <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                                            <Home size={18} />
                                        </div>
                                        <span className="font-medium">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="relative animate-slideRight" style={{ animationDelay: "0.2s" }}>
                                    <button onClick={toggleDropdown} className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 hover:shadow-md transition-all duration-300 transform hover:-translate-x-1">
                                        <div className="p-2 bg-teal-100 rounded-lg mr-3 text-teal-700">
                                            <Settings size={18} />
                                        </div>
                                        <span className="font-medium flex-1 text-left">Manage Complaints</span>
                                        <ChevronDown size={18} />
                                    </button>
                                    {dropdownOpen && (
                                        <div className="mt-2 ml-3 space-y-1 animate-fadeIn">
                                            <Link to="/department/dashboard/allComplaints" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                                                All Complaints
                                            </Link>
                                            <Link to="/department/dashboard/allPendingComplaint" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                                                Pending Complaints
                                            </Link>
                                            <Link to="/department/dashboard/allRejectedComplaint" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                                                Resolved Complaints
                                            </Link>
                                            <Link to="/department/dashboard/closedComplaints" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-md">
                                                Rejected Complaints
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
            {departmentComplaint.loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="flex-1 bg-white m-4 rounded-xl shadow-lg p-6 animate-fadeIn">
                    <div className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-700 rounded-r-lg animate-slideDown">
                        <h1 className="text-2xl font-bold text-teal-800">Welcome, {department.name || "Department"}</h1>
                        <p className="text-teal-600">Manage complaints and user reports from this dashboard.</p>
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
                <p className="text-gray-600 mb-6">You need to be logged in to access this dashboard.</p>
                <Link to="/department/login" className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-all duration-300">Go to Login</Link>
            </div>
        </div>
    );
};

export default DepartmentDashboard;
