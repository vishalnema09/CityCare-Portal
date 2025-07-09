import React, { useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios({
        ...SummaryApi.userLogin,
        data: formData,
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
  
        dispatch(setUser({
          user: response.data.user,
        }));
        localStorage.setItem("userToken", response.data.token);
  
        setFormData({
          email: '',
          password: ''
        });
  
        navigate("/user/dashboard");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
  
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex justify-center items-center p-4 transition-all duration-500">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
        {/* User Login Card Header with accent bar */}
        <div className="h-2 bg-teal-700"></div>
        
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-800">User Login</h2>
            <p className="text-teal-700 mt-2 font-medium">Sign in to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                  activeField === "email" ? "text-teal-600" : "text-teal-400"
                }`}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 p-3 rounded-lg border border-teal-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none hover:border-teal-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-teal-700">
                  Password
                </label>
                <a href="#" className="text-sm text-teal-600 hover:text-teal-800 font-medium relative group">
                  Forgot Password?
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                  activeField === "password" ? "text-teal-600" : "text-teal-400"
                }`}>
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 p-3 rounded-lg border border-teal-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none hover:border-teal-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-500 hover:text-teal-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-teal-300 cursor-pointer hover:ring-2 hover:ring-teal-200 transition-all duration-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-teal-700">
                Keep me signed in
              </label>
            </div>

            {/* Submit Button */}
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

          {/* Registration Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-teal-700">
              Don&apos;t have an account?{" "}
              <Link
                to={"/user/register"}
                className="text-teal-600 hover:text-teal-800 font-medium ml-1 relative group"
              >
                Sign up
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-teal-700 text-sm">
            <p>&copy; 2025 Smart City User Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;