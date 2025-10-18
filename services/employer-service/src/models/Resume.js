const mongoose = require('mongoose');

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
    experience: [String], // Changed to array of strings to match AI service output
    education: [String], // Changed to array of strings to match AI service output
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

module.exports = mongoose.model('Resume', resumeSchema);
