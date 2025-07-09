import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  console.log(formData);

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
    e.preventDefault(); // form ka default behaviour rokna
    try {
      const response = await Axios({
        ...SummaryApi.userRegister, // dhyan se userLogin ka use
        data: formData, // apna formData pass karna hai
      });
      if (response.data.success) {
        toast.success(response.data.message);

        // ab Redux me user data aur token store karenge
        dispatch(
          setUser({
            user: response.data.user,
          })
        );
        localStorage.setItem("userToken", response.data.token);

        // form reset kar do
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
        });

        // navigate to home page
        navigate("/user/dashboard");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-teal-500 rounded-full text-white shadow-md">
            <User size={28} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-3">
            Create an Account
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Sign up to access all features
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md flex items-center animate-fadeIn">
            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
              {activeField === "name" && (
                <span className="ml-1 inline-block w-1 h-1 bg-teal-500 rounded-full animate-pulse"></span>
              )}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${
                  activeField === "name" ? "text-teal-500" : "text-gray-400"
                }`}
              >
                <User
                  size={18}
                  className={activeField === "name" ? "animate-wiggle" : ""}
                />
              </div>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2 border rounded-md transition-all duration-300 ${
                  activeField === "name"
                    ? "border-teal-500 ring-2 ring-teal-200 shadow-sm"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
              {activeField === "email" && (
                <span className="ml-1 inline-block w-1 h-1 bg-teal-500 rounded-full animate-pulse"></span>
              )}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${
                  activeField === "email" ? "text-teal-500" : "text-gray-400"
                }`}
              >
                <Mail
                  size={18}
                  className={activeField === "email" ? "animate-wiggle" : ""}
                />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2 border rounded-md transition-all duration-300 ${
                  activeField === "email"
                    ? "border-teal-500 ring-2 ring-teal-200 shadow-sm"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
              {activeField === "password" && (
                <span className="ml-1 inline-block w-1 h-1 bg-teal-500 rounded-full animate-pulse"></span>
              )}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${
                  activeField === "password" ? "text-teal-500" : "text-gray-400"
                }`}
              >
                <Lock
                  size={18}
                  className={activeField === "password" ? "animate-wiggle" : ""}
                />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-2 border rounded-md transition-all duration-300 ${
                  activeField === "password"
                    ? "border-teal-500 ring-2 ring-teal-200 shadow-sm"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={18} className="transition-all duration-300" />
                ) : (
                  <Eye size={18} className="transition-all duration-300" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
              {activeField === "phone" && (
                <span className="ml-1 inline-block w-1 h-1 bg-teal-500 rounded-full animate-pulse"></span>
              )}
            </label>
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${
                  activeField === "phone" ? "text-teal-500" : "text-gray-400"
                }`}
              >
                <Phone
                  size={18}
                  className={activeField === "phone" ? "animate-wiggle" : ""}
                />
              </div>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-3 py-2 border rounded-md transition-all duration-300 ${
                  activeField === "phone"
                    ? "border-teal-500 ring-2 ring-teal-200 shadow-sm"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 ${
              isLoading
                ? "opacity-90 cursor-not-allowed"
                : "shadow-md hover:shadow-lg"
            }`}
          >
            <span
              className={`flex items-center justify-center transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            >
              Sign Up
              <User size={18} className="ml-2" />
            </span>
            {isLoading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/user/login"}
              className="text-teal-600 hover:text-teal-800 font-medium ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
