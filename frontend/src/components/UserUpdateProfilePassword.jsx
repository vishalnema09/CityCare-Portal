import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const UpdateProfilePassword = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleUpdatePassword = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userUpdateProfilePassword,
        data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("userToken", response.data.token);
        setData({ oldPassword: "", newPassword: "" });
        navigate("/user/dashboard/updatePassword");
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
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#004d40] rounded-t-xl"></div>
        <div className="text-center pt-6">
          <div className="w-20 h-20 bg-[#f3e5ab] rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-teal-100 shadow-md">
            <Lock size={36} className="text-[#004d40]" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-[#004d40] animate-slideDown">
            Update Password
          </h2>
          <p className="text-[#004d40] mb-6 max-w-md mx-auto">
            Keep your account secure by updating your password regularly.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="animate-slideRight" style={{ animationDelay: "0.1s" }}>
          <label className="block text-[#004d40] font-medium mb-2">
            Old Password
          </label>
          <div className="relative">
            <input
              type={oldPasswordVisible ? "text" : "password"}
              value={data.oldPassword}
              onChange={(e) =>
                setData({ ...data, oldPassword: e.target.value })
              }
              className="w-full pl-4 pr-10 border border-teal-200 rounded-lg p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#004d40] transition-all duration-300 hover:border-[#004d40] transform hover:-translate-y-0.5 hover:shadow-md"
              placeholder="Enter your old password"
            />
            <button
              type="button"
              onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#004d40]"
            >
              {oldPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="animate-slideRight" style={{ animationDelay: "0.2s" }}>
          <label className="block text-[#004d40] font-medium mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={newPasswordVisible ? "text" : "password"}
              value={data.newPassword}
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
              className="w-full pl-4 pr-10 border border-teal-200 rounded-lg p-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#004d40] transition-all duration-300 hover:border-[#004d40] transform hover:-translate-y-0.5 hover:shadow-md"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#004d40]"
            >
              {newPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="pt-6 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={handleUpdatePassword}
            className="w-full bg-[#004d40] hover:bg-[#00332c] text-white p-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          >
            Update Password
          </button>
        </div>
      </div>

      <div
        className="mt-8 p-4 bg-[#f3e5ab] border-l-4 border-[#004d40] rounded-r-lg animate-fadeIn"
        style={{ animationDelay: "0.4s" }}
      >
        <p className="text-sm text-[#004d40]">
          A strong password keeps your account safe and secure.
        </p>
      </div>
    </div>
  );
};

export default UpdateProfilePassword;
