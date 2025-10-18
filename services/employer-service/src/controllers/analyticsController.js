const Job = require('../models/Job');
const Application = require('../models/Application');

/**
 * Get analytics for employer's jobs and candidates
 */
const getAnalytics = async (req, res) => {
  try {
    const employerId = req.user.id;

    // Get all jobs by this employer
    const jobs = await Job.find({ employerId }).select('_id title status createdAt');

    const jobIds = jobs.map(job => job._id);

    // Get all applications for these jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title')
      .populate('candidateId', 'name email')
      .populate('resumeId', 'parsedData');

    // Calculate analytics
    const analytics = {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(job => job.status === 'active').length,
      totalApplications: applications.length,
      shortlistedCandidates: applications.filter(app => app.status === 'shortlisted').length,
      rejectedCandidates: applications.filter(app => app.status === 'rejected').length,
      pendingApplications: applications.filter(app => app.status === 'pending').length,
      hiredCandidates: applications.filter(app => app.status === 'hired').length,
      jobsByStatus: {
        active: jobs.filter(job => job.status === 'active').length,
        inactive: jobs.filter(job => job.status === 'inactive').length,
        closed: jobs.filter(job => job.status === 'closed').length
      },
      applicationsByMonth: getApplicationsByMonth(applications),
      topSkills: getTopSkills(applications),
      averageMatchScore: calculateAverageMatchScore(applications)
    };

    res.json({ analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get applications grouped by month
 */
const getApplicationsByMonth = (applications) => {
  const monthlyData = {};

  applications.forEach(app => {
    const month = app.appliedAt.toISOString().slice(0, 7); // YYYY-MM format
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  return monthlyData;
};

/**
 * Get top skills from candidate applications
 */
const getTopSkills = (applications) => {
  const skillCount = {};

  applications.forEach(app => {
    if (app.resumeId && app.resumeId.parsedData && app.resumeId.parsedData.skills) {
      app.resumeId.parsedData.skills.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    }
  });

  // Sort by frequency and return top 10
  return Object.entries(skillCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));
};

/**
 * Calculate average match score
 */
const calculateAverageMatchScore = (applications) => {
  const scores = applications
    .map(app => app.matchScore)
    .filter(score => score !== undefined && score !== null);

  if (scores.length === 0) return 0;

  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round((sum / scores.length) * 100) / 100;
};

/**
 * Get job-specific analytics
 */
const getJobAnalytics = async (req, res) => {
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

    // Get applications for this job
    const applications = await Application.find({ jobId })
      .populate('candidateId', 'name email')
      .populate('resumeId', 'parsedData matchScore');

    const analytics = {
      job: {
        id: job._id,
        title: job.title,
        company: job.company,
        status: job.status
      },
      totalApplications: applications.length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      pending: applications.filter(app => app.status === 'pending').length,
      hired: applications.filter(app => app.status === 'hired').length,
      averageMatchScore: calculateAverageMatchScore(applications),
      applicationsOverTime: getApplicationsOverTime(applications)
    };

    res.json({ analytics });
  } catch (error) {
    console.error('Error fetching job analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get applications over time (daily for last 30 days)
 */
const getApplicationsOverTime = (applications) => {
  const last30Days = {};
  const now = new Date();

  // Initialize last 30 days with 0
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    last30Days[dateStr] = 0;
  }

  // Count applications per day
  applications.forEach(app => {
    const dateStr = app.appliedAt.toISOString().slice(0, 10);
    if (last30Days.hasOwnProperty(dateStr)) {
      last30Days[dateStr]++;
    }
  });

  return Object.entries(last30Days).map(([date, count]) => ({ date, count }));
};

module.exports = {
  getAnalytics,
  getJobAnalytics
};
