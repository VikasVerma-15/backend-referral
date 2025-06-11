import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (loginData) => api.post('/users/login', loginData),
};

// Transaction APIs
export const transactionAPI = {
  create: (transactionData) => api.post('/transactions', transactionData),
};

export default api; 