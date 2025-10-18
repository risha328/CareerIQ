const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleCheck');
const {
  getRankedCandidatesForJob,
  shortlistCandidate,
  rejectCandidate,
  getApplications
} = require('../controllers/candidateController');

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidateRanking:
 *       type: object
 *       properties:
 *         candidateId:
 *           type: string
 *           description: ID of the candidate
 *         name:
 *           type: string
 *           description: Candidate name
 *         email:
 *           type: string
 *           description: Candidate email
 *         matchScore:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Match score percentage
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: Candidate skills
 *         status:
 *           type: string
 *           enum: [not_applied, pending, shortlisted, rejected, hired]
 *           description: Application status
 *         applicationId:
 *           type: string
 *           description: Application ID if exists
 *         appliedAt:
 *           type: string
 *           format: date-time
 *           description: When candidate applied
 *     Application:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Application ID
 *         jobId:
 *           type: string
 *           description: Job ID
 *         candidateId:
 *           type: string
 *           description: Candidate ID
 *         status:
 *           type: string
 *           enum: [pending, shortlisted, rejected, hired]
 *         matchScore:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         employerNotes:
 *           type: string
 *         appliedAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 * /employer/candidates/{jobId}:
 *   get:
 *     summary: Get ranked candidates for a specific job
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Ranked candidates for the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     company:
 *                       type: string
 *                 candidates:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CandidateRanking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get('/candidates/:jobId', authMiddleware, roleCheck('employer'), getRankedCandidatesForJob);

/**
 * @swagger
 * /employer/candidates/{id}/shortlist:
 *   post:
 *     summary: Shortlist a candidate for a job
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *             properties:
 *               jobId:
 *                 type: string
 *                 description: Job ID
 *               notes:
 *                 type: string
 *                 description: Employer notes
 *     responses:
 *       200:
 *         description: Candidate shortlisted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 application:
 *                   $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.post('/candidates/:id/shortlist', authMiddleware, roleCheck('employer'), shortlistCandidate);

/**
 * @swagger
 * /employer/candidates/{id}/reject:
 *   post:
 *     summary: Reject a candidate for a job
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *             properties:
 *               jobId:
 *                 type: string
 *                 description: Job ID
 *               notes:
 *                 type: string
 *                 description: Employer notes
 *     responses:
 *       200:
 *         description: Candidate rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 application:
 *                   $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.post('/candidates/:id/reject', authMiddleware, roleCheck('employer'), rejectCandidate);

/**
 * @swagger
 * /employer/applications:
 *   get:
 *     summary: Get all applications for employer's jobs
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/applications', authMiddleware, roleCheck('employer'), getApplications);

module.exports = router;
