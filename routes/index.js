const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactions');

router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
