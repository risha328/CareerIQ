const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleCheck');

// List all users (admin only)
router.get('/', authMiddleware, authorizeRoles('admin'), userController.getAllUsers);

// Delete user by ID (admin only)
router.delete('/:id', authMiddleware, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
