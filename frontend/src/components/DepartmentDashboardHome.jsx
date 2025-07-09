import React, { useState } from "react";
import { FileText, CheckCircle, XCircle, Users, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DepartmentDashboardHome = () => {
    const department = useSelector((state) => state.department);
    const departmentComplaint = useSelector((state) => state.departmentComplaint);

    const metrics = {
        totalComplaints: departmentComplaint.assignedComplaints.length,
        resolvedComplaints: departmentComplaint.resolvedComplaints.length,
        rejectedComplaints: departmentComplaint.rejectedComplaints.length,
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50">
            <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
                {department.name} Dashboard
            </h1>

            {/* Top Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {/* Total Complaints */}
                <Link
                    to="/department/dashboard/allComplaints"
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                >
                    <div className="flex items-center">
                        <FileText size={24} className="text-teal-500 mr-4" />
                        <h2 className="text-xl font-semibold text-teal-600">Total Complaints</h2>
                    </div>
                    <p className="text-4xl font-bold text-teal-600 mt-4">{metrics.totalComplaints}</p>
                </Link>

                {/* Resolved Complaints */}
                <Link
                    to="/department/dashboard/closedComplaints"
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                >
                    <div className="flex items-center">
                        <CheckCircle size={24} className="text-green-500 mr-4" />
                        <h2 className="text-xl font-semibold text-green-600">Resolved Complaints</h2>
                    </div>
                    <p className="text-4xl font-bold text-teal-600 mt-4">{metrics.resolvedComplaints}</p>
                </Link>

                {/* Rejected Complaints */}
                <Link
                    to="/department/dashboard/allRejectedComplaint"
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                >
                    <div className="flex items-center">
                        <XCircle size={24} className="text-red-500 mr-4" />
                        <h2 className="text-xl font-semibold text-red-600">Rejected Complaints</h2>
                    </div>
                    <p className="text-4xl font-bold text-teal-600 mt-4">{metrics.rejectedComplaints}</p>
                </Link>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-lg ">
                    <h2 className="text-2xl font-semibold text-teal-600 mb-4">Quick Actions</h2>
                    <div className="space-y-4 flex flex-col">
                        <Link
                            to="/department/dashboard/allComplaints"
                            className="w-full py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
                        >
                            All Complaints
                        </Link>
                        <Link
                            to="/department/dashboard/allPendingComplaint"
                            className="w-full py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
                        >
                            All Pending Complaints
                        </Link>
                        <Link
                            to="/department/dashboard/allRejectedComplaint"
                            className="w-full py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
                        >
                            Rejected Complaints
                        </Link>
                        <Link
                            to="/department/dashboard/closedComplaints"
                            className="w-full py-3 px-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
                        >
                            Resolved Complaints
                        </Link>
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-teal-600 mb-4">Dashboard Info</h2>
                    <p className="text-gray-600 text-base">
                        Welcome to the {department.name} Dashboard. Here, you can manage and monitor complaints.
                    </p>
                    <p className="text-gray-500 text-sm mt-3">
                        Tip: Keep an eye on pending complaints to ensure timely resolution and boost user satisfaction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DepartmentDashboardHome;
