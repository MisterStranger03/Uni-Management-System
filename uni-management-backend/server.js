// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');

// --- Initializations ---
const app = express();

// --- Middleware ---
// Allow requests from your Angular app (which runs on a different port)
app.use(cors());
// Allow the server to read JSON from request bodies
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Connection error', err));

// --- API Routes ---
// Tell the app to use your auth routes for any URL starting with /api/auth
app.use('/api/auth', authRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});