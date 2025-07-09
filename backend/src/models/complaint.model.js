import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: false
  },

  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  locality: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },

  status: {
    type: String,
    enum: ['pending', 'under review', 'in progress', 'resolved', 'rejected'],
    default: 'pending'
  },

  escalated: {
    type: Boolean,
    default: false
  },
  tweetAllowed: {
    type: Boolean,
    default: false
  },  
  resolutionDetails: {
    type: String,
    default: ''
  },

  resolvedAt: {
    type: Date
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  department: {
    type: String, // e.g., "North Zone", "Ward 4", "Drainage Dept"
    required: true
  },

  statusHistory: [
    {
      status: {
        type: String,
        enum: ['pending', 'under review', 'in progress', 'resolved', 'rejected'],
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    } 
  ],
  category: {
    type: String,
    default: "Other",
  },
  priority: {
    type: String,
    default: "Low",
  },

}, { timestamps: true });

const Complaint = mongoose.model('complaint', complaintSchema);
export default Complaint;
