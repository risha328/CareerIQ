const Candidate = require('../models/Candidate');
const Resume = require('../models/Resume');
const { uploadToCloudinary } = require('../utils/cloudinaryHelper');
const { parseResumeWithAI, getJobMatches } = require('../utils/aiServiceHelper');

// Upload resume
const uploadResume = async (req, res) => {
  try {
    const { id: userId } = req.user; // JWT payload has 'id', not 'userId'
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(file.path);

    // Parse with AI
    const parsedData = await parseResumeWithAI(url);

    // Find or create candidate
    let candidate = await Candidate.findOne({ userId });
    if (!candidate) {
      // Fetch user details from auth service
      const axios = require('axios');
      try {
        const authResponse = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/profile`, {
          headers: { Authorization: req.headers.authorization }
        });
        const userData = authResponse.data;

        // Create candidate with actual user data
        candidate = new Candidate({
          userId,
          name: userData.name,
          email: userData.email
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Fallback to JWT data if auth service is unavailable
        candidate = new Candidate({
          userId,
          name: req.user.name || 'Unknown',
          email: req.user.email || 'unknown@example.com'
        });
      }
      await candidate.save();
    } else {
      // Update existing candidate with correct data if it has default values
      if (candidate.name === 'Unknown' || candidate.email === 'unknown@example.com') {
        const axios = require('axios');
        try {
          const authResponse = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/profile`, {
            headers: { Authorization: req.headers.authorization }
          });
          const userData = authResponse.data;

          candidate.name = userData.name;
          candidate.email = userData.email;
          await candidate.save();
        } catch (error) {
          console.error('Failed to update user data:', error);
        }
      }
    }

    // Create resume record
    const resume = new Resume({
      candidateId: candidate._id, // Use candidate._id, not userId
      fileName: file.originalname,
      cloudinaryUrl: url,
      cloudinaryPublicId: publicId,
      parsedData: parsedData,
      parsedAt: new Date()
    });

    await resume.save();

    // Update candidate with resume reference
    await Candidate.findByIdAndUpdate(
      candidate._id,
      { $push: { resumes: resume._id } }
    );

    res.status(201).json({
      message: 'Resume uploaded and parsed successfully',
      resumeId: resume._id,
      parsedData
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ message: 'Failed to upload resume' });
  }
};

// Get job matches
const getMatches = async (req, res) => {
  try {
    const { id: userId } = req.user; // JWT payload has 'id', not 'userId'

    const candidate = await Candidate.findOne({ userId }).populate('resumes');
    if (!candidate || !candidate.resumes.length) {
      return res.status(404).json({ message: 'No resumes found' });
    }

    const latestResume = candidate.resumes[candidate.resumes.length - 1];
    const matches = await getJobMatches(latestResume.parsedData.skills, latestResume.parsedData.experience);

    res.json({ matches });
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({ message: 'Failed to get job matches' });
  }
};

// Get extracted skills
const getSkills = async (req, res) => {
  try {
    const { id: userId } = req.user; // JWT payload has 'id', not 'userId'

    const candidate = await Candidate.findOne({ userId }).populate('resumes');
    if (!candidate || !candidate.resumes.length) {
      return res.status(404).json({ message: 'No resumes found' });
    }

    const latestResume = candidate.resumes[candidate.resumes.length - 1];
    res.json({ skills: latestResume.parsedData.skills });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Failed to get skills' });
  }
};

// Get dashboard analytics
const getDashboard = async (req, res) => {
  try {
    const { id: userId } = req.user; // JWT payload has 'id', not 'userId'

    const candidate = await Candidate.findOne({ userId }).populate('resumes');
    if (!candidate || !candidate.resumes.length) {
      return res.status(404).json({ message: 'No resumes found' });
    }

    const latestResume = candidate.resumes[candidate.resumes.length - 1];
    const { parsedData, aiAnalysis } = latestResume;

    res.json({
      skills: parsedData.skills,
      experience: parsedData.experience,
      education: parsedData.education,
      skillGaps: aiAnalysis.skillGaps || [],
      matchScore: aiAnalysis.matchScore || 0,
      recommendedJobs: aiAnalysis.recommendedJobs || []
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Failed to get dashboard data' });
  }
};

// Get notifications (placeholder for now)
const getNotifications = async (req, res) => {
  try {
    const { id: userId } = req.user; // JWT payload has 'id', not 'userId'

    // Placeholder implementation - in real app, this would fetch from notifications collection
    const notifications = [
      { id: 1, message: 'New job match available', type: 'match', date: new Date() },
      { id: 2, message: 'Profile viewed by employer', type: 'view', date: new Date() }
    ];

    res.json({ notifications });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Failed to get notifications' });
  }
};

module.exports = {
  uploadResume,
  getMatches,
  getSkills,
  getDashboard,
  getNotifications
};
