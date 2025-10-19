const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleCheck');

// Get platform-wide analytics (admin only)
router.get('/', authMiddleware, authorizeRoles('admin'), analyticsController.getAnalytics);

module.exports = router;
