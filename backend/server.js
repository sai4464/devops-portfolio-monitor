require('dotenv').config(); // 🔑 Load .env FIRST before anything else

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');

const githubRoutes = require('./routes/github');
const { pollGitHub } = require('./poller/githubPoller');

const app = express();
const PORT = process.env.PORT || 5050;

// Enable CORS
app.use(cors());

// Routes
app.use('/api/github', githubRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('✅ Server now works on port 5050!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Poll GitHub immediately on startup
pollGitHub();

// Schedule weekly polling every Sunday at 5:00 AM
cron.schedule('0 5 * * 0', () => {
  console.log('🕒 Weekly GitHub stats pull triggered');
  pollGitHub();
});
