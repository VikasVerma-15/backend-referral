const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  transactionValue: { type: Number },
  directReferralUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  directReferralEarning: { type: Number, default: 0 },
  indirectReferralUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  indirectReferralEarning: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Earning', earningSchema);
