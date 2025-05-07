const express = require('express');
const router = express.Router();

const { bookActivity, getMyBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const { bookingValidation } = require('../validations/validators');

// ---------------------------------------------------------------------------
// @route   POST /api/bookings
// @desc    Book an activity by activityId
// @access  Protected
// ---------------------------------------------------------------------------
router.post('/', authMiddleware, bookingValidation, bookActivity);

// ---------------------------------------------------------------------------
// @route   GET /api/bookings
// @desc    Get all bookings for the logged-in user
// @access  Protected
// ---------------------------------------------------------------------------
router.get('/', authMiddleware, getMyBookings);

module.exports = router;
