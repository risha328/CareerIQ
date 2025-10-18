const Application = require('../models/Application');
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const Resume = require('../models/Resume');
const User = require('../models/User'); // Register User model for populate
const { getRankedCandidates } = require('../utils/aiServiceHelper');

/**
 * Get ranked candidates for a specific job
 */
const getRankedCandidatesForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Verify job belongs to employer
    const job = await Job.findOne({
      _id: jobId,
      employerId: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Get all candidates with their resumes and user data
    const candidates = await Candidate.find({})
      .populate('userId', 'name email') // Populate user data for name and email
      .populate({
        path: 'resumes',
        select: 'parsedData',
        options: { sort: { uploadedAt: -1 }, limit: 1 } // Get latest resume
      });

    // Get existing applications for this job
    const existingApplications = await Application.find({ jobId })
      .populate('candidateId', 'name email')
      .populate('resumeId', 'parsedData matchScore');

    // Create candidate rankings based on skills matching
    const candidatesWithStatus = candidates.map(candidate => {
      const latestResume = candidate.resumes[0];
      const candidateSkills = latestResume ? latestResume.parsedData.skills : [];
      const jobSkills = job.requirements.skills || [];

      // Calculate match score
      const matchingSkills = candidateSkills.filter(skill =>
        jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
      );
      const matchScore = jobSkills.length > 0 ? Math.round((matchingSkills.length / jobSkills.length) * 100) : 0;

      // Find existing application
      const existingApp = existingApplications.find(app =>
        app.candidateId && app.candidateId._id.toString() === candidate._id.toString()
      );

      return {
        candidateId: candidate._id.toString(),
        name: candidate.userId ? candidate.userId.name : 'Unknown',
        email: candidate.userId ? candidate.userId.email : 'unknown@example.com',
        matchScore: matchScore,
        skills: candidateSkills,
        matchingSkills: matchingSkills,
        status: existingApp ? existingApp.status : 'not_applied',
        applicationId: existingApp ? existingApp._id : null,
        appliedAt: existingApp ? existingApp.appliedAt : null
      };
    }).filter(candidate => candidate.matchScore > 0) // Only show candidates with some match
    .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending

    res.json({
      job: {
        id: job._id,
        title: job.title,
        company: job.company
      },
      candidates: candidatesWithStatus
    });
  } catch (error) {
    console.error('Error getting ranked candidates:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Shortlist a candidate for a job
 */
const shortlistCandidate = async (req, res) => {
  try {
    const { id } = req.params; // candidate ID
    const { jobId, notes } = req.body;

    // Verify job belongs to employer
    const job = await Job.findOne({
      _id: jobId,
      employerId: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Find or create application
    let application = await Application.findOne({ jobId, candidateId: id });

    if (!application) {
      // Get the candidate's latest resume
      const candidate = await Candidate.findById(id).populate({
        path: 'resumes',
        options: { sort: { uploadedAt: -1 }, limit: 1 }
      });

      if (!candidate || !candidate.resumes || candidate.resumes.length === 0) {
        return res.status(400).json({ message: 'Candidate must have at least one resume to apply' });
      }

      // Create new application if doesn't exist
      application = new Application({
        jobId,
        candidateId: id,
        resumeId: candidate.resumes[0]._id,
        status: 'shortlisted',
        employerNotes: notes
      });
    } else {
      // Update existing application
      application.status = 'shortlisted';
      application.employerNotes = notes;
      application.updatedAt = new Date();
    }

    await application.save();

    // Add application to job if not already there
    if (!job.applications.includes(application._id)) {
      job.applications.push(application._id);
      await job.save();
    }

    res.json({
      message: 'Candidate shortlisted successfully',
      application
    });
  } catch (error) {
    console.error('Error shortlisting candidate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Reject a candidate for a job
 */
const rejectCandidate = async (req, res) => {
  try {
    const { id } = req.params; // candidate ID
    const { jobId, notes } = req.body;

    // Verify job belongs to employer
    const job = await Job.findOne({
      _id: jobId,
      employerId: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Find or create application
    let application = await Application.findOne({ jobId, candidateId: id });

    if (!application) {
      // Get the candidate's latest resume
      const candidate = await Candidate.findById(id).populate({
        path: 'resumes',
        options: { sort: { uploadedAt: -1 }, limit: 1 }
      });

      if (!candidate || !candidate.resumes || candidate.resumes.length === 0) {
        return res.status(400).json({ message: 'Candidate must have at least one resume to apply' });
      }

      // Create new application if doesn't exist
      application = new Application({
        jobId,
        candidateId: id,
        resumeId: candidate.resumes[0]._id,
        status: 'rejected',
        employerNotes: notes
      });
    } else {
      // Update existing application
      application.status = 'rejected';
      application.employerNotes = notes;
      application.updatedAt = new Date();
    }

    await application.save();

    // Add application to job if not already there
    if (!job.applications.includes(application._id)) {
      job.applications.push(application._id);
      await job.save();
    }

    res.json({
      message: 'Candidate rejected successfully',
      application
    });
  } catch (error) {
    console.error('Error rejecting candidate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all applications for employer's jobs
 */
const getApplications = async (req, res) => {
  try {
    // Get all jobs by this employer
    const jobs = await Job.find({ employerId: req.user.id }).select('_id');
    const jobIds = jobs.map(job => job._id);

    // Get all applications for these jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title company')
      .populate({
        path: 'candidateId',
        populate: {
          path: 'userId',
          model: 'User', // Ensure Mongoose knows what to populate
          select: 'name email'
        }
      })
      .populate('resumeId', 'parsedData')
      .sort({ appliedAt: -1 });

    // Directly send transformed output
    const transformedApplications = applications.map(app => ({
      _id: app._id,
      job: app.jobId,
      candidate: {
        id: app.candidateId?._id,
        name: app.candidateId?.userId?.name || 'Unknown',
        email: app.candidateId?.userId?.email || 'unknown@example.com',
      },
      resume: app.resumeId?.parsedData || {},
      appliedAt: app.appliedAt
    }));

    res.json({ applications: transformedApplications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRankedCandidatesForJob,
  shortlistCandidate,
  rejectCandidate,
  getApplications
};
