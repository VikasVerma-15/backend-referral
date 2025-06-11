const User = require('../models/Users');
const Earning = require('../models/Earning');
const generateReferralCode = require('../utils/generateReferralCode');

// Register User
exports.registerUser = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { email, name, referredBy, password } = req.body;

    console.log('Extracted data:', { email, name, referredBy, password });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    let referredByUser = null;

    if (referredBy) {
      console.log('Looking for referrer with code:', referredBy);
      referredByUser = await User.findOne({ referralCode: referredBy });

      if (!referredByUser) return res.status(400).json({ message: 'Invalid referral code' });

      if (referredByUser.firstLevelReferrals.length >= 8) {
        return res.status(400).json({ message: 'Referrer has reached max 8 direct referrals' });
      }
    }

    console.log('Generating referral code...');
    const newUser = new User({
      email,
      name,
      referralCode: generateReferralCode(),
      referredBy: referredBy || null,
      password: password, // Ensure to hash the password in production
      firstLevelReferrals: [],
      secondLevelReferrals: [],
      totalEarnings: 0,
      createdAt: new Date(),
    });

    console.log('Saving new user...');
    await newUser.save();
    console.log('User saved successfully:', newUser._id);

    // Update referrer's referral lists
    if (referredByUser) {
      console.log('Updating referrer...');
      referredByUser.firstLevelReferrals.push({
        userId: newUser._id,
        directEarning: 0,
        indirectEarning: 0,
      });

      await referredByUser.save();

      if (referredByUser.referredBy) {
        const secondLevelReferrer = await User.findOne({ referralCode: referredByUser.referredBy });
        if (secondLevelReferrer) {
          secondLevelReferrer.secondLevelReferrals.push({
            userId: newUser._id,
            via_userId: referredByUser._id,
            Earning: 0,
          });
          await secondLevelReferrer.save();
        }
      }
    }

    console.log('Registration completed successfully');
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User (Basic, no JWT yet)
exports.loginUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({ message: 'Login successful', user });
};
