const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const parseResumeWithAI = async (resumeUrl) => {
  let tempFilePath = null;

  try {
    console.log('Downloading resume from Cloudinary:', resumeUrl);

    // Download the file from Cloudinary URL and save to temp file
    const fileResponse = await axios.get(resumeUrl, {
      responseType: 'arraybuffer',
      timeout: 30000 // 30 second timeout
    });

    console.log('File downloaded successfully, size:', fileResponse.data.length);

    // Create temp file
    const tempDir = require('os').tmpdir();
    const urlParts = resumeUrl.split('/');
    const originalFilename = urlParts[urlParts.length - 1] || 'resume.pdf';
    const filename = originalFilename.includes('.') ? originalFilename : 'resume.pdf';
    tempFilePath = path.join(tempDir, `temp_${Date.now()}_${filename}`);

    fs.writeFileSync(tempFilePath, fileResponse.data);
    console.log('Temp file created:', tempFilePath);

    // Create form data for AI service
    const form = new FormData();

    // Read file as stream for form data
    const fileStream = fs.createReadStream(tempFilePath);

    form.append('file', fileStream, {
      filename: filename,
      contentType: filename.endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    console.log('Sending to AI service:', `${process.env.AI_SERVICE_URL}/parse-resume`);

    const response = await axios.post(`${process.env.AI_SERVICE_URL}/parse-resume`, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 60000 // 60 second timeout for AI processing
    });

    console.log('AI service response received');
    return response.data;
  } catch (error) {
    console.error('AI service error details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    throw new Error(`Failed to parse resume with AI service: ${error.response?.data?.error || error.message}`);
  } finally {
    // Clean up temp file
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
        console.log('Temp file cleaned up');
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError);
      }
    }
  }
};

const getJobMatches = async (skills, experience) => {
  try {
    const response = await axios.post(`${process.env.AI_SERVICE_URL}/job-matches`, {
      skills: skills,
      experience: experience
    });
    return response.data;
  } catch (error) {
    console.error('AI service job matches error:', error);
    throw new Error('Failed to get job matches from AI service');
  }
};

module.exports = {
  parseResumeWithAI,
  getJobMatches
};
