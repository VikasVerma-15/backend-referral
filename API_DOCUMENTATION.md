# Multi-Level Referral System API Documentation

## Base URL
```
http://localhost:5000
```

## API Endpoints

### 1. Health Check
**GET** `/`

Check if the server is running.

**Response:**
```json
{
  "message": "🚀 Multi-Level Referral System Backend is Live!"
}
```

---

### 2. User Registration
**POST** `/api/users/register`

Register a new user with optional referral code.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "referredBy": "ABC123"  // Optional referral code
}
```

**Response (Success - 201):**
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

**Response (Error - 400):**
```json
{
  "message": "Email already exists"
}
```

**Response (Error - 400):**
```json
{
  "message": "Invalid referral code"
}
```

**Response (Error - 400):**
```json
{
  "message": "Referrer has reached max 8 direct referrals"
}
```

---

### 3. User Login
**POST** `/api/users/login`

Login user (basic authentication without JWT).

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success - 200):**
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

**Response (Error - 404):**
```json
{
  "message": "User not found"
}
```

---

### 4. Create Transaction
**POST** `/api/transactions`

Create a transaction and distribute earnings to referrers.

**Request Body:**
```json
{
  "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "transactionValue": 1500,
  "itemId": "item123",
  "transactionId": "txn_123456789"
}
```

**Response (Success - 201):**
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

**Response (Below Threshold - 200):**
```json
{
  "message": "Transaction below threshold. No earnings distributed."
}
```

**Response (Error - 404):**
```json
{
  "message": "User not found"
}
```

---

## Testing in Postman

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Select the `postman_collection.json` file
4. The collection will be imported with all endpoints

### 2. Set Environment Variables
1. Create a new environment in Postman
2. Add variable: `baseUrl` = `http://localhost:5000`
3. Select this environment before testing

### 3. Testing Sequence

#### Step 1: Health Check
- Run the "Health Check" request
- Should return server status message

#### Step 2: Register Users
1. **Register First User (Referrer):**
   ```json
   {
     "email": "referrer@example.com",
     "name": "Referrer User",
     "password": "password123"
   }
   ```
   - Note the `referralCode` from response

2. **Register Second User (Referred):**
   ```json
   {
     "email": "referred@example.com",
     "name": "Referred User",
     "password": "password123",
     "referredBy": "ABC123"  // Use referral code from step 1
   }
   ```

3. **Register Third User (Second Level):**
   ```json
   {
     "email": "secondlevel@example.com",
     "name": "Second Level User",
     "password": "password123",
     "referredBy": "XYZ789"  // Use referral code from step 2
   }
   ```

#### Step 3: Create Transactions
1. **Transaction Above Threshold:**
   ```json
   {
     "userId": "64f8a1b2c3d4e5f6a7b8c9d0",  // Use actual user ID
     "transactionValue": 1500,
     "itemId": "item123",
     "transactionId": "txn_123456789"
   }
   ```

2. **Transaction Below Threshold:**
   ```json
   {
     "userId": "64f8a1b2c3d4e5f6a7b8c9d0",  // Use actual user ID
     "transactionValue": 500,
     "itemId": "item456",
     "transactionId": "txn_987654321"
   }
   ```

### 4. Real-Time Testing
To test real-time features:

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open frontend in browser:**
   ```
   http://localhost:3000
   ```

3. **Create transactions via Postman** while the frontend is open
4. **Watch real-time updates** in the frontend dashboard

---

## Earnings Distribution Logic

### Direct Referral (Level 1)
- **Commission:** 5% of transaction value
- **Example:** ₹1500 transaction = ₹75 earnings

### Indirect Referral (Level 2)
- **Commission:** 1% of transaction value
- **Example:** ₹1500 transaction = ₹15 earnings

### Threshold
- **Minimum transaction:** ₹1000
- **Below threshold:** No earnings distributed

---

## Error Handling

### Common Error Codes
- **400:** Bad Request (validation errors)
- **404:** Not Found (user not found)
- **500:** Internal Server Error

### Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error message (if available)"
}
```

---

## Socket.IO Events

The API also emits real-time events via Socket.IO:

### Events Emitted
1. **`transaction_created`** - When a transaction is created
2. **`earnings_update`** - When earnings are distributed
3. **`transaction_notification`** - General transaction notifications

### Socket Connection
- **URL:** `http://localhost:5000`
- **Authentication:** Send `authenticate` event with user ID
- **Room:** Users join `user_${userId}` room for personalized updates 