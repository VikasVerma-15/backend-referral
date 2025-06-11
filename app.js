const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import grouped router
const apiRoutes = require('./routes');

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Use grouped API routes under `/api`
app.use('/api', apiRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('🚀 Multi-Level Referral System Backend is Live!');
});

module.exports = app;
