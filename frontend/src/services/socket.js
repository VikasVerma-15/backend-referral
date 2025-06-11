import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    this.socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 Socket.IO connection error:', error);
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  authenticate(userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('authenticate', userId);
    }
  }

  onTransactionCreated(callback) {
    if (this.socket) {
      this.socket.on('transaction_created', callback);
    }
  }

  onEarningsUpdate(callback) {
    if (this.socket) {
      this.socket.on('earnings_update', callback);
    }
  }

  onTransactionNotification(callback) {
    if (this.socket) {
      this.socket.on('transaction_notification', callback);
    }
  }

  offTransactionCreated() {
    if (this.socket) {
      this.socket.off('transaction_created');
    }
  }

  offEarningsUpdate() {
    if (this.socket) {
      this.socket.off('earnings_update');
    }
  }

  offTransactionNotification() {
    if (this.socket) {
      this.socket.off('transaction_notification');
    }
  }

  getSocket() {
    return this.socket;
  }

  isSocketConnected() {
    return this.isConnected;
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService; 