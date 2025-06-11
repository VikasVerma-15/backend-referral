import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  UserCheck,
  UserPlus,
  Eye,
  EyeOff
} from 'lucide-react';

const ReferralReport = () => {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);

  // Show loading if user data is not available
  if (!user) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading referral data...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const directReferrals = user.firstLevelReferrals || [];
  const indirectReferrals = user.secondLevelReferrals || [];
  
  const totalDirectEarnings = directReferrals.reduce((sum, ref) => sum + (ref.directEarning || 0), 0);
  const totalIndirectEarnings = indirectReferrals.reduce((sum, ref) => sum + (ref.Earning || 0), 0);
  
  const activeDirectReferrals = directReferrals.filter(ref => (ref.directEarning || 0) > 0).length;
  const activeIndirectReferrals = indirectReferrals.filter(ref => (ref.Earning || 0) > 0).length;

  // Chart data for earnings comparison
  const earningsData = [
    { name: 'Direct Earnings', value: totalDirectEarnings, color: '#3b82f6' },
    { name: 'Indirect Earnings', value: totalIndirectEarnings, color: '#f59e0b' },
  ];

  // Chart data for referral levels
  const referralLevelData = [
    { name: 'Direct Referrals', count: directReferrals.length, max: 8, color: '#22c55e' },
    { name: 'Indirect Referrals', count: indirectReferrals.length, max: 64, color: '#f59e0b' },
  ];

  // Detailed referral data for table
  const getReferralDetails = () => {
    const details = [];
    
    // Direct referrals
    directReferrals.forEach((ref, index) => {
      details.push({
        id: index + 1,
        name: `Direct Referral ${index + 1}`,
        type: 'Direct',
        userId: ref.userId,
        directEarning: ref.directEarning || 0,
        indirectEarning: ref.indirectEarning || 0,
        totalEarning: (ref.directEarning || 0) + (ref.indirectEarning || 0),
        status: (ref.directEarning || 0) > 0 ? 'Active' : 'Inactive'
      });
    });

    // Indirect referrals
    indirectReferrals.forEach((ref, index) => {
      details.push({
        id: directReferrals.length + index + 1,
        name: `Indirect Referral ${index + 1}`,
        type: 'Indirect',
        userId: ref.userId,
        viaUserId: ref.via_userId,
        directEarning: 0,
        indirectEarning: ref.Earning || 0,
        totalEarning: ref.Earning || 0,
        status: (ref.Earning || 0) > 0 ? 'Active' : 'Inactive'
      });
    });

    return details;
  };

  const referralDetails = getReferralDetails();

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Referral Report</h2>
          <p className="text-gray-600">Comprehensive analysis of your referral network</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="btn-secondary flex items-center"
        >
          {showDetails ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{directReferrals.length + indirectReferrals.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{activeDirectReferrals + activeIndirectReferrals}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Direct Earnings</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalDirectEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Indirect Earnings</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalIndirectEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Distribution Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Earnings Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={earningsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${value.toFixed(2)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {earningsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Referral Levels Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Referral Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={referralLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Current Referrals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Referrals Table */}
      {showDetails && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Detailed Referral List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referral
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Direct Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Indirect Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralDetails.map((referral) => (
                  <tr key={referral.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                      <div className="text-sm text-gray-500">ID: {referral.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        referral.type === 'Direct' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{referral.directEarning.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{referral.indirectEarning.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{referral.totalEarning.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        referral.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {referralDetails.length === 0 && (
            <div className="text-center py-8">
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No referrals yet. Share your referral code to start earning!</p>
            </div>
          )}
        </div>
      )}

      {/* Referral Program Info */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold mb-4">How the Referral Program Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Direct Referrals (Level 1)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Earn 5% of each transaction made by your direct referrals</li>
              <li>• Maximum 8 direct referrals allowed</li>
              <li>• Minimum transaction value: ₹1000</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Indirect Referrals (Level 2)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Earn 1% of transactions made by your referrals' referrals</li>
              <li>• Unlimited indirect referrals</li>
              <li>• Passive income from your network</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralReport; 