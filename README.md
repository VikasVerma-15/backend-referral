
A real-time multi-level referral system built with Node.js, Express, MongoDB, and React with Socket.IO for live updates.
## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Setup Instructions](#setup-instructions)
- [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)

## 🎯 Project Overview

This is a comprehensive multi-level referral system that allows users to:
- Register with optional referral codes
- Earn commissions from direct and indirect referrals
- View real-time earnings updates
- Track referral network performance
- Create transactions that trigger earnings distribution

### Key Components:
- **Backend**: Node.js + Express + MongoDB + Socket.IO
- **Frontend**: React + Tailwind CSS + Socket.IO Client
- **Real-time**: Live earnings updates and transaction notifications
- **Multi-level**: 2-level referral system with different commission rates

## ✨ Features

### Core Features
- ✅ User registration with referral codes
- ✅ Multi-level referral tracking (Level 1 & Level 2)
- ✅ Automatic earnings distribution
- ✅ Real-time updates via Socket.IO
- ✅ Transaction management
- ✅ Referral analytics and reporting

### Referral System
- **Direct Referrals (Level 1)**: 5% commission, max 8 referrals
- **Indirect Referrals (Level 2)**: 1% commission, unlimited
- **Minimum Transaction**: ₹1000 to trigger earnings
- **Real-time Notifications**: Live earnings updates

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React)       │    │   (Node.js)     │    │   (MongoDB)     │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Dashboard │ │    │ │   Express   │ │    │ │    Users    │ │
│ │             │ │    │ │   Server    │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │  Register   │ │◄──►│ │  User API   │ │◄──►│ │Transactions│ │
│ │   Login     │ │    │ │ Transaction │ │    │ │             │ │
│ └─────────────┘ │    │ │     API     │ │    │ └─────────────┘ │
│                 │    │ └─────────────┘ │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Socket.IO    │ │◄──►│ │ Socket.IO   │ │    │ │  Earnings   │ │
│ │  Client     │ │    │ │   Server    │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow Diagram

```
User Registration Flow:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───►│  Backend    │───►│  Database   │───►│ Referral    │
│ Registers   │    │ Validates   │    │ Creates     │    │ Code        │
│ with Code   │    │ Referral    │    │ User        │    │ Generated   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘

Transaction Flow:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───►│ Transaction │───►│ Calculate   │───►│ Distribute  │
│ Creates     │    │ Created     │    │ Earnings    │    │ Earnings    │
│ Transaction │    │             │    │             │    │ to Referrers│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                    ┌─────────────┐
                                                    │ Real-time   │
                                                    │ Updates     │
                                                    │ via Socket  │
                                                    └─────────────┘
```
## 🚀 Setup Instructions
### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd backend
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Environment Configuration
Create `.env` file in the root directory:

```env
# Database Configuration
MONGO_URI=""

# Server Configuration
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# JWT Secret (for future authentication)
JWT_SECRET=your_jwt_secret_here

### Step 4: Start the Application

#### Start Backend Server
```bash
# From the root directory
npm start
```

#### Start Frontend Development Server
```bash
# In a new terminal, from the frontend directory
cd frontend
npm start
```

### Step 5: Access the Application
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **API Health Check**: http://localhost:5000/

## 🔧 Environment Configuration

### Backend Environment Variables

Create `.env` file in the root directory:

```env
# MongoDB Connection
MONGO_URI=""

# Server Settings
PORT=5000
NODE_ENV=development

# CORS Settings
FRONTEND_URL=http://localhost:3000

# Security
JWT_SECRET=your_super_secret_jwt_key_here

# Optional: MongoDB Atlas (if using cloud)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/referral_system
```

### Frontend Environment Variables

Create `.env` file in the `frontend` directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Socket.IO Configuration
REACT_APP_SOCKET_URL=http://localhost:5000

# Environment
REACT_APP_ENV=development
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Currently using basic authentication. JWT implementation planned for future versions.

### API Endpoints

#### 1. Health Check
```http
GET /
```
**Response:**
```json
{
  "message": "🚀 Multi-Level Referral System Backend is Live!"
}
```

#### 2. User Registration
```http
POST /api/users/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "referredBy": "ABC123"  // Optional referral code
}
```

**Success Response (201):**
```json
{
  "message": "User registered",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "user@example.com",
    "name": "John Doe",
    "referralCode": "XYZ789",
    "referredBy": "ABC123",
    "firstLevelReferrals": [],
    "secondLevelReferrals": [],
    "totalEarnings": 0,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
```json
// Email already exists
{
  "message": "Email already exists"
}

// Invalid referral code
{
  "message": "Invalid referral code"
}

// Referrer limit reached
{
  "message": "Referrer has reached max 8 direct referrals"
}
```

#### 3. User Login
```http
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "user@example.com",
    "name": "John Doe",
    "referralCode": "XYZ789",
    "referredBy": "ABC123",
    "firstLevelReferrals": [...],
    "secondLevelReferrals": [...],
    "totalEarnings": 150.50
  }
}
```

#### 4. Create Transaction
```http
POST /api/transactions
```

**Request Body:**
```json
{
  "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "transactionValue": 1500,
  "itemId": "item123",
  "transactionId": "txn_123456789"
}
```

**Success Response (201):**
```json
{
  "message": "Transaction recorded and earnings distributed",
  "transaction": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "transactionId": "txn_123456789",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "transactionValue": 1500,
    "itemId": "item123",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "earningsDistributed": true
}
```

### Complete API Flow Example

#### Step 1: Register First User (Referrer)
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "referrer@example.com",
    "name": "Referrer User",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "User registered",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "referralCode": "ABC123XYZ"
  }
}
```

#### Step 2: Register Second User (Referred)
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "referred@example.com",
    "name": "Referred User",
    "password": "password123",
    "referredBy": "ABC123XYZ"
  }'
```

**Response:**
```json
{
  "message": "User registered",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "referralCode": "DEF456UVW"
  }
}
```

#### Step 3: Create Transaction
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "transactionValue": 1500,
    "itemId": "item123",
    "transactionId": "txn_123456789"
  }'
```

**Result:**
- Transaction created successfully
- ₹75 (5%) distributed to referrer (64f8a1b2c3d4e5f6a7b8c9d0)
- Real-time updates sent via Socket.IO

## 🔌 Real-Time Features

### Socket.IO Events

#### Client Events (Frontend → Backend)
```javascript
// Authenticate user
socket.emit('authenticate', userId);
```

#### Server Events (Backend → Frontend)
```javascript
// Transaction created
socket.on('transaction_created', (data) => {
  console.log('Transaction created:', data);
});

// Earnings update
socket.on('earnings_update', (data) => {
  console.log('Earnings update:', data);
});

// General notification
socket.on('transaction_notification', (data) => {
  console.log('Transaction notification:', data);
});
```

### Real-Time Updates Flow
1. **Transaction Created** → Emits to transaction creator
2. **Earnings Distributed** → Emits to referrers
3. **General Notification** → Emits to all connected users

## 🗄️ Database Schema

### User Schema
```javascript
{
  email: String (unique, required),
  name: String (required),
  password: String (required),
  referralCode: String (unique),
  referredBy: String (optional),
  firstLevelReferrals: [{
    userId: ObjectId,
    directEarning: Number,
    indirectEarning: Number
  }],
  secondLevelReferrals: [{
    userId: ObjectId,
    via_userId: ObjectId,
    Earning: Number
  }],
  totalEarnings: Number,
  createdAt: Date
}
```

### Transaction Schema
```javascript
{
  transactionId: String,
  userId: ObjectId (ref: User),
  transactionValue: Number,
  itemId: String,
  createdAt: Date
}
```

### Earning Schema
```javascript
{
  transactionId: ObjectId (ref: Transaction),
  userId: ObjectId (ref: User),
  transactionValue: Number,
  directReferralUserId: ObjectId (ref: User),
  directReferralEarning: Number,
  indirectReferralUserId: ObjectId (ref: User),
  indirectReferralEarning: Number,
  createdAt: Date
}
```

## 🎯 Referral System Logic

### Commission Structure
- **Direct Referral (Level 1)**: 5% of transaction value
- **Indirect Referral (Level 2)**: 1% of transaction value
- **Minimum Transaction**: ₹1000 to trigger earnings

### Referral Limits
- **Direct Referrals**: Maximum 8 per user
- **Indirect Referrals**: Unlimited

### Example Calculation
```
Transaction: ₹1500
├── Direct Referrer: ₹75 (5%)
└── Indirect Referrer: ₹15 (1%)
```
### Future Enhancements
- JWT Authentication
- Email verification
- Payment integration
- Advanced analytics
- Mobile app
- Admin dashboard
