import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true // e.g., "Drainage Dept", "Electricity Dept"
  },

  dept_id : {
    type: String,
    required: true,
    unique: true // e.g., "DPT001", "DPT002"
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: true
  },

  zone: {
    type: String, // Optional, for location-specific departments
    trim: true
  },

  assignedComplaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'complaint'
    }
  ],

  actionsTaken: [
    {
      complaintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complaint',
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'under review', 'in progress', 'resolved', 'rejected'],
        required: true
      },
      message: {
        type: String
      },
      actionDate: {
        type: Date,
        default: Date.now
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Department = mongoose.model('department', DepartmentSchema);
export default Department;