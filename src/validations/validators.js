const { body } = require('express-validator');

// User Registration Validation
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  body('email')
    .normalizeEmail()
    .isEmail().withMessage('A valid email is required'),

  body('phone')
    .isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits')
    .matches(/^\d+$/).withMessage('Phone number must contain digits only'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// User Login Validation
exports.loginValidation = [
  body('email')
    .normalizeEmail()
    .isEmail().withMessage('A valid email is required'),

  body('password')
    .notEmpty().withMessage('Password is required')
];

// Booking Validation
exports.bookingValidation = [
  body('activityId')
    .notEmpty().withMessage('Activity ID is required')
    .isMongoId().withMessage('Activity ID must be a valid MongoDB ObjectId')
];
