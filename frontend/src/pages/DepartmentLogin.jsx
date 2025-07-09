import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { setDepartment } from "../store/departmentSlice";
import AxiosToastError from "../utils/AxiosToastError";

const DepartmentLogin = () => {
  const department = useSelector((state) => state.department);
  const [formData, setFormData] = useState({
    dept_id: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.departmentLogin,
        data: formData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setDepartment({ department: response.data.department }));
        localStorage.setItem("departmentToken", response.data.token);
        setFormData({ dept_id: "", password: "" });
        navigate("/department/dashboard");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex justify-center items-center p-4 transition-all duration-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="h-2 bg-teal-700"></div>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-800">Department Login</h2>
            <p className="text-teal-700 mt-2 font-medium">
              Sign in to access department dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department ID */}
            <div>
              <label htmlFor="dept_id" className="block text-sm font-medium text-teal-700 mb-2">
                Department ID
              </label>
              <input
                type="text"
                id="dept_id"
                name="dept_id"
                value={formData.dept_id}
                onChange={handleInputChange}
                onFocus={() => handleFocus("dept_id")}
                onBlur={handleBlur}
                required
                placeholder="DPT-ENV-01#"
                className="w-full p-3 rounded-lg border border-teal-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none hover:border-teal-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-teal-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                  required
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 p-3 rounded-lg border border-teal-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none hover:border-teal-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-500 hover:text-teal-700 transition-colors"
                >
                  {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg shadow-lg transition-all duration-300 mt-4 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Sign In
                  <LogIn size={18} className="ml-2" />
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-teal-700 text-sm">
            <p>&copy; 2025 Smart City Administration Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentLogin;


// {
//     "dept_id" : "DPT-SWM-78#",
//     "password" : "pck55#"
// }
