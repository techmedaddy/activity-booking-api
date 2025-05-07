const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validations/validators');

// ---------------------------------------------------------------------------
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// ---------------------------------------------------------------------------
router.post('/register', registerValidation, registerUser);

// ---------------------------------------------------------------------------
// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
// ---------------------------------------------------------------------------
router.post('/login', loginValidation, loginUser);

module.exports = router;
