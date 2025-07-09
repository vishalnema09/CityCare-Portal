import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Department from "../models/department.model.js";
import { generateDepartmentID } from "../utils/generateDepartmentId.js";
import { generatePassword } from "../utils/generatePassword.js"; // Adjust the import path as needed
import sendEmail from "../utils/sendEmail.js";
import { departmentWelcomeTemplate } from "../utils/emailTemplate.js"; // adjust path
import Complaint from "../models/complaint.model.js";

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Admin already exists with this email." });
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);

    res.status(201).json({
      message: "Admin registered successfully.",
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (err) {
    console.error("Admin register error:", err);
    res
      .status(500)
      .json({ message: "Server error during admin registration." });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin,
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

export const logoutAdmin = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ success:true ,message: "Logged out successfully." });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Server error during logout." });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, email, phone, zone } = req.body;

    if (!name || !email || !zone || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required fields.",
      });
    }

    // 🔑 Generate department ID and password
    const dept_id = generateDepartmentID(name);
    const rawPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // 🔍 Check for existing department by email or dept_id
    const existingDept = await Department.findOne({
      $or: [{ email }, { dept_id }],
    });

    if (existingDept) {
      return res.status(409).json({
        success: false,
        message:
          "A department with this email or generated department ID already exists.",
      });
    }

    // ✅ Create and save the new department
    const newDepartment = new Department({
      name,
      email,
      phone,
      zone,
      dept_id,
      password: hashedPassword, // Save hashed password
    });

    await newDepartment.save();

    // 📧 Send email with credentials
    const subject = "🎉 Department Registration - Your Login Credentials";
    const html = departmentWelcomeTemplate(name, dept_id, rawPassword); // Send raw password to email
    await sendEmail(email, subject, html);

    return res.status(201).json({
      success: true,
      message: "Department created successfully and email sent.",
      department: newDepartment,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the department.",
      error: error.message,
    });
  }
};

export const forwardComplaint = async (req, res) => {
  try {
    const adminId = req.admin?._id; // Taken from auth middleware
    if(!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const department = await Department.findOne({ name: complaint.department });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    if (department.assignedComplaints.includes(complaint._id)) {
      return res.status(400).json({ message: "Complaint already forwarded" });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update complaint
    complaint.status = "under review";
    await complaint.save();

    // Update department
    if (!department.assignedComplaints.includes(complaint._id)) {
      department.assignedComplaints.push(complaint._id);
    }

    department.actionsTaken.push({
      complaintId: complaint._id,
      status: "under review",
      message: "Complaint forwarded by admin.",
    });

    await department.save();

    admin.complaintActions.push({
      complaintId: complaint._id,
      actionType: "Forwarded",
      departmentId: department._id,
      message: `Forwarded to ${department.name}`, // Fixed template literal
    });

    await admin.save();

    res
      .status(200)
      .json({ message: `Complaint Successfully forwarded to ${department.name}`,
        success: true,
      }); // Fixed template literal
  } catch (error) {
    console.error("Error while forwarding the complaint:", error); // Added logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAssignedComplaintsController = async (req, res) => {
  try {
    const adminId = req.admin._id; // Assuming the admin is authenticated and stored in req.admin

    // Find the admin by ID
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found.',
      });
    }

    // Fetch assigned complaints separately with sorting by priority
    const complaints = await Complaint.find({ _id: { $in: admin.assignedComplaints } }).sort({ 
      priority: -1 // Sort by priority: High first, then Medium, then Low
    });

    if (complaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No complaints assigned to this admin.',
      });
    }

    // Return the sorted complaints
    res.status(200).json({
      success: true,
      complaints: complaints,
    });
  } catch (error) {
    console.error('Error fetching assigned complaints:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
    });
  }
};

export const fetchSingleComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    if (!complaintId) {
      return res.status(400).json({
        success: false,
        message: 'Complaint ID is required.',
      });
    }

    // Find the complaint by its ID
    const complaintDetails = await Complaint.findById(complaintId)
     
    if (!complaintDetails) {
      return res.status(404).json({
        success: false,
        message: 'Complaint details not found.',
      });
    }

    // Return the complaint details
    res.status(200).json({
      success: true,
      complaint: complaintDetails,
    });
  } catch (error) {
    console.error('Error fetching complaint details:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
    });
  }
};

export const getForwardedComplaints = async (req, res) => {
  try {
    const admin = req.admin; // The admin is attached from the authenticateAdmin middleware
    console.log("Admin ID:", admin._id); // Log the admin ID for debugging
    console.log("Admin Complaint Actions:", admin.complaintActions); // Log the actions for debugging

    // Check if admin has complaintActions and filter those with actionType 'Forwarded'
    const forwardedComplaintIds = admin.complaintActions
      .filter((action) => action.actionType === "Forwarded")
      .map((action) => action.complaintId);
    
    console.log("Forwarded Complaint IDs:", forwardedComplaintIds); // Check forwarded complaints IDs

    // If there are no forwarded complaints, return 404
    if (forwardedComplaintIds.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No forwarded complaints found.",
      });
    }

    // Fetch the complaints using the complaintIds that were forwarded
    const forwardedComplaints = await Complaint.find({
      _id: { $in: forwardedComplaintIds },  // Match the forwarded complaint IDs
    });

    // If no complaints are found, return 404
    if (forwardedComplaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No forwarded complaints found. here ",
      });
    }

    // Return the forwarded complaints
    res.status(200).json({
      success: true,
      complaints: forwardedComplaints,
    });
  } catch (error) {
    console.error("Error fetching forwarded complaints:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const fetchRejectedComplaints = async (req, res) => {
  try {
    const admin = req.admin; // The admin is attached from the authenticateAdmin middleware
    // console.log("Admin ID:", admin.complaintActions); // Log the admin ID for debugging
    

    // Fetch all complaints forwarded by this admin
    const rejectedComplaints = await Complaint.find({
      _id: {
        $in: admin.complaintActions
          .filter((action) => action.actionType === "Rejected")
          .map((action) => action.complaintId),
      },
    });

    if (rejectedComplaints.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Rejected complaints found.",
      });
    }

    // Return the forwarded complaints
    res.status(200).json({
      success: true,
      complaints: rejectedComplaints,
    });
  } catch (error) {
    console.error("Error fetching Rejected complaints:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const fetchClosedComplaints = async (req, res) => {
  try {
    const admin = req.admin; // The admin is attached from the authenticateAdmin middleware
    // console.log("Admin ID:", admin.complaintActions); // Log the admin ID for debugging
    

    // Fetch all complaints forwarded by this admin
    const closedComplaints = await Complaint.find({
      _id: {
        $in: admin.complaintActions
          .filter((action) => action.actionType === "Closed")
          .map((action) => action.complaintId),
      },
      
    });

    if (closedComplaints.length === 0) {
      return res.status(200).json({
       success: true,
        message: "No Closed complaints found.",
      });
    }

    // Return the forwarded complaints
    res.status(200).json({
      success: true,
      complaints: closedComplaints,
    });
  } catch (error) {
    console.error("Error fetching Rejected complaints:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};  // check


export const getPendingComplaintsAssignedToAdmin = async (req, res) => {
  try {
    const admin = req.admin; // The admin is attached from the authenticateAdmin middleware
   

    // Get the complaint IDs assigned to this admin
    const assignedComplaintIds = admin.assignedComplaints;

    if (assignedComplaintIds.length === 0) {
      return res.status(200).json({
        message: "No complaints assigned to this admin.",
      });
    }

    // Get the complaint IDs of complaints forwarded by this admin
    const forwardedComplaintIds = admin.complaintActions
      .filter((action) => action.actionType === "Forwarded")
      .map((action) => action.complaintId);

    // Fetch the complaints assigned to the admin but not forwarded by the admin, and with status 'Pending'
    const pendingComplaints = await Complaint.find({
      _id: { $in: assignedComplaintIds }, // Match complaints assigned to the admin
      status: "pending", // Only fetch complaints with 'pending' status
      _id: { $nin: forwardedComplaintIds }, // Exclude complaints already forwarded by the admin
    });

    // If no complaints are found, return 404
    if (pendingComplaints.length === 0) {
      return res.status(200).json({
       
        message: "No pending complaints assigned to this admin that are not forwarded.",
      });
    }

    // Return the pending complaints
    res.status(200).json({
      success: true,
      complaints: pendingComplaints,
    });
  } catch (error) {
    console.error("Error fetching pending complaints assigned to admin:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const getEscalatedComplaintsByAdmin = async (req, res) => {
  try {
      const adminId = req.admin._id; // Admin is authenticated and available in req.user

      const escalatedComplaints = await Complaint.find({
          status: 'escalated', // Only complaints which are escalated
      });
      console.log('escalated', escalatedComplaints);


      res.status(200).json({
          success: true,
          count: escalatedComplaints.length,
          escalatedComplaints,
      });
  } catch (error) {
      console.error('Error fetching escalated complaints for admin:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch escalated complaints.',
      });
  }
};
