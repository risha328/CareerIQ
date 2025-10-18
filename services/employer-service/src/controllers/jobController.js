const Job = require('../models/Job');

/**
 * Create a new job posting
 */
const createJob = async (req, res) => {
  try {
    const { title, company, description, requirements, location, salary, jobType } = req.body;

    const job = new Job({
      employerId: req.user.id,
      title,
      company,
      description,
      requirements,
      location,
      salary,
      jobType
    });

    await job.save();

    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all jobs posted by the authenticated employer
 */
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user.id })
      .populate('applications')
      .sort({ createdAt: -1 });

    res.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a specific job by ID
 */
const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      employerId: req.user.id
    }).populate('applications');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update a job posting
 */
const updateJob = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, employerId: req.user.id },
      updates,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a job posting
 */
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      employerId: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
};
