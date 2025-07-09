import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "dotenv";
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js'
import Complaint from '../models/complaint.model.js';
import Admin from '../models/admin.model.js';
import { detectCategoryAndPriority } from "../utils/aiHelper.js";
import { generateSummary } from "../utils/gemini.js";


config();

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    success: false;
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const logoutUserController = (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ success: true,  message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error while logging out" });
  }
};


export const registerComplaintController = async (req, res) => {
  try {
    const {
      title,
      description,
      latitude, longitude,
      locality, city, state,
      department
    } = req.body;

    const file = req.file;
    console.log(req.body)
    const userId = req.user._id;

    if (!title || !description || !latitude || !longitude || !locality || !department) {
      return res.status(400).json({
        message: 'Please provide all required fields including title, description, location, and department',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if(!file) {
      return res.status(400).json({ message: 'Please provide an image file' });
    }

    const admin = await Admin.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'Admin (Head Department) not found' });
    }

    let imageUrl = '';
    if (file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'GoBite' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
      imageUrl = uploadResult.secure_url;
    }

    const summary = await generateSummary(description);
    const { detectedCategory, detectedPriority } =
      detectCategoryAndPriority(description);

    const newComplaint = await Complaint.create({
      title,
      description:summary,
      imageUrl,
      latitude,
      longitude,
      locality,
      city,
      state,
      user: userId,
      department,
      category: detectedCategory, // <-- added detected category
      priority: detectedPriority, // <-- added detected priority
      statusHistory: [
        {
          status: "pending",
          updatedBy: userId,
        },
      ],
    });



    user.complaints.push(newComplaint._id);
    await user.save();

    admin.assignedComplaints.push(newComplaint._id);
    await admin.save();

    return res.status(201).json({
      message: 'Complaint registered successfully and assigned to Head Department',
      success: true,
      complaint: newComplaint
    });

  } catch (error) {
    console.error('Error registering complaint:', error);
    return res.status(500).json({
      message: 'Something went wrong while registering the complaint',
      error: error.message,
    });
  }
};


export const updateProfileController = async (req, res) => {
  try {
      const { name, email, phone } = req.body;
      const userId = req.user._id; // Assuming the user ID is set by the authentication middleware

      // Check if the required fields are provided for update
      if (!name && !email && !phone) {
          return res.status(400).json({ message: "At least one field must be provided for update" });
      }

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Check if email is being updated and if the new email already exists
      if (email && email !== user.email) {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
              return res.status(409).json({ message: "Email is already in use" });
          }
      }

      // Update user details (excluding password)
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
              name: name || user.name,
              email: email || user.email,
              phone: phone || user.phone,
          },
          { new: true } // This will return the updated user
      );

      // Generate a new JWT token (if email or any details are updated)
      const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // Send the updated user details and the new token
      res.cookie("token", token);

      res.status(200).json({
          message: "Profile updated successfully",
          success: true,
          user: updatedUser,
          token,
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
  }
};


export const updatePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id; 

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old password and new password are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedNewPassword, 
      },
      { new: true } 
    );

    
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      message: "Password updated successfully",
      success: true,
      user: {
        id: updatedUser._id,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


export const getMyComplaints = async (req, res) => {
  try {
    const userId = req.user._id; // assuming auth middleware sets req.user

    const complaints = await Complaint.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      complaints,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getSingleComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // assuming the user's id is attached to req.user

    // Find the complaint by id and ensure it belongs to the user
    const complaint = await Complaint.findOne({ _id: id, user: userId });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found or unauthorized" });
    }

    res.status(200).json({
      success : true,
      complaint
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
