const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleCheck');
const {
  getAnalytics,
  getJobAnalytics
} = require('../controllers/analyticsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Analytics:
 *       type: object
 *       properties:
 *         totalJobs:
 *           type: integer
 *           description: Total number of jobs posted
 *         activeJobs:
 *           type: integer
 *           description: Number of active jobs
 *         totalApplications:
 *           type: integer
 *           description: Total applications received
 *         shortlistedCandidates:
 *           type: integer
 *           description: Number of shortlisted candidates
 *         rejectedCandidates:
 *           type: integer
 *           description: Number of rejected candidates
 *         pendingApplications:
 *           type: integer
 *           description: Number of pending applications
 *         hiredCandidates:
 *           type: integer
 *           description: Number of hired candidates
 *         jobsByStatus:
 *           type: object
 *           properties:
 *             active:
 *               type: integer
 *             inactive:
 *               type: integer
 *             closed:
 *               type: integer
 *         applicationsByMonth:
 *           type: object
 *           description: Applications grouped by month
 *         topSkills:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               skill:
 *                 type: string
 *               count:
 *                 type: integer
 *         averageMatchScore:
 *           type: number
 *           description: Average match score across all applications
 *     JobAnalytics:
 *       type: object
 *       properties:
 *         job:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             company:
 *               type: string
 *             status:
 *               type: string
 *         totalApplications:
 *           type: integer
 *         shortlisted:
 *           type: integer
 *         rejected:
 *           type: integer
 *         pending:
 *           type: integer
 *         hired:
 *           type: integer
 *         averageMatchScore:
 *           type: number
 *         applicationsOverTime:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               count:
 *                 type: integer
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
 * /employer/analytics:
 *   get:
 *     summary: Get overall analytics for employer's jobs and candidates
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 analytics:
 *                   $ref: '#/components/schemas/Analytics'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/analytics', authMiddleware, roleCheck('employer'), getAnalytics);

/**
 * @swagger
 * /employer/analytics/jobs/{jobId}:
 *   get:
 *     summary: Get analytics for a specific job
 *     tags: [Analytics]
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
 *         description: Job-specific analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 analytics:
 *                   $ref: '#/components/schemas/JobAnalytics'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get('/analytics/jobs/:jobId', authMiddleware, roleCheck('employer'), getJobAnalytics);

module.exports = router;
