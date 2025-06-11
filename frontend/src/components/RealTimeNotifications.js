import React, { useState, useEffect, createContext, useContext } from 'react';
import { X, DollarSign, CheckCircle, Info, AlertCircle } from 'lucide-react';

// Create context for notifications
const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    console.log('🔔 Adding notification:', notification);
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date()
    };

    console.log('🔔 New notification object:', newNotification);
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only last 5 notifications
    console.log('🔔 Notifications updated, current count:', notifications.length + 1);

    // Auto-remove notification after 8 seconds
    setTimeout(() => {
      console.log('🔔 Auto-removing notification:', id);
      removeNotification(id);
    }, 8000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const value = {
    notifications,
    addNotification,
    removeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <RealTimeNotificationsDisplay />
    </NotificationContext.Provider>
  );
};

const RealTimeNotificationsDisplay = () => {
  const { notifications, removeNotification } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'earnings':
        return <DollarSign className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'earnings':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'earnings':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBgColor(notification.type)} border rounded-lg p-4 shadow-lg transform transition-all duration-300 ease-in-out animate-slide-in-right`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1">
                <p className={`text-sm font-medium ${getTextColor(notification.type)}`}>
                  {notification.message}
                </p>
                {notification.transaction && (
                  <p className="text-xs text-gray-600 mt-1">
                    Transaction: ₹{notification.transaction.value}
                  </p>
                )}
                {notification.earnings && (
                  <div className="text-xs text-gray-600 mt-1">
                    <p>Type: {notification.earnings.type} referral</p>
                    <p>Amount: ₹{notification.earnings.amount.toFixed(2)}</p>
                    <p>From: {notification.earnings.fromUser}</p>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Legacy component for backward compatibility
const RealTimeNotifications = () => {
  return null; // This is now handled by NotificationProvider
};

export default RealTimeNotifications; 