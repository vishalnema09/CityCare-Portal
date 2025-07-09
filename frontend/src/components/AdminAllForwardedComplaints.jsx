import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminAllForwardedComplaints = () => {
  const complaint = useSelector((state) => state.complaint);
  const forwardedComplaints = [...complaint.forwardedComplaints];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-[#181c2e] mb-6 border-b-2 border-[#3b82f6] pb-2">
        All Forwarded Complaints
      </h2>

      <div className="grid gap-6 overflow-y-auto h-[600px]">
        {forwardedComplaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row justify-between md:items-center transition-transform hover:scale-[1.01]"
          >
            {/* Left Content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#1e293b] mb-2">
                {complaint.title}
              </h3>
              <p className="text-gray-600 mb-4">{complaint.description}</p>

              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-blue-500 text-white shadow-sm">
                {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
              </span>
            </div>

            {/* Right Content */}
            <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0 md:ml-6">
              <Link
                to={`/admin/dashboard/complaint/${complaint._id}`}
                className="text-[#3b82f6] hover:underline font-medium"
              >
                View Details
              </Link>
              <span className="text-sm text-gray-500">
                Department: <span className="font-medium text-gray-700">{complaint.department}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllForwardedComplaints;
