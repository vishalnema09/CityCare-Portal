import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DepartmentAllResolvedComplaints = () => {

    const departmentComplaints = useSelector((state) => state.departmentComplaint);
    const [complaints, setComplaints] = useState([...departmentComplaints.resolvedComplaints]);


    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">All Resolved Complaints</h1>

            {/* Container with scroll */}
            <div className="h-[600px] overflow-y-scroll pr-3 space-y-6">
                {complaints.map((complaint) => (
                    <div
                        key={complaint.id}
                        className="bg-white w-full p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-2xl font-semibold text-gray-800">{complaint.complaintId.title}</h2>
                                <p className="text-gray-600">Description: {complaint.complaintId.description}</p>
                                <p className="font-semibold mt-2 text-green-500">
                                    Status: {complaint.complaintId.status}
                                </p>
                            </div>

                            {/* View Details Button */}
                            <div>
                                <button
                                    className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* No complaints found message */}
                {complaints.length === 0 && (
                    <div className="text-center text-gray-500 text-lg">
                        No resolved complaints found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepartmentAllResolvedComplaints;
