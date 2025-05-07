const Activity = require('../models/Activity');

// @desc    List all available activities
// @route   GET /api/activities
// @access  Public
exports.listActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1 }); // Use 'date' if that's your field

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    console.error('List Activities Error:', err.message);
    res.status(500).json({ message: 'Server error while fetching activities' });
  }
};

// @desc    Create a new activity
// @route   POST /api/activities
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    const { title, description, location, date, slots } = req.body;

    if (!title || !description || !location || !date || !slots) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const activity = await Activity.create({
      title,
      description,
      location,
      date,
      slots,
      createdBy: req.user.id // Assuming JWT adds user.id
    });

    res.status(201).json({
      message: 'Activity created successfully',
      activity
    });
  } catch (error) {
    console.error('Create Activity Error:', error.message);
    res.status(500).json({ message: 'Server error while creating activity' });
  }
};
