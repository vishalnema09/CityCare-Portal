import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },

  isLoggedIn: {
    type: Boolean,
    default: false,
  },

  assignedComplaints: [
    {
      type: Schema.Types.ObjectId,
      ref: "complaint",
    },
  ],

  complaintActions: [
    {
      complaintId: {
        type: Schema.Types.ObjectId,
        ref: "complaint",
      },
      actionType: {
        type: String,
        enum: ["Forwarded", "Closed", "Rejected"],
      },
      departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  escalatedComplaints: [
    // New field to track escalated complaints
    {
      complaintId: {
        type: Schema.Types.ObjectId,
        ref: "complaint",
      },
      escalationDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = model("admin", AdminSchema);
export default Admin;
