import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { setAdmin } from "../store/adminSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";

const AdminLogin = () => {
  // State for storing email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(formData);
  
  // Handle input field changes (two-way binding)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await Axios({
            ...SummaryApi.adminLogin,
            data: formData,
          });

          if (response.data.success) {
            toast.success(response.data.message);
      
            dispatch(setAdmin({
              admin: response.data.admin,
            }));
            localStorage.setItem("adminToken", response.data.token);
      
            setFormData({
              email: '',
              password: ''
            });
      
            navigate("/admin/dashboard");
          } else {
            toast.error(response.data.message || "Something went wrong!");
          }

    } catch (error) {
        console.error(error);
        AxiosToastError(error);
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Admin Login Card Header with accent bar */}
        <div className="h-2 bg-teal-700"></div>
        
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-800">Admin Portal</h2>
            <p className="text-teal-700 mt-2 font-medium">Sign in to access the dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-teal-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-teal-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg border border-teal-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-teal-300"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-teal-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg shadow-lg transition-colors duration-300 mt-4"
            >
              Sign In
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

export default AdminLogin;