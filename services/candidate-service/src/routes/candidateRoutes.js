const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const {
  uploadResume,
  getMatches,
  getSkills,
  getDashboard,
  getNotifications
} = require('../controllers/candidateController');

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // Accept only PDF, DOC, DOCX files
    if (file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Unexpected field name. Use "resume" as the field name.' });
    }
  }
  if (error.message === 'Only PDF, DOC, and DOCX files are allowed') {
    return res.status(400).json({ message: error.message });
  }
  if (error.code === 'MISSING_FIELD_NAME') {
    return res.status(400).json({ message: 'Field name missing. Use "resume" as the field name.' });
  }
  next(error);
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Resume:
 *       type: object
 *       required:
 *         - fileName
 *         - cloudinaryUrl
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the resume
 *         candidateId:
 *           type: string
 *           description: ID of the candidate who uploaded the resume
 *         fileName:
 *           type: string
 *           description: Original filename of the uploaded resume
 *         cloudinaryUrl:
 *           type: string
 *           description: Cloudinary URL where the resume is stored
 *         parsedData:
 *           type: object
 *           properties:
 *             skills:
 *               type: array
 *               items:
 *                 type: string
 *             experience:
 *               type: array
 *               items:
 *                 type: object
 *             education:
 *               type: array
 *               items:
 *                 type: object
 *         aiAnalysis:
 *           type: object
 *           description: AI analysis results from parsing
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the resume was uploaded
 *     JobMatch:
 *       type: object
 *       properties:
 *         jobId:
 *           type: string
 *         jobTitle:
 *           type: string
 *         company:
 *           type: string
 *         matchScore:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         skillsMatch:
 *           type: array
 *           items:
 *             type: string
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /candidate/upload-resume:
 *   post:
 *     summary: Upload a candidate's resume
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file to upload (PDF, DOC, DOCX)
 *     responses:
 *       200:
 *         description: Resume uploaded and parsed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 resume:
 *                   $ref: '#/components/schemas/Resume'
 *       400:
 *         description: Bad request - invalid file or missing data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/upload-resume', authMiddleware, upload.single('resume'), handleMulterError, uploadResume);

/**
 * @swagger
 * /candidate/matches:
 *   get:
 *     summary: Get job matches for the authenticated candidate
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of job matches with scores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matches:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobMatch'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/matches', authMiddleware, getMatches);

/**
 * @swagger
 * /candidate/skills:
 *   get:
 *     summary: Get extracted skills from candidate's resume
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of extracted skills
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No resume found for this candidate
 *       500:
 *         description: Server error
 */
router.get('/skills', authMiddleware, getSkills);

/**
 * @swagger
 * /candidate/dashboard:
 *   get:
 *     summary: Get candidate dashboard with analytics and skill gaps
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data with analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profileCompletion:
 *                   type: number
 *                   minimum: 0
 *                   maximum: 100
 *                 skillGaps:
 *                   type: array
 *                   items:
 *                     type: string
 *                 recentMatches:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobMatch'
 *                 analytics:
 *                   type: object
 *                   properties:
 *                     totalApplications:
 *                       type: integer
 *                     matchRate:
 *                       type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/dashboard', authMiddleware, getDashboard);

/**
 * @swagger
 * /candidate/notifications:
 *   get:
 *     summary: Get candidate notifications
 *     tags: [Candidate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [job_match, application_update, profile_reminder]
 *                       message:
 *                         type: string
 *                       read:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/notifications', authMiddleware, getNotifications);

module.exports = router;
