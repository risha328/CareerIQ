require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./src/routes/userRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const resumeRoutes = require('./src/routes/resumeRoutes');
const fraudRoutes = require('./src/routes/fraudRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/resumes', resumeRoutes);
app.use('/fraud-reports', fraudRoutes);
app.use('/analytics', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Admin service running on port ${PORT}`);
});
