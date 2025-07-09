import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import { Building2, Mail, Phone, MapPin, PlusCircle } from "lucide-react";

const CreateDepartment = () => {
  const departmentOptions = [
    "Water Supply Department",
    "Sanitation & Waste Management Department",
    "Sewerage & Drainage Department",
    "Electricity / Street Lighting Department",
    "Roads & Public Works Department (PWD)",
    "Traffic Management Department",
    "Transport Department",
    "Health Department",
    "Fire & Emergency Services",
    "Town Planning / Building Department",
    "Revenue / Tax Department",
    "Encroachment / Enforcement Department",
    "Parks & Horticulture Department",
    "Pollution Control / Environment Department",
    "Animal Control / Veterinary Department",
    "Grievance Redressal / Complaint Cell",
    "Disaster Management Department",
    "Women & Child Safety Department",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zone: "",
  });

  const navigate = useNavigate();

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
        ...SummaryApi.adminCreateDepartment,
        data: formData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", phone: "", zone: "" });
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-teal-100 transform transition-all duration-300 hover:shadow-xl animate-fadeIn">
      <div className="relative mb-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-teal-700 rounded-t-xl"></div>
        <div className="text-center pt-6">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-teal-100 shadow-md">
            <Building2 size={36} className="text-teal-700" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-teal-800 animate-slideDown">
            Create Department
          </h2>
          <p className="text-teal-600 mb-6 max-w-md mx-auto">
            Add a new department with relevant contact and zone information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Select */}
        <div className="animate-slideRight" style={{ animationDelay: '0.1s' }}>
          <label className="block text-teal-700 font-medium mb-2" htmlFor="department">
            Department Name
          </label>
          <select
            id="department"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-teal-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 transform hover:-translate-y-0.5 hover:shadow-md"
            required
          >
            <option value="">Select Department</option>
            {departmentOptions.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div className="animate-slideRight" style={{ animationDelay: '0.2s' }}>
          <label className="block text-teal-700 font-medium mb-2" htmlFor="email">
            Department Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-500">
              <Mail size={18} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 transform hover:-translate-y-0.5 hover:shadow-md"
              placeholder="Enter department email"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="animate-slideRight" style={{ animationDelay: '0.3s' }}>
          <label className="block text-teal-700 font-medium mb-2" htmlFor="phone">
            Department Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-500">
              <Phone size={18} />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 transform hover:-translate-y-0.5 hover:shadow-md"
              placeholder="Enter department phone"
              required
            />
          </div>
        </div>

        {/* Zone */}
        <div className="animate-slideRight" style={{ animationDelay: '0.4s' }}>
          <label className="block text-teal-700 font-medium mb-2" htmlFor="zone">
            Department Zone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-teal-500">
              <MapPin size={18} />
            </div>
            <input
              type="text"
              id="zone"
              name="zone"
              value={formData.zone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 transform hover:-translate-y-0.5 hover:shadow-md"
              placeholder="Enter department zone"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white p-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
          >
            <PlusCircle size={18} className="mr-2" />
            <span>Create Department</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDepartment;
