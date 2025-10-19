const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleCheck');

// List all resumes (admin only)
router.get('/', authMiddleware, authorizeRoles('admin'), resumeController.getAllResumes);

// Delete resume by ID (admin only)
router.delete('/:id', authMiddleware, authorizeRoles('admin'), resumeController.deleteResume);

module.exports = router;
