# System Architecture - Multi-Level Referral System

## 🏗️ Overview

The Multi-Level Referral System is built using a modern full-stack architecture with real-time capabilities, designed for scalability and maintainability.

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │   React App     │    │   Socket.IO     │    │   Tailwind CSS  │         │
│  │   (Frontend)    │    │    Client       │    │   (Styling)     │         │
│  │                 │    │                 │    │                 │         │
│  │ • Dashboard     │    │ • Real-time     │    │ • Responsive    │         │
│  │ • Registration  │    │   updates       │    │   design        │         │
│  │ • Login         │    │ • Live earnings │    │ • Modern UI     │         │
│  │ • Referral      │    │ • Notifications │    │ • Components    │         │
│  │   Reports       │    │ • Connection    │    │                 │         │
│  └─────────────────┘    │   management    │    └─────────────────┘         │
│                         └─────────────────┘                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/WebSocket
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            API GATEWAY LAYER                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │   Express.js    │    │   Socket.IO     │    │   CORS          │         │
│  │   (Backend)     │    │   Server        │    │   Middleware    │         │
│  │                 │    │                 │    │                 │         │
│  │ • REST API      │    │ • Real-time     │    │ • Cross-origin  │         │
│  │ • Middleware    │    │   events        │    │   requests      │         │
│  │ • Route         │    │ • Room          │    │ • Security      │         │
│  │   handling      │    │   management    │    │   headers       │         │
│  │ • Error         │    │ • Authentication│    │                 │         │
│  │   handling      │    │ • Broadcasting  │    │                 │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Business Logic
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BUSINESS LOGIC LAYER                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │   Controllers   │    │   Services      │    │   Utils         │         │
│  │                 │    │                 │    │                 │         │
│  │ • User          │    │ • Referral      │    │ • Referral      │         │
│  │   Controller    │    │   Logic         │    │   Code          │         │
│  │ • Transaction   │    │ • Earnings      │    │   Generator     │         │
│  │   Controller    │    │   Calculation   │    │ • Validation    │         │
│  │ • Validation    │    │ • Multi-level   │    │ • Helpers       │         │
│  │ • Error         │    │   Distribution  │    │                 │         │
│  │   Handling      │    │ • Real-time     │    │                 │         │
│  │                 │    │   Updates       │    │                 │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Data Access
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA ACCESS LAYER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │   Models        │    │   Mongoose      │    │   MongoDB       │         │
│  │                 │    │   ODM           │    │   Database      │         │
│  │ • User Model    │    │ • Schema        │    │                 │         │
│  │ • Transaction   │    │   Definition    │    │ • Collections   │         │
│  │   Model         │    │ • Validation    │    │ • Indexes       │         │
│  │ • Earning       │    │ • Middleware    │    │ • Aggregation   │         │
│  │   Model         │    │ • Relationships │    │ • Transactions  │         │
│  │ • Referral      │    │ • Query         │    │ • Replication   │         │
│  │   Schemas       │    │   Building      │    │                 │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Architecture

### User Registration Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───►│   API       │───►│  Business   │───►│  Database   │
│  (React)    │    │  Gateway    │    │   Logic     │    │ (MongoDB)   │
│             │    │             │    │             │    │             │
│ 1. User     │    │ 2. Validate │    │ 3. Generate │    │ 4. Save     │
│    fills    │    │    request  │    │    referral │    │    user     │
│    form     │    │ 3. Route to │    │    code     │    │ 5. Update   │
│             │    │    handler  │    │ 4. Check    │    │    referrer │
└─────────────┘    └─────────────┘    │    referral │    │             │
                                      │    limits    │    └─────────────┘
                                      └─────────────┘
```

### Transaction Processing Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───►│   API       │───►│  Business   │───►│  Database   │
│  (React)    │    │  Gateway    │    │   Logic     │    │ (MongoDB)   │
│             │    │             │    │             │    │             │
│ 1. Create   │    │ 2. Validate │    │ 3. Calculate│    │ 4. Save     │
│    trans.   │    │    request  │    │    earnings │    │    trans.   │
│             │    │ 3. Route to │    │ 4. Distribute│   │ 5. Update   │
│             │    │    handler  │    │    earnings │    │    earnings │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Real-time   │◄───│ Socket.IO   │◄───│ Emit        │◄───│ Transaction │
│ Updates     │    │ Server      │    │ Events      │    │ Complete    │
│ (Frontend)  │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## 🏛️ Component Architecture

### Frontend Architecture
```
src/
├── components/           # React Components
│   ├── Dashboard.js     # Main dashboard
│   ├── Register.js      # User registration
│   ├── Login.js         # User login
│   ├── ReferralReport.js # Analytics & charts
│   └── RealTimeEarningsPanel.js # Live updates
├── context/             # React Context
│   └── AuthContext.js   # Authentication state
├── services/            # API Services
│   ├── api.js          # HTTP client
│   └── socketService.js # Socket.IO client
├── App.js              # Main app component
└── index.js            # Entry point
```

### Backend Architecture
```
backend/
├── controllers/         # Request handlers
│   ├── userController.js    # User operations
│   └── transactionController.js # Transaction logic
├── models/             # Database models
│   ├── Users.js        # User schema
│   ├── Transaction.js  # Transaction schema
│   └── Earning.js      # Earning schema
├── routes/             # API routes
│   ├── index.js        # Route aggregator
│   ├── userRoutes.js   # User endpoints
│   └── transactions.js # Transaction endpoints
├── utils/              # Utility functions
│   └── generateReferralCode.js # Code generation
├── app.js              # Express app setup
└── server.js           # Server with Socket.IO
```

## 🔌 Real-Time Architecture

### Socket.IO Event Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Socket.IO     │    │   Backend       │
│   Client        │    │   Server        │    │   Business      │
│                 │    │                 │    │   Logic         │
│ 1. Connect      │───►│ 2. Authenticate │───►│ 3. Join Room    │
│ 2. Listen for   │◄───│ 4. Emit Events  │◄───│ 5. Process      │
│    Events       │    │ 5. Broadcast    │    │    Updates      │
│ 3. Update UI    │    │    Updates      │    │ 6. Calculate    │
└─────────────────┘    └─────────────────┘    │    Earnings     │
                                              └─────────────────┘
```

### Event Types
```javascript
// Client → Server
socket.emit('authenticate', userId);

// Server → Client
socket.emit('transaction_created', data);
socket.emit('earnings_update', data);
socket.emit('transaction_notification', data);
```

## 🗄️ Database Architecture

### Schema Relationships
```
User
├── _id (ObjectId)
├── email (String, unique)
├── name (String)
├── referralCode (String, unique)
├── referredBy (String, ref: User.referralCode)
├── firstLevelReferrals (Array)
│   ├── userId (ObjectId, ref: User)
│   ├── directEarning (Number)
│   └── indirectEarning (Number)
├── secondLevelReferrals (Array)
│   ├── userId (ObjectId, ref: User)
│   ├── via_userId (ObjectId, ref: User)
│   └── Earning (Number)
└── totalEarnings (Number)

Transaction
├── _id (ObjectId)
├── transactionId (String)
├── userId (ObjectId, ref: User)
├── transactionValue (Number)
├── itemId (String)
└── createdAt (Date)

Earning
├── _id (ObjectId)
├── transactionId (ObjectId, ref: Transaction)
├── userId (ObjectId, ref: User)
├── transactionValue (Number)
├── directReferralUserId (ObjectId, ref: User)
├── directReferralEarning (Number)
├── indirectReferralUserId (ObjectId, ref: User)
├── indirectReferralEarning (Number)
└── createdAt (Date)
```

### Indexes
```javascript
// User Collection
{ email: 1 }                    // Unique index
{ referralCode: 1 }             // Unique index
{ referredBy: 1 }               // For referral lookups

// Transaction Collection
{ userId: 1 }                   // For user transactions
{ transactionId: 1 }            // Unique index
{ createdAt: -1 }               // For sorting

// Earning Collection
{ userId: 1 }                   // For user earnings
{ transactionId: 1 }            // For transaction earnings
{ createdAt: -1 }               // For sorting
```

## 🔒 Security Architecture

### Authentication & Authorization
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│                 │    │                 │    │                 │
│ 1. User Login   │───►│ 2. Validate     │───►│ 3. Check User   │
│ 2. Store Token  │◄───│ 3. Generate     │◄───│ 4. Return User  │
│ 3. Send Token   │    │    Token        │    │    Data         │
│    in Headers   │    │ 4. Set Cookie   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Validation
- **Input Validation**: Express middleware for request validation
- **Schema Validation**: Mongoose schema validation
- **Business Logic Validation**: Custom validation in controllers
- **Output Sanitization**: Data sanitization before response

### CORS Configuration
```javascript
// Backend CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 📈 Scalability Considerations

### Horizontal Scaling
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load          │    │   Multiple      │    │   MongoDB       │
│   Balancer      │    │   Node.js       │    │   Replica Set   │
│                 │    │   Instances     │    │                 │
│ • Nginx         │───►│ • Instance 1    │───►│ • Primary       │
│ • HAProxy       │    │ • Instance 2    │    │ • Secondary 1   │
│ • Cloud Load    │    │ • Instance N    │    │ • Secondary 2   │
│   Balancer      │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Database Scaling
- **Read Replicas**: For read-heavy operations
- **Sharding**: For large datasets
- **Connection Pooling**: For efficient connections
- **Caching**: Redis for frequently accessed data

### Performance Optimization
- **Indexing**: Strategic database indexes
- **Pagination**: For large result sets
- **Compression**: Gzip compression
- **CDN**: For static assets
- **Caching**: Redis for session data

## 🔧 Deployment Architecture

### Development Environment
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   MongoDB       │
│   (Port 3000)   │    │   (Port 5000)   │    │   (Port 27017)  │
│                 │    │                 │    │                 │
│ • React Dev     │◄──►│ • Node.js Dev   │◄──►│ • Local DB      │
│ • Hot Reload    │    │ • Nodemon       │    │ • Development   │
│ • Dev Tools     │    │ • Debug Mode    │    │   Data          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Production Environment
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Static    │    │   Load          │    │   Application   │
│   Assets        │    │   Balancer      │    │   Servers       │
│                 │    │                 │    │                 │
│ • React Build   │    │ • Nginx         │    │ • Node.js       │
│ • Images        │    │ • SSL/TLS       │    │ • PM2           │
│ • CSS/JS        │    │ • Rate Limiting │    │ • Cluster Mode  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Database      │
                       │   Cluster       │
                       │                 │
                       │ • MongoDB Atlas │
                       │ • Replica Set   │
                       │ • Backup        │
                       └─────────────────┘
```

## 🚀 Technology Stack

### Frontend
- **React 18**: UI framework
- **Tailwind CSS**: Styling
- **Socket.IO Client**: Real-time communication
- **Recharts**: Data visualization
- **Lucide React**: Icons

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Socket.IO**: Real-time communication
- **Mongoose**: MongoDB ODM
- **CORS**: Cross-origin resource sharing

### Database
- **MongoDB**: NoSQL database
- **Mongoose**: Object modeling

### Development Tools
- **VS Code**: IDE
- **Git**: Version control
- **npm**: Package manager
- **Postman/Thunder Client**: API testing

### Deployment
- **Docker**: Containerization (optional)
- **PM2**: Process manager
- **Nginx**: Reverse proxy
- **MongoDB Atlas**: Cloud database

## 📊 Performance Metrics

### Response Times
- **API Endpoints**: < 200ms
- **Database Queries**: < 100ms
- **Real-time Events**: < 50ms
- **Page Load**: < 2s

### Scalability Targets
- **Concurrent Users**: 10,000+
- **Transactions/Second**: 1,000+
- **Database Connections**: 100+
- **Real-time Connections**: 5,000+

---

**This architecture provides a solid foundation for a scalable, maintainable, and high-performance multi-level referral system.** 