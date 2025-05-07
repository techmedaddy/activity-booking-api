const mongoose = require('mongoose');

// Define schema
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: [true, 'Booking must be linked to an activity']
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent duplicate bookings by same user for the same activity
bookingSchema.index({ user: 1, activity: 1 }, { unique: true });

// Export model
module.exports = mongoose.model('Booking', bookingSchema);
