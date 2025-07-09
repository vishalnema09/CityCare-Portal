import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DepartmentAllRejectedComplaints = () => {
    // const [complaints, setComplaints] = useState([
    //     { id: 1, user: "John Doe", department: "HR", status: "Pending" },
    //     { id: 2, user: "Jane Smith", department: "Tech", status: "Resolved" },
    //     { id: 3, user: "Alice Johnson", department: "Finance", status: "Rejected" },
    //     { id: 4, user: "Bob White", department: "Support", status: "Pending" },
    //     { id: 5, user: "Charlie Brown", department: "HR", status: "Resolved" },
    //     { id: 6, user: "Eve Black", department: "Tech", status: "Rejected" },
    //     { id: 7, user: "David Green", department: "Finance", status: "Pending" },
    //     { id: 8, user: "Michael Scott", department: "Sales", status: "Pending" },
    //     { id: 9, user: "Pam Beesly", department: "Design", status: "Resolved" },
    //     { id: 10, user: "Jim Halpert", department: "Sales", status: "Pending" },
    //     { id: 11, user: "Dwight Schrute", department: "Operations", status: "Rejected" },
    //     { id: 12, user: "Angela Martin", department: "Finance", status: "Resolved" },
    //     { id: 13, user: "Oscar Martinez", department: "Finance", status: "Pending" },
    //     { id: 14, user: "Kevin Malone", department: "Finance", status: "Rejected" },
    //     { id: 15, user: "Stanley Hudson", department: "Sales", status: "Pending" },
    // ]);


    const departmentComplaints = useSelector((state) => state.departmentComplaint);
    const [complaints, setComplaints] = useState([...departmentComplaints.rejectedComplaints]);

    const rejectedComplaints = complaints.filter(c => c.status === "Rejected");

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">All Rejected Complaints</h1>

            {/* Container with scroll */}
            <div className="h-[600px] overflow-y-scroll pr-3 space-y-6">
                {complaints.map((complaint) => (
                    <div
                        key={complaint._id}
                        className="bg-white w-full p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-2xl font-semibold text-gray-800">{complaint.complaintId.title}</h2>
                                <p className="text-gray-600">Description: {complaint.complaintId.description}</p>
                                <p className="font-semibold mt-2 text-red-500">
                                    Status: {complaint.complaintId.status}
                                </p>
                            </div>

                            {/* Two Buttons */}
                            <div className="flex space-x-4">
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
                        No rejected complaints found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DepartmentAllRejectedComplaints;
