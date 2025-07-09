import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { useSelector } from 'react-redux';

const departmentOptions = [
  "Water Supply Department",
  "Sanitation & Waste Management Department",
  "Sewerage & Drainage Department",
  "Electricity / Street Lighting Department",
  "Roads & Public Works Department (PWD)",
  "Traffic Management Department",
  "Transport Department",
  "Health Department",
  "Fire & Emergency Services",
  "Town Planning / Building Department",
  "Revenue / Tax Department",
  "Encroachment / Enforcement Department",
  "Parks & Horticulture Department",
  "Pollution Control / Environment Department",
  "Animal Control / Veterinary Department",
  "Grievance Redressal / Complaint Cell",
  "Disaster Management Department",
  "Women & Child Safety Department",
];

const ViewUserSingleComplaint = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState({});
  const [selectedDept, setSelectedDept] = useState('');
  const user = useSelector(state => state?.user?.user);

  useEffect(() => {
    const api = { ...SummaryApi.viewUserSingleComplaint };
    const fetchComplaint = async () => {
      const response = await Axios({
        url: `${api.url}/${id}`,
        method: api.method,
      });
      setComplaint({ ...response.data.complaint });
      setSelectedDept(response.data.complaint.department);
    };
    fetchComplaint();
  }, [id]);

  const handleUpdateDepartment = async () => {
    try {
      const api = { ...SummaryApi.updateDepartment };
      await Axios({
        url: `${api.url}/${id}`,
        method: api.method,
        data: { department: selectedDept },
      });
      alert('Department updated successfully!');
    } catch (error) {
      alert('Error updating department');
    }
  };

  return (
    <div className="w-full h-screen overflow-auto px-6 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#1D1D1D] mb-2">{complaint.title}</h1>
        <p className="text-gray-500 text-sm mb-6">Complaint ID: {complaint._id}</p>

        {/* Grid Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 className="font-semibold">Department</h4>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
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

        {/* Get Location Button */}
        {complaint.latitude && complaint.longitude && (
          <div className="mb-6">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${complaint.latitude},${complaint.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              📍 Get Location on Map
            </a>
          </div>
        )}

        {/* Update Button (Visible to all users) */}
        <div className="mb-6">
          <button
            onClick={handleUpdateDepartment}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            ✅ Update Department
          </button>
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

export default ViewUserSingleComplaint;
