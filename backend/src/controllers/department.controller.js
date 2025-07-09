import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Department from "../models/department.model.js";
import Complaint from "../models/complaint.model.js";
import Admin from "../models/admin.model.js";

export const loginDepartment = async (req, res) => {
  try {
    const { dept_id, password } = req.body;

    const department = await Department.findOne({ dept_id });
    if (!department) {
      return res.status(401).json({ message: "Invalid ID or password" });
    }

    const isMatch = await bcrypt.compare(password, department.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid ID or password" });
    }

    // ✅ Create Token
    const token = jwt.sign({ id: department._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ✅ Set Token in Cookie
    res.cookie("token", token);

    // ✅ Send Response
    res.status(200).json({
      message: "Login successful",
      success: true,
      department: department,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logoutDepartment = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ success: true,  message: "Logged out successfully." });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Server error during logout." });
  }
};

export const getAssignedComplaints = async (req, res) => {
  try {
    const departmentId = req.department._id;

    const department = await Department.findById(departmentId).populate({
      path: "assignedComplaints",
      model: "complaint",
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Assigned complaints fetched successfully",
      complaints: department.assignedComplaints,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching assigned complaints:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRejectedComplaints = async (req, res) => {
  try {
    const department = await Department.findById(req.department?._id).populate({
      path: "actionsTaken.complaintId",
      model: "complaint",
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const rejected = department.actionsTaken.filter(
      (action) => action.status === "rejected"
    );

    res.status(200).json({
      success: true,
      message: "Rejected complaints fetched successfully",
      complaints: rejected,
    });
  } catch (error) {
    console.error("Error fetching rejected complaints:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getResolvedComplaints = async (req, res) => {
  try {
    const department = await Department.findById(req.department._id).populate({
      path: "actionsTaken.complaintId",
      model: "complaint",
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const resolved = department.actionsTaken.filter(
      (action) => action.status === "resolved"
    );

    res.status(200).json({
      success: true,
      message: "Resolved complaints fetched successfully",
      complaints: resolved,
    });
  } catch (error) {
    console.error("Error fetching resolved complaints:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSingleComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({
      success: true,
      message: "Complaint fetched successfully",
      complaint,
    });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const department = req.department; // from auth middleware
    const { update, message, id } = req.body;

    const validStatuses = [
      "under review",
      "in progress",
      "resolved",
      "rejected",
    ];
    if (!validStatuses.includes(update)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // 1. Find the complaint
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // 2. Update complaint status
    complaint.status = update;
    await complaint.save();

    // 3. Update department's actionsTaken
    department.actionsTaken.push({
      complaintId: complaint._id,
      status : update,
      message: message || `Status updated to ${update}`,
    });
    await department.save();

    // 4. Update Admin's complaintActions
    const admin = await Admin.findOne({ assignedComplaints: complaint._id });
    if (admin) {
      let actionType = "Forwarded";
      if (update === "resolved") actionType = "Closed";
      else if (update === "rejected") actionType = "Rejected";

      admin.complaintActions.push({
        complaintId: complaint._id,
        actionType,
        departmentId: department._id,
        message: message || `Status updated to ${update} by ${department.name}`,
      });

      await admin.save();
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Complaint status updated successfully",
      });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getPendingComplaints = async (req, res) => {
  try {
    const pendingComplaints = await Complaint.find({ status: 'under review' });

    if (pendingComplaints.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No pending complaints found.' 
      });
    }

    res.status(200).json({
      success: true,
      count: pendingComplaints.length,
      complaints: pendingComplaints
    });
  } catch (error) {
    console.error('Error fetching pending complaints:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error. Could not fetch pending complaints.' 
    });
  }
};