const mongoose = require('mongoose');

// Define schema
const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true,
    minlength: 10,
    maxlength: 500
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  scheduledAt: {
    type: Date,
    required: [true, 'Date and time of activity is required'],
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: 'Scheduled date and time must be in the future'
    }
  }
}, {
  timestamps: true
});

// Export model
module.exports = mongoose.model('Activity', activitySchema);
