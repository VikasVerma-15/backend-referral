# Multi-Level Referral System Frontend

A modern React frontend for the multi-level referral system with comprehensive reporting and analytics.

## Features

### 🔐 Authentication
- User registration with referral code support
- User login/logout functionality
- Protected routes with authentication context

### 📊 Dashboard
- Real-time user statistics
- Total earnings display
- Direct and indirect referral counts
- Referral code management with copy functionality
- Transaction creation interface

### 📈 Referral Report
- **First Level Referrals**: Direct referrals (max 8) with 5% earnings
- **Second Level Referrals**: Indirect referrals with 1% earnings
- Interactive charts and analytics
- Detailed referral table with earnings breakdown
- Active/Inactive referral status tracking

### 💰 Transaction System
- Create transactions with minimum ₹1000 value
- Automatic earnings distribution to referrers
- Real-time feedback and error handling

## Tech Stack

- **React 18** with Hooks and Context API
- **Tailwind CSS** for modern, responsive design
- **Recharts** for data visualization
- **Axios** for API communication
- **React Router** for navigation
- **Lucide React** for icons

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Backend server running on port 5000

### Installation

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Integration

The frontend uses the following backend APIs:

### User APIs
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication

### Transaction APIs
- `POST /api/transactions` - Create transaction and distribute earnings

## Referral System Rules

### Direct Referrals (Level 1)
- Maximum 8 direct referrals per user
- Earn 5% of each transaction made by direct referrals
- Minimum transaction value: ₹1000

### Indirect Referrals (Level 2)
- Unlimited indirect referrals
- Earn 1% of transactions made by referrals' referrals
- Passive income from network expansion

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   └── ReferralReport.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Usage Guide

### 1. Registration
- Navigate to `/register`
- Fill in your details
- Optionally enter a referral code to join someone's network
- Submit to create your account

### 2. Login
- Navigate to `/login`
- Enter your email and password
- Access your dashboard

### 3. Dashboard
- View your referral statistics
- Copy your referral code to share with others
- Create transactions to test the system
- Monitor your earnings

### 4. Referral Report
- View comprehensive analytics
- See detailed breakdown of direct and indirect referrals
- Analyze earnings distribution with charts
- Toggle detailed view for referral list

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure backend server is running on port 5000
   - Check CORS configuration in backend

2. **Chart Display Issues**
   - Ensure all dependencies are installed
   - Check browser console for errors

3. **Authentication Issues**
   - Clear browser localStorage
   - Check API response format

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Multi-Level Referral System. 