import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DepartmentAllPendingComplaints = () => {
    const departmentComplaints = useSelector((state) => state.departmentComplaint);
    const [complaints, setComplaints] = useState([...departmentComplaints.pendingComplaints]);

    // Update status and remove complaint
    const updateStatus = (id, newStatus) => {
        const updatedList = complaints.filter((complaint) => complaint._id !== id);
        setComplaints(updatedList);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Pending Complaints</h1>

            {/* Scroll container with hidden scrollbar */}
            <div className="h-[600px] overflow-y-auto pr-3 space-y-6 scrollbar-hide">
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <div
                            key={complaint._id}
                            className="bg-white w-full p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                                {/* Complaint Info */}
                                <div className="mb-4 md:mb-0 w-full">
                                    <h2 className="text-2xl font-semibold text-gray-800">{complaint.title}</h2>
                                    <p className="text-gray-600">Description: {complaint.description}</p>
                                    <p className="font-semibold mt-2 text-yellow-500">
                                        Status: {complaint.status}
                                    </p>

                                    {/* View Details Button */}
                                    <div className="mt-3">
                                        <button
                                            onClick={() =>
                                                alert(`Viewing details for: ${complaint.title}`) // Replace with actual navigation
                                            }
                                            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col space-y-3 mt-4 md:mt-0 md:ml-4">
                                    <button
                                        onClick={() => updateStatus(complaint._id, "Resolved")}
                                        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                    >
                                        Resolve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(complaint._id, "Rejected")}
                                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No pending complaints found.</p>
                )}
            </div>
        </div>
    );
};

export default DepartmentAllPendingComplaints;