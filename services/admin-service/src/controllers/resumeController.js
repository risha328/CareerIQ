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

const Resume = mongoose.model('Resume', resumeSchema);

// List all resumes
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ uploadedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete resume by ID
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
