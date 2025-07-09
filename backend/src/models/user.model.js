import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address'
  },

  isBlocked: {
    type: Boolean,
    default: false
  },

  complaints: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'complaint'
  }]

}, { timestamps: true });

const User = mongoose.model('user', userSchema);
export default User;