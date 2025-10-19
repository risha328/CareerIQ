const mongoose = require('mongoose');

// Define models locally to avoid import issues
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'employer', 'admin'], required: true },
}, { timestamps: true });

const jobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    skills: [String],
    experience: String,
    education: String
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'closed'],
    default: 'active'
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const resumeSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  cloudinaryUrl: {
    type: String,
    required: true
  },
  cloudinaryPublicId: {
    type: String,
    required: true
  },
  parsedData: {
    skills: [String],
    experience: [String],
    education: [String],
    summary: String
  },
  aiAnalysis: {
    matchScore: Number,
    recommendedJobs: [{
      jobId: String,
      title: String,
      score: Number
    }],
    skillGaps: [String]
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  parsedAt: {
    type: Date
  }
});

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'rejected', 'hired'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  employerNotes: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Get or create models (avoid overwriting if already compiled)
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

exports.getAnalytics = async (req, res) => {
  try {
    // Get actual counts from database
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Get active users in last month (users created in last 30 days)
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const activeUsersLastMonth = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });

    // Calculate average match score from resumes with AI analysis
    const resumesWithScores = await Resume.find({ 'aiAnalysis.matchScore': { $exists: true } });
    const matchScoresAverage = resumesWithScores.length > 0
      ? resumesWithScores.reduce((sum, resume) => sum + (resume.aiAnalysis.matchScore || 0), 0) / resumesWithScores.length
      : 0;

    const analytics = {
      totalUsers,
      totalJobs,
      totalResumes,
      totalApplications,
      activeUsersLastMonth,
      matchScoresAverage: Math.round(matchScoresAverage * 100) / 100 // Round to 2 decimal places
    };

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: error.message });
  }
};
