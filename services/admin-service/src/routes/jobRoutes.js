const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleCheck');

// List all jobs (admin only)
router.get('/', authMiddleware, authorizeRoles('admin'), jobController.getAllJobs);

// Delete job by ID (admin only)
router.delete('/:id', authMiddleware, authorizeRoles('admin'), jobController.deleteJob);

module.exports = router;
