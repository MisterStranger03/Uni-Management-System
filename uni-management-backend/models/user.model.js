// models/user.model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  role: { type: String, enum: ['student', 'professor'], required: true },
  // --- New fields for OTP Verification ---
  otp: { type: String, default: null },
  otpExpires: { type: Date, default: null },
  isVerified: { type: Boolean, default: false } // To track if the account is active
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);