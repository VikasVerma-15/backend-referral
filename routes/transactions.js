const express = require('express');
const router = express.Router();

const { createTransaction } = require('../controllers/transactionController');

// @route   POST /api/transactions
// @desc    Create transaction and distribute earnings
router.post('/', createTransaction);

module.exports = router;
