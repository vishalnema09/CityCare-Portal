import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { setUser } from "../store/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Save } from "lucide-react";

const UserProfile = () => {
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUserData] = useState({
    name: userDetails.name,
    email: userDetails.email,
    phone: userDetails.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userUpdateProfile,
        data: user,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser({ user: response.data.user }));
        navigate("/user/dashboard/profile");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-teal-100 transform transition-all duration-300 hover:shadow-xl animate-fadeIn">
      <div className="relative mb-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-teal-700 rounded-t-xl"></div>
        <div className="text-center pt-6">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-teal-100 shadow-md">
            <User size={36} className="text-teal-700" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-teal-800 animate-slideDown">
            User Profile
          </h2>
          <p className="text-teal-600 mb-6 max-w-md mx-auto">
            Manage your personal information and keep your profile updated.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="animate-slideRight" style={{ animationDelay: '0.1s' }}>
          <label className="block text-teal-700 font-medium mb-2" htmlFor="name">
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-500 z-10">
              <User size={18} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full pl-10 border border-teal-200 rounded-lg p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 transform hover:-translate-y-0.5 hover:shadow-md"
            />
          </div>
        </div>

        <div className="animate-slideRight" style={{ animationDelay: '0.2s' }}>
          <label className="block text-teal-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-500 z-10">
              <Mail size={18} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full pl-10 border border-teal-200 rounded-lg p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 transform hover:-translate-y-0.5 hover:shadow-md"
            />
          </div>
        </div>

        <div className="animate-slideRight" style={{ animationDelay: '0.3s' }}>
          <label className="block text-teal-700 font-medium mb-2" htmlFor="phone">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-500 z-10">
              <Phone size={18} />
            </div>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full pl-10 border border-teal-200 rounded-lg p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 transform hover:-translate-y-0.5 hover:shadow-md"
            />
          </div>
        </div>

        <div className="pt-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={handleUpdateProfile}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white p-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
          >
            <Save size={18} className="mr-2" />
            <span>Update Profile</span>
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-50 border-l-4 border-teal-700 rounded-r-lg animate-fadeIn" style={{ animationDelay: '0.5s' }}>
        <p className="text-sm text-teal-800">
          Keep your profile information up to date to ensure you receive important notifications.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
