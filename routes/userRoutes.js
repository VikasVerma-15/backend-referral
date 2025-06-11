const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

// Add logging middleware
router.use((req, res, next) => {
  console.log(`User route accessed: ${req.method} ${req.path}`);
  next();
});

// @route   POST /api/users/register
// @desc    Register new user
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Login user
router.post('/login', loginUser);

module.exports = router;
