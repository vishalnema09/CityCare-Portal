import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setDeptAssignedComplaints } from "../store/departmentComplaintSlice";
import { useNavigate } from "react-router-dom";

const DepartmentAllComplaints = () => {
  const departmentComplaints = useSelector(
    (state) => state.departmentComplaint
  );
  const [complaints, setComplaints] = useState([
    ...departmentComplaints.assignedComplaints,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update status function
  const updateStatus = (id, newStatus) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint._id === id ? { ...complaint, status: newStatus } : complaint
    );
    setComplaints(updatedComplaints);
  };


  const handleUpdateStatus = async (id, value) => {
    try {
      const response = await Axios({
        ...SummaryApi.departmentComplaintUpdateStatus,
        data: {
          id,
          update: value
        }
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
  
        const allAssignedComplaintsRes = await Axios({
            ...SummaryApi.departmentGetAllAssignedComplaints,
          });
          dispatch(setDeptAssignedComplaints(allAssignedComplaintsRes.data.complaints));

        navigate("/department/dashboard/allComplaints");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
      // Optional: success toast or UI update
    } catch (error) {
      console.error(error);
      AxiosToastError(error); // if you're using this for error handling
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        All Complaints
      </h1>

      {/* Container with scroll but hidden scrollbar */}
      <div className="h-[600px] overflow-y-auto pr-3 space-y-6 scrollbar-hide">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white w-full p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
              {/* Complaint Info */}
              <div className="mb-4 md:mb-0 w-full">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {complaint.title}
                </h2>
                <p className="text-gray-600">
                  Description: {complaint.description}
                </p>
                <p
                  className={`font-semibold mt-2 ${
                    complaint.status === "Resolved"
                      ? "text-green-500"
                      : complaint.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  Status: {complaint.status}
                </p>

                {/* View Details button below status */}
                <div className="mt-3">
                  <button
                    onClick={() =>
                      alert(`Viewing details for: ${complaint.title}`)
                    } // replace with navigation
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              {complaint.status === "under review" && (
                <div className="flex flex-col space-y-3 mt-4 md:mt-0 md:ml-4">
                  <select
                    onChange={(e) =>
                      handleUpdateStatus(complaint._id, e.target.value)
                    }
                    defaultValue={complaint.status}
                    className="py-2 px-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="under review">Under Review</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentAllComplaints;
