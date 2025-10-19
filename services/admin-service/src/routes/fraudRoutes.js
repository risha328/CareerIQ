const express = require('express');
const router = express.Router();
const fraudController = require('../controllers/fraudController');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleCheck');

// Get fraud reports (admin only)
router.get('/', authMiddleware, authorizeRoles('admin'), fraudController.getFraudReports);

module.exports = router;
