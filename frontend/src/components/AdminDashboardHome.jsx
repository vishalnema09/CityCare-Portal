import React, { useState } from "react";
import { FileText, CheckCircle, XCircle, Users, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminDashboardHome = () => {
  const complaint = useSelector((state) => state.complaint);

  const metrics = {
    totalComplaints: complaint.allComplaints?.length,
    resolvedComplaints: complaint.closedComplaints?.length,
    rejectedComplaints: complaint.rejectedComplaints?.length,
    pendingComplaints: complaint.pendingComplaints?.length,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 5;

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
        Bhopal Municipal Corporation
      </h1>

      {/* Top Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Total Complaints */}
        <Link
          to="/admin/dashboard/allcomplaints"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          <div className="flex items-center">
            <FileText size={24} className="text-teal-500 mr-4" />
            <h2 className="text-xl font-semibold text-teal-600">
              Total Complaints
            </h2>
          </div>
          {metrics.totalComplaints === undefined ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 rounded shadow-sm mt-4 text-sm">
              No total complaints found.
            </div>
          ) : (
            <p className="text-4xl font-bold text-teal-600 mt-4">
              {metrics.totalComplaints}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            All complaints submitted by users across departments.
          </p>
        </Link>

        {/* Resolved Complaints */}
        <Link
          to="/admin/dashboard/resolvedcomplaints"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          <div className="flex items-center">
            <CheckCircle size={24} className="text-green-600 mr-4" />
            <h2 className="text-xl font-semibold text-green-600">Resolved</h2>
          </div>
          {metrics.resolvedComplaints === undefined ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 rounded shadow-sm mt-4 text-sm">
              No resolved complaints here.
            </div>
          ) : (
            <p className="text-4xl font-bold text-teal-600 mt-4">
              {metrics.resolvedComplaints}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Complaints marked as successfully addressed.
          </p>
        </Link>

        {/* Rejected Complaints */}
        <Link
          to="/admin/dashboard/rejectedcomplaints"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          <div className="flex items-center">
            <XCircle size={24} className="text-red-500 mr-4" />
            <h2 className="text-xl font-semibold text-red-500">Rejected</h2>
          </div>
          {metrics.rejectedComplaints === undefined ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 rounded shadow-sm mt-4 text-sm">
              No rejected complaints here.
            </div>
          ) : (
            <p className="text-4xl font-bold text-teal-600 mt-4">
              {metrics.rejectedComplaints}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Complaints not accepted due to invalid reasons.
          </p>
        </Link>

        {/* Pending Complaints */}
        <Link
          to="/admin/dashboard/pendingcomplaints"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          <div className="flex items-center">
            <Clock size={24} className="text-yellow-500 mr-4" />
            <h2 className="text-xl font-semibold text-yellow-600">Pending</h2>
          </div>
          {metrics.pendingComplaints === undefined ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 rounded shadow-sm mt-4 text-sm">
              No pending complaints here.
            </div>
          ) : (
            <p className="text-4xl font-bold text-teal-600 mt-4">
              {metrics.pendingComplaints}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Complaints that are yet to be reviewed or resolved.
          </p>
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <Link
              to="/admin/dashboard/CreateDepartment"
              className="w-full block text-center py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
            >
              Create New Department
            </Link>
            <Link
              to="/admin/dashboard/allcomplaints"
              className="w-full block text-center py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
            >
              View All Complaints
            </Link>
            <Link
              to="/admin/dashboard/resolvedcomplaints"
              className="w-full block text-center py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
            >
              View Resolved Complaints
            </Link>
            <Link
              to="/admin/dashboard/pendingcomplaints"
              className="w-full block text-center py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
            >
              View Pending Complaints
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Dashboard Info
          </h2>
          <p className="text-gray-600 text-base">
            Welcome to the Admin Dashboard. Here, you can manage and monitor
            complaints received from users across different departments. Use the
            quick action buttons to navigate between complaint statuses and
            create new departments for better issue categorization.
          </p>
          <p className="text-gray-500 text-sm mt-3">
            Tip: Keep an eye on pending complaints to ensure timely resolution
            and boost user satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;