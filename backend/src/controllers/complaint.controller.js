import  Complaint from "../models/complaint.model.js";

export const getTweetData = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const userId = req.user._id;
    
    

    const complaint = await Complaint.findById(complaintId).populate("user");
    console.log('complaint:', complaint);
    

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.user._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to tweet this complaint",
      });
    }

    if (!complaint.tweetAllowed) {
      return res.status(403).json({
        success: true,
        message: "Tweeting is not allowed for this complaint yet",
      });
    }

    const tweetText = `🚨 My complaint (#${complaint._id}) is still unresolved after 10 days!

📌 Title: ${complaint.title}
📍 Location: ${complaint.city}, ${complaint.area}
📝 ${complaint.description}

#SmartCity #CitizenVoice`;

    return res.status(200).json({
      success: true,
      tweetText,
    });
  } catch (error) {
    console.error("Error in getTweetData:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while generating tweet",
    });
  }
};
