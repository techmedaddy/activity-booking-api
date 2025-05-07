const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const { validationResult } = require('express-validator');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Protected
exports.bookActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { activityId } = req.body;

  try {
    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if user already booked this activity
    const existingBooking = await Booking.findOne({
      user: req.user.userId,
      activity: activityId
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this activity' });
    }

    // Create new booking
    const booking = new Booking({
      user: req.user.userId,
      activity: activityId
    });

    await booking.save();

    res.status(201).json({
      message: 'Activity booked successfully',
      booking
    });
  } catch (err) {
    console.error('Book Activity Error:', err.message);
    res.status(500).json({ message: 'Server error during booking' });
  }
};

// @desc    Get all bookings of the logged-in user
// @route   GET /api/bookings
// @access  Protected
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('activity')
      .sort({ bookedAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    console.error('Get Bookings Error:', err.message);
    res.status(500).json({ message: 'Server error while retrieving bookings' });
  }
};
