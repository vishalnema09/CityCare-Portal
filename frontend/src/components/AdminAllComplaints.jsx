import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { setAllComplaints } from '../store/complaintSlice';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const AllComplaints = () => {
  const complaint = useSelector((state) => state.complaint);
  const complaints = [...complaint.allComplaints];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendToDepartment = async (id) => {
    const api = { ...SummaryApi.adminForwardComplaint };
    let call = {
      url: api.url + `/${id}`,
      method: api.method,
    };
    try {
      const response = await Axios({
        ...call,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        const allComplaintsRes = await Axios({
          ...SummaryApi.adminGetAllComplaints,
        });
        dispatch(setAllComplaints(allComplaintsRes.data.complaints));

        navigate('/admin/dashboard/allcomplaints');
      } else {
        toast.error(response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-[#181c2e] mb-6 border-b-2 border-[#6366f1] pb-2">
        All Complaints
      </h2>

      <div className="grid gap-6 overflow-y-auto h-[600px]">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row justify-between md:items-center transition-transform hover:scale-[1.01]"
          >
            {/* Left Side */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#1e293b] mb-2">
                {complaint.title}
              </h3>
              <p className="text-gray-600 mb-4">{complaint.description}</p>

              <span
                className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full shadow-sm ${
                  complaint.status === 'pending'
                    ? 'bg-yellow-400 text-white'
                    : complaint.status === 'resolved'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
              </span>
            </div>

            {/* Right Side Buttons */}
            <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0 md:ml-6">
              <Link
                to={`/admin/dashboard/complaint/${complaint._id}`}
                className="text-[#4f46e5] hover:underline font-medium"
              >
                View Details
              </Link>

              {complaint.status === 'pending' && (
                <button
                  onClick={() => handleSendToDepartment(complaint._id)}
                  className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-5 py-2 rounded-md font-semibold transition-colors duration-300"
                >
                  Send to Department
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComplaints;
