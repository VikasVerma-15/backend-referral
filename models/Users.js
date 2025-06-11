const mongoose = require('mongoose');
const Earning = require('./Earning');

const referralSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  directEarning: { type: Number, default: 0 },
  indirectEarning: { type: Number, default: 0 }
});
const referralSchema2 = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  via_userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Earning: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true },
  phoneNumber: { type: String },
  pancard: { type: String },
  adharcard: { type: String },
  aadhar: { type: String },
  bankAccount: { type: String },
  referredBy: { type: String, default: null },
  firstLevelReferrals: [referralSchema],
  secondLevelReferrals: [referralSchema2],
  totalEarnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
