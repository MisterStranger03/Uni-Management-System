// controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- MODIFIED User Registration (Step 1: Generate OTP) ---
exports.register = async (req, res) => {
  try {
    // Overwrite existing unverified user, or block if already verified
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: 'A verified account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Set OTP to expire in 10 minutes
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // If user exists but isn't verified, update them. Otherwise, create new.
    if (existingUser) {
        existingUser.name = req.body.name;
        existingUser.password = hashedPassword;
        existingUser.dob = req.body.dob;
        existingUser.role = req.body.role;
        existingUser.otp = otp;
        existingUser.otpExpires = otpExpires;
        await existingUser.save();
    } else {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          dob: req.body.dob,
          role: req.body.role,
          otp,
          otpExpires
        });
    }

    //
    // !!! IN A REAL APP: SEND THE OTP VIA EMAIL OR SMS HERE !!!
    // For now, we'll just log it to the console for easy testing.
    console.log(`\n--- OTP for ${req.body.email}: ${otp} ---\n`);
    //
    
    res.status(200).json({ message: 'OTP sent to your email. Please verify.' });

  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.', error });
  }
};

// --- NEW User Verification (Step 2: Verify OTP) ---
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ 
            email, 
            otp, 
            otpExpires: { $gt: Date.now() } // Check if OTP is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or OTP has expired.' });
        }

        // Verification successful: update the user
        user.isVerified = true;
        user.otp = null; // Clear OTP for security
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: 'Account verified successfully! You can now log in.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error during verification.', error });
    }
};

// The login controller needs a small change to prevent unverified users from logging in
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.isVerified) { // <-- ADDED !user.isVerified check
      return res.status(401).json({ message: 'Invalid credentials or account not verified.' });
    }
    // ... rest of login function is the same
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const payload = { user: { id: user.id, role: user.role }};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.status(200).json({ message: 'Login successful!', accessToken: token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.', error });
  }
};