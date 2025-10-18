const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:6999';

/**
 * Get ranked candidates for a job based on skills matching
 * @param {Array} jobSkills - Required skills for the job
 * @returns {Promise<Array>} - Ranked candidates with match scores
 */
const getRankedCandidates = async (jobSkills) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/job-matches`, {
      skills: jobSkills
    });

    return response.data.matches || [];
  } catch (error) {
    console.error('Error calling AI service for job matches:', error.message);
    throw new Error('Failed to get candidate rankings from AI service');
  }
};

/**
 * Parse resume using AI service
 * @param {Buffer} fileBuffer - Resume file buffer
 * @param {string} filename - Original filename
 * @returns {Promise<Object>} - Parsed resume data
 */
const parseResume = async (fileBuffer, filename) => {
  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, filename);

    const response = await axios.post(`${AI_SERVICE_URL}/parse-resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error calling AI service for resume parsing:', error.message);
    throw new Error('Failed to parse resume');
  }
};

module.exports = {
  getRankedCandidates,
  parseResume
};
