const User = require('../models/Users');
const Transaction = require('../models/Transaction');
const Earning = require('../models/Earning');

// Create Transaction & Distribute Earnings
exports.createTransaction = async (req, res) => {
  try {
    const { userId, transactionValue, itemId ,transactionId} = req.body;
    
    if (transactionValue < 1000) {
      return res.status(200).json({ message: 'Transaction below threshold. No earnings distributed.' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const transaction = new Transaction({
      transactionId,
      userId,
      transactionValue,
      itemId,
    });

    await transaction.save();

    // Distribute Earnings
    let directReferrer = null;
    let indirectReferrer = null;
    let earningsUpdates = [];

    console.log('Checking referral relationships for user:', userId);
    console.log('User referredBy:', user.referredBy);

    if (user.referredBy) {
      directReferrer = await User.findOne({ referralCode: user.referredBy });
      console.log('Direct referrer found:', directReferrer ? directReferrer._id : 'None');
      
      if (directReferrer) {
        const directEarning = transactionValue * 0.05;
        console.log('Direct earning calculated:', directEarning);

        const referral = directReferrer.firstLevelReferrals.find(r => r.userId.toString() === user._id.toString());
        if (referral) {
          referral.directEarning += directEarning;
        }

        directReferrer.totalEarnings += directEarning;
        await directReferrer.save();

        // Add to earnings updates for real-time notification
        earningsUpdates.push({
          userId: directReferrer._id,
          type: 'direct',
          amount: directEarning,
          fromUser: user.name,
          transactionValue: transactionValue
        });
        console.log('Added direct earnings update for user:', directReferrer._id);
      }

      if (directReferrer?.referredBy) {
        indirectReferrer = await User.findOne({ referralCode: directReferrer.referredBy });
        console.log('Indirect referrer found:', indirectReferrer ? indirectReferrer._id : 'None');
        
        if (indirectReferrer) {
          const indirectEarning = transactionValue * 0.01;
          console.log('Indirect earning calculated:', indirectEarning);

          const secondReferral = indirectReferrer.secondLevelReferrals.find(r => r.userId.toString() === user._id.toString());
          const referral = indirectReferrer.firstLevelReferrals.find(r => r.userId.toString() === directReferrer._id.toString());
          if (secondReferral) {
            secondReferral.Earning += indirectEarning;
            referral.indirectEarning += indirectEarning;
          }

          indirectReferrer.totalEarnings += indirectEarning;
          await indirectReferrer.save();

          // Add to earnings updates for real-time notification
          earningsUpdates.push({
            userId: indirectReferrer._id,
            type: 'indirect',
            amount: indirectEarning,
            fromUser: user.name,
            transactionValue: transactionValue
          });
          console.log('Added indirect earnings update for user:', indirectReferrer._id);
        }
      }
    } else {
      console.log('No referral relationship found for user:', userId);
    }

    console.log('Total earnings updates to emit:', earningsUpdates.length);

    // Store earning log
    const earningLog = new Earning({
      transactionId: transaction._id,
      userId: userId,
      transactionValue,
      directReferralUserId: directReferrer?._id || null,
      directReferralEarning: directReferrer ? transactionValue * 0.05 : 0,
      indirectReferralUserId: indirectReferrer?._id || null,
      indirectReferralEarning: indirectReferrer ? transactionValue * 0.01 : 0,
    });

    await earningLog.save();

    // Emit real-time updates via Socket.IO
    if (global.io) {
      console.log('Emitting Socket.IO events for transaction:', transactionId);
      
      // Emit transaction created event to the user who made the transaction
      global.io.to(`user_${userId}`).emit('transaction_created', {
        type: 'success',
        message: 'Transaction created successfully!',
        transaction: {
          id: transaction._id,
          transactionId: transaction.transactionId,
          value: transactionValue,
          itemId: itemId,
          createdAt: transaction.createdAt
        }
      });
      console.log('Emitted transaction_created event to user:', userId);

      // Emit earnings updates to referrers
      earningsUpdates.forEach(update => {
        console.log('Emitting earnings_update to user:', update.userId);
        global.io.to(`user_${update.userId}`).emit('earnings_update', {
          type: 'earnings',
          message: `You earned ₹${update.amount.toFixed(2)} from ${update.fromUser}'s transaction of ₹${update.transactionValue}`,
          earnings: {
            type: update.type,
            amount: update.amount,
            fromUser: update.fromUser,
            transactionValue: update.transactionValue,
            timestamp: new Date()
          }
        });
      });

      // Emit general transaction notification to all connected users
      global.io.emit('transaction_notification', {
        type: 'info',
        message: `New transaction of ₹${transactionValue} processed`,
        transaction: {
          value: transactionValue,
          timestamp: new Date()
        }
      });
      console.log('Emitted transaction_notification to all users');
    } else {
      console.log('Socket.IO not available (global.io is null)');
    }

    res.status(201).json({ 
      message: 'Transaction recorded and earnings distributed',
      transaction: transaction,
      earningsDistributed: earningsUpdates.length > 0
    });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ message: 'Error processing transaction', error: error.message });
  }
};
