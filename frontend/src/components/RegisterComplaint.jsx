import React, { useRef, useState } from "react";
import { IoLocationSharp } from "react-icons/io5"; // Location icon from react-icons
import Webcam from "react-webcam";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";

const RegisterComplaint = () => {
  // Initial state for form data
  const initialFormData = {
    complaintTitle: "",
    complaintDescription: "",
    latitude: "",
    longitude: "",
    locality: "",
    city: "",
    state: "",
    department: "",
    image: null,
  };
  
  // State to hold form field values
  const [formData, setFormData] = useState(initialFormData);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();


  // Handle change for input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Only allow one file
    });
  };

  // Handle department dropdown change
  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      department: e.target.value,
    });
  };

  // Get current location (latitude and longitude)
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
          latitude: latitude,
          longitude: longitude,
        });

        // Reverse geocoding to get the location details (locality, city, state)
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
          .then((response) => response.json())
          .then((data) => {
            const address = data.address;
            setFormData((prevState) => ({
              ...prevState,
              locality:
                address.suburb ||
                address.neighbourhood ||
                address.road ||
                "N/A",
              city: address.city || address.town || address.village || "N/A",
              state: address.state || "N/A",
            }));
          })
          .catch((error) => {
            console.error("Error fetching location details:", error);
            alert("Failed to fetch location details.");
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const capturePhoto = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.complaintTitle || !formData.complaintDescription || !formData.latitude || !formData.longitude || !formData.locality || !formData.city || !formData.state || !formData.department) {
    //     alert("Please fill all fields and upload an image before submitting the complaint.");
    //     return;
    // }
      try {
        setLoading(true);
        const blob = await fetch(imageSrc).then((res) => res.blob());
        const file = new File([blob], "captured_image.jpg", {
        type: "image/jpeg",
        });

        const formDatanew = new FormData();
        formDatanew.append("image", file); 
        formDatanew.append("title", formData.complaintTitle);
        formDatanew.append("description", formData.complaintDescription);
        formDatanew.append("department", formData.department);
        formDatanew.append("latitude", formData.latitude);
        formDatanew.append("longitude", formData.longitude);
        formDatanew.append("locality", formData.locality);
        formDatanew.append("city", formData.city);
        formDatanew.append("state", formData.state);
        console.log(formDatanew.get("image")); 

        const response = await axios.post('http://localhost:3000/api/user/register/complaint', formDatanew, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });

        
          if (response.data.success) {
            toast.success(response.data.message);
            setFormData(initialFormData); // Reset form data after successful submission
            navigate("/user/dashboard");
          } else {
            toast.error(response.data.message || "Something went wrong!");
          }
        setLoading(false);
      } catch (error) {
        console.error(error);
        AxiosToastError(error);
      }

  }

  // Handle form submission

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-8 justify-center">
      {/* Right Side (Complaint Form) */}
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-8 px-6">
        <h2 className="text-3xl font-bold mb-6 text-teal-600">
          Register Your Complaint
        </h2>

        {/* Complaint Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Complaint Title */}
          <div>
            <label className="text-teal-600 mb-2 block">Complaint Title</label>
            <input
              type="text"
              name="complaintTitle"
              value={formData.complaintTitle}
              onChange={handleInputChange}
              placeholder="Enter Complaint Title"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-teal-600 mb-2 block">
              Complaint Description
            </label>
            <textarea
              name="complaintDescription"
              value={formData.complaintDescription}
              onChange={handleInputChange}
              placeholder="Enter Complaint Description"
              className="border rounded-xl p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
              required
            ></textarea>
          </div>

          {/* Location Fields (Group) */}
          <div>
            <label className="text-teal-600 mb-2 block">Location</label>
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl py-2 px-4 flex items-center gap-2"
              >
                <IoLocationSharp className="text-lg" />
                Get Current Location
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-teal-600 mb-2 block">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="Enter Latitude"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-teal-600 mb-2 block">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="Enter Longitude"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-teal-600 mb-2 block">
                  Locality / Area
                </label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  placeholder="Enter Locality/Area"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-teal-600 mb-2 block">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter City"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-teal-600 mb-2 block">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter State"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="text-teal-600 mb-2 block">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleDepartmentChange}
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
              required
            >
              <option value="">Select Department</option>
              <option value="Water Supply Department">
                Water Supply Department
              </option>
              <option value="Sanitation & Waste Management Department">
                Sanitation & Waste Management Department
              </option>
              <option value="Sewerage & Drainage Department">
                Sewerage & Drainage Department
              </option>
              <option value="Electricity / Street Lighting Department">
                Electricity / Street Lighting Department
              </option>
              <option value="Roads & Public Works Department (PWD)">
                Roads & Public Works Department (PWD)
              </option>
              <option value="Traffic Management Department">
                Traffic Management Department
              </option>
              <option value="Transport Department">Transport Department</option>
              <option value="Health Department">Health Department</option>
              <option value="Fire & Emergency Services">
                Fire & Emergency Services
              </option>
              <option value="Town Planning / Building Department">
                Town Planning / Building Department
              </option>
              <option value="Revenue / Tax Department">
                Revenue / Tax Department
              </option>
              <option value="Encroachment / Enforcement Department">
                Encroachment / Enforcement Department
              </option>
              <option value="Parks & Horticulture Department">
                Parks & Horticulture Department
              </option>
              <option value="Pollution Control / Environment Department">
                Pollution Control / Environment Department
              </option>
              <option value="Animal Control / Veterinary Department">
                Animal Control / Veterinary Department
              </option>
              <option value="Grievance Redressal / Complaint Cell">
                Grievance Redressal / Complaint Cell
              </option>
              <option value="Disaster Management Department">
                Disaster Management Department
              </option>
              <option value="Women & Child Safety Department">
                Women & Child Safety Department
              </option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="text-teal-600 mb-2 block">Click Image</label>
            <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-sm mx-auto">
              {!imageSrc ? (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-lg overflow-hidden"
                    videoConstraints={{
                      facingMode: "environment",
                    }}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "4/3", // thoda standard camera ratio
                      objectFit: "cover",
                    }}
                  />
                  <button
                    onClick={capturePhoto}
                    className="bg-teal-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                  >
                    Capture Photo
                  </button>
                </>
              ) : (
                <>
                  <img
                    src={imageSrc}
                    alt="Captured"
                    className="rounded-lg object-cover w-full aspect-video"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setImageSrc(null)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
                      Retake Photo
                    </button>
                    
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {
            loading ? (
              <button
                type="button"
                className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-xl w-full cursor-not-allowed opacity-50"
                disabled
              >
                Submitting...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 w-full"
              >
                Submit Complaint
              </button>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default RegisterComplaint;
