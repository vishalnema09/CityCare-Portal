import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import axios from "axios"; // for tweet API

// Function to get Tailwind class for status badge
const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "under review":
      return "bg-blue-100 text-blue-800";
    case "in progress":
      return "bg-orange-100 text-orange-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ViewAllUserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [tweetText, setTweetText] = useState("");
  const [activeComplaintId, setActiveComplaintId] = useState(null);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      const response = await Axios({
        ...SummaryApi.userAllComplaints,
      });
      setComplaints([...response?.data?.complaints]);
      console.log(response.data);
    };
    fetchUserComplaints();
  }, []);

  const handleGetTweetData = async (complaintId) => {
    try {
      console.log("fetching");
      const res = await Axios({
        url: `/api/complaint/${complaintId}/tweet-data`,
        method: "GET",
      });
      const tweet = res.data.tweetText;
      const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweet
      )}`;
      window.open(tweetURL, "_blank"); // ← Directly open tweet window
    } catch (error) {
      alert("Error fetching tweet data");
    }
  };

  const handleTweetNow = () => {
    if (!tweetText) return;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetURL, "_blank");
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D1D1D]">
        Your Complaints
      </h1>

      <div className="flex flex-col gap-6">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white w-full shadow-md rounded-2xl p-6 border border-gray-100"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-[#1D1D1D]">
                {complaint.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {complaint.description.length > 120
                  ? complaint.description.slice(0, 120) + "..."
                  : complaint.description}
              </p>
              <span
                className={`self-start px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                  complaint.status
                )}`}
              >
                {complaint.status}
              </span>
            </div>

            <div className="mt-4 text-right flex float-end gap-3 flex-wrap">
              {complaint.tweetAllowed && complaint.status === "escalated" && (
                <button
                  onClick={() => handleGetTweetData(complaint._id)}
                  className="text-sm px-4 py-2 bg-[#000000] hover:bg-[#0d8ddb] text-white rounded-lg flex items-center gap-2 transition-all duration-300"
                >
                  <i className="ri-twitter-fill"></i>
                  Tweet Now
                </button>
              )}

              <Link
                to={`/user/dashboard/complaint/${complaint._id}`}
                className="text-sm px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
              >
                View Details
              </Link>
            </div>

            {activeComplaintId === complaint._id && tweetText && (
              <p className="mt-3 text-gray-700 text-sm italic">{tweetText}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllUserComplaints;
