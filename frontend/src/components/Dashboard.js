import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from './RealTimeNotifications';
import { transactionAPI } from '../services/api';
import socketService from '../services/socket';
import { 
  User, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus, 
  Copy, 
  CheckCircle,
  AlertCircle,
  Gift
} from 'lucide-react';
import ReferralReport from './ReferralReport';

const Dashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionData, setTransactionData] = useState({
    transactionValue: '',
    itemId: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [copied, setCopied] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (user && user._id) {
      console.log('Initializing Socket.IO connection for user:', user._id);
      
      // Connect to Socket.IO
      const socket = socketService.connect();
      
      // Authenticate user
      socketService.authenticate(user._id);
      console.log('User authenticated with Socket.IO');
      
      // Listen for connection status
      socket.on('connect', () => {
        setSocketConnected(true);
        console.log('Socket connected in Dashboard');
      });
      
      socket.on('disconnect', () => {
        setSocketConnected(false);
        console.log('Socket disconnected in Dashboard');
      });

      // Listen for real-time updates
      socketService.onTransactionCreated((data) => {
        console.log('Transaction created notification received:', data);
        addNotification(data);
      });

      socketService.onEarningsUpdate((data) => {
        console.log('Earnings update notification received:', data);
        addNotification(data);
      });

      socketService.onTransactionNotification((data) => {
        console.log('Transaction notification received:', data);
        addNotification(data);
      });

      // Cleanup on unmount
      return () => {
        console.log('Cleaning up Socket.IO listeners');
        socketService.offTransactionCreated();
        socketService.offEarningsUpdate();
        socketService.offTransactionNotification();
      };
    }
  }, [user, addNotification]);

  // Debug: Log user data
  useEffect(() => {
    console.log('User data in Dashboard:', user);
    console.log('Referral code:', user?.referralCode);
  }, [user]);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    console.log('Submitting transaction:', {
      userId: user._id,
      transactionValue: transactionData.transactionValue,
      itemId: transactionData.itemId
    });

    try {
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('Generated transaction ID:', transactionId);
      
      const response = await transactionAPI.create({
        userId: user._id,
        transactionId,
        transactionValue: parseFloat(transactionData.transactionValue),
        itemId: transactionData.itemId,
      });

      console.log('Transaction API response:', response.data);
      setMessage({ type: 'success', text: response.data.message });
      setTransactionData({ transactionValue: '', itemId: '' });
      setShowTransactionForm(false);
    } catch (err) {
      console.error('Transaction API error:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Transaction failed' });
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalDirectReferrals = user.firstLevelReferrals?.length || 0;
  const totalIndirectReferrals = user.secondLevelReferrals?.length || 0;
  const totalDirectEarnings = user.firstLevelReferrals?.reduce((sum, ref) => sum + (ref.directEarning || 0), 0) || 0;
  const totalIndirectEarnings = user.secondLevelReferrals?.reduce((sum, ref) => sum + (ref.Earning || 0), 0) || 0;

  // Show loading if user data is not available
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
          </div>
        </div>

        {/* Debug Info - Remove this after testing */}
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Debug Info:</strong> User ID: {user._id}, Referral Code: {user.referralCode || 'NOT FOUND'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₹{user.totalEarnings?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <Users className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Direct Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{totalDirectReferrals}/8</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Indirect Referrals</p>
                <p className="text-2xl font-bold text-gray-900">{totalIndirectReferrals}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Your Referral Code</p>
                <div className="flex items-center mt-1">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {user.referralCode || 'Loading...'}
                  </code>
                  <button
                    onClick={copyReferralCode}
                    disabled={!user.referralCode}
                    className="ml-2 p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                  >
                    {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
              {message.text}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-8">
          <button
            onClick={() => setShowTransactionForm(!showTransactionForm)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            {showTransactionForm ? 'Cancel Transaction' : 'Create Transaction'}
          </button>
        </div>

        {/* Transaction Form */}
        {showTransactionForm && (
          <div className="card mb-8">
            <h3 className="text-lg font-semibold mb-4">Create New Transaction</h3>
            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              <div>
                <label htmlFor="transactionValue" className="block text-sm font-medium text-gray-700">
                  Transaction Value (₹)
                </label>
                <input
                  type="number"
                  id="transactionValue"
                  name="transactionValue"
                  required
                  min="1000"
                  className="input-field mt-1"
                  placeholder="Enter amount (minimum ₹1000)"
                  value={transactionData.transactionValue}
                  onChange={(e) => setTransactionData({...transactionData, transactionValue: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Minimum transaction value: ₹1000</p>
              </div>

              <div>
                <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                  Item ID
                </label>
                <input
                  type="text"
                  id="itemId"
                  name="itemId"
                  required
                  className="input-field mt-1"
                  placeholder="Enter item ID"
                  value={transactionData.itemId}
                  onChange={(e) => setTransactionData({...transactionData, itemId: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Processing...' : 'Create Transaction'}
              </button>
            </form>
          </div>
        )}

        {/* Referral Report */}
        <ReferralReport />
      </div>
    </div>
  );
};

export default Dashboard; 