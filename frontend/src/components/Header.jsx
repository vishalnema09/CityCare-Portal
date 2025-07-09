import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaUserCircle, FaCaretDown, FaCaretUp } from "react-icons/fa";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { logoutUser } from "../store/userSlice";
import { logoutAdmin } from "../store/adminSlice";
import { resetComplaints } from "../store/complaintSlice";
import { logoutDepartment } from "../store/departmentSlice";
import { resetDepartmentComplaints } from "../store/departmentComplaintSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const department = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickHome = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userLogout, // dhyan se userLogin ka use
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(logoutUser());
        localStorage.removeItem("userToken");
        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  };

  const handleLogoutAdmin = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.adminLogout, // dhyan se userLogin ka use
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(logoutAdmin());
        dispatch(resetComplaints())
        localStorage.removeItem("adminToken");
        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  }

  const handleLogoutDepartment = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.departmentLogout, // dhyan se userLogin ka use
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(logoutDepartment());
        dispatch(resetDepartmentComplaints())
        localStorage.removeItem("departmentToken");
        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  }

  return (
    <header className="bg-[#F5E8D3] text-[#0B6E4F] p-4 shadow-lg sticky top-0 z-20 border-b-2 border-[#0B6E4F]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/" className="flex items-center space-x-2">
            <FaUserCircle className="text-[#0B6E4F]" />
            <span className="font-serif">Complaint Hub</span>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4 md:space-x-6 items-center">
            <li>
              <Link
                to="/"
                onClick={handleClickHome}
                className="hover:text-[#0B6E4F]/80 font-medium transition duration-300"
              >
                Home
              </Link>
            </li>

            {user.login || admin.login || department.login ? (
              <li>
                {user.login && (
                  <button
                    onClick={handleLogout}
                    className="bg-[#0B6E4F] text-[#F5E8D3] px-4 py-2 rounded-md hover:bg-[#0B6E4F]/90 transition duration-300"
                  >
                    Logout
                  </button>
                )}

                {admin.login && (
                  <button
                    onClick={handleLogoutAdmin}
                    className="bg-[#0B6E4F] text-[#F5E8D3] px-4 py-2 rounded-md hover:bg-[#0B6E4F]/90 transition duration-300"
                  >
                    Logout
                  </button>
                )}

                {department.login && (
                  <button
                    onClick={handleLogoutDepartment}
                    className="bg-[#0B6E4F] text-[#F5E8D3] px-4 py-2 rounded-md hover:bg-[#0B6E4F]/90 transition duration-300"
                  >
                    Logout
                  </button>
                )}
              </li>
            ) : (
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-[#0B6E4F] text-[#F5E8D3] px-4 py-2 rounded-md hover:bg-[#0B6E4F]/90 transition duration-300 flex items-center space-x-1"
                  aria-label="Login Options"
                >
                  <span>Login</span>
                  {isDropdownOpen ? (
                    <FaCaretUp className="w-4 h-4 fill-current" />
                  ) : (
                    <FaCaretDown className="w-4 h-4 fill-current" />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#F5E8D3] text-[#0B6E4F] rounded-md shadow-lg z-10 border border-[#0B6E4F]/20">
                    <Link
                      to="/admin/login"
                      className="block px-4 py-2 hover:bg-[#0B6E4F]/10 transition duration-300 border-b border-[#0B6E4F]/10"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Admin Login
                    </Link>
                    <Link
                      to="/department/login"
                      className="block px-4 py-2 hover:bg-[#0B6E4F]/10 transition duration-300 border-b border-[#0B6E4F]/10"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Department Login
                    </Link>
                    <Link
                      to="/user/login"
                      className="block px-4 py-2 hover:bg-[#0B6E4F]/10 transition duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      User Login
                    </Link>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;