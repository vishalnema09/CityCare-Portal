import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const ViewAdminSingleComplaint = () => {

  const {id} = useParams();
  console.log(id)
  const [complaint, setComplaint] = useState({})
  useEffect(() => {
    const api = {...SummaryApi.viewAdminSingleComplaint};
    let call = {
        url : api.url+`/${id}`,
        method : api.method,
    }
    const fetchComplaint = async () => {
        const response = await Axios({
            ...call,  // dhyan se userLogin ka use          // apna formData pass karna hai
        });
        setComplaint({...response.data.complaint})
    }
    fetchComplaint();
  })

  return (
    <div className="w-full h-screen overflow-auto px-6 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#1D1D1D] mb-2">{complaint.title}</h1>
        <p className="text-gray-500 text-sm mb-6">Complaint ID: {complaint._id}</p>

        {/* Grid Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 className="font-semibold">Department</h4>
            <p>{complaint.department}</p>
          </div>
          <div>
            <h4 className="font-semibold">Status</h4>
            <span
              className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                complaint.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : complaint.status === 'under review'
                  ? 'bg-blue-100 text-blue-800'
                  : complaint.status === 'in progress'
                  ? 'bg-purple-100 text-purple-800'
                  : complaint.status === 'resolved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {complaint.status}
            </span>
          </div>
          <div>
            <h4 className="font-semibold">Escalated</h4>
            <p>{complaint.escalated ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Locality</h4>
            <p>{complaint.locality}</p>
          </div>
          <div>
            <h4 className="font-semibold">City</h4>
            <p>{complaint.city || 'N/A'}</p>
          </div>
          <div>
            <h4 className="font-semibold">State</h4>
            <p>{complaint.state || 'N/A'}</p>
          </div>
          <div>
            <h4 className="font-semibold">Latitude</h4>
            <p>{complaint.latitude}</p>
          </div>
          <div>
            <h4 className="font-semibold">Longitude</h4>
            <p>{complaint.longitude}</p>
          </div>
          <div>
            <h4 className="font-semibold">Created At</h4>
            <p>{new Date(complaint.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="font-semibold mb-1">Description</h4>
          <p className="text-gray-700">{complaint.description}</p>
        </div>

        {/* Image */}
        {complaint.imageUrl && (
          <div className="mb-6">
            <h4 className="font-semibold mb-1">Attached Image</h4>
            <img
              src={complaint.imageUrl}
              alt="Complaint"
              className="w-full h-auto rounded-xl border"
            />
          </div>
        )}

        {/* Back Button */}
        <div className="text-right">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-[#007AFF] text-white rounded-xl hover:bg-blue-600 transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminSingleComplaint;
