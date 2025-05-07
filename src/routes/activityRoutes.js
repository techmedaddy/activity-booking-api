const express = require('express');
const router = express.Router();

const { listActivities, createActivity } = require('../controllers/activityController');
const auth = require('../middleware/auth');

// @route   GET /api/activities
// @desc    Get list of all available activities (public)
// @access  Public
router.get('/', listActivities);

// @route   POST /api/activities
// @desc    Create a new activity
// @access  Private
router.post('/', auth, createActivity);

module.exports = router;
