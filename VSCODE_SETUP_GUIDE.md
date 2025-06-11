# VS Code Setup Guide for Multi-Level Referral System

A comprehensive guide to set up and develop the multi-level referral system using VS Code.

## 📋 Prerequisites

### Required Software
- [VS Code](https://code.visualstudio.com/) (Latest version)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [Git](https://git-scm.com/) (Latest version)

### VS Code Extensions (Recommended)
Install these extensions for better development experience:

```bash
# Essential Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- MongoDB for VS Code
- REST Client
- Thunder Client (or Postman)
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer
- Material Icon Theme
```

## 🚀 Step-by-Step Setup

### Step 1: Clone from GitHub

#### Option A: Using VS Code
1. Open VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Git: Clone" and select it
4. Enter your repository URL: `https://github.com/yourusername/referral-system.git`
5. Choose a local directory to clone the repository
6. Click "Clone"

#### Option B: Using Terminal
```bash
# Navigate to your desired directory
cd C:\Users\YourName\Projects

# Clone the repository
git clone https://github.com/yourusername/referral-system.git

# Open in VS Code
code referral-system
```

### Step 2: Open Project in VS Code

```bash
# Navigate to the project directory
cd referral-system

# Open VS Code in the current directory
code .
```

### Step 3: Install Dependencies

Open VS Code terminal (`Ctrl+`` ` or `View > Terminal`):

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 4: Environment Configuration

#### Backend Environment (.env)
Create `.env` file in the root directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/referral_system

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Settings
FRONTEND_URL=http://localhost:3000

# JWT Secret (for future authentication)
JWT_SECRET=your_super_secret_jwt_key_here_12345

# Optional: MongoDB Atlas (if using cloud)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/referral_system
```

#### Frontend Environment (.env)
Create `.env` file in the `frontend` directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Socket.IO Configuration
REACT_APP_SOCKET_URL=http://localhost:5000

# Environment
REACT_APP_ENV=development
```

### Step 5: VS Code Workspace Configuration

Create `.vscode/settings.json` in your project root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/.DS_Store": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.defaultProfile.osx": "zsh"
}
```

### Step 6: Launch Configuration

Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server.js",
      "envFile": "${workspaceFolder}/.env",
      "console": "integratedTerminal",
      "restart": true,
      "protocol": "inspector"
    },
    {
      "name": "Launch Frontend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/react-scripts",
      "args": ["start"],
      "cwd": "${workspaceFolder}/frontend",
      "envFile": "${workspaceFolder}/frontend/.env",
      "console": "integratedTerminal",
      "restart": true,
      "protocol": "inspector"
    }
  ]
}
```

## 🛠️ Development Workflow

### Starting the Application

#### Method 1: Using VS Code Terminal
1. Open VS Code terminal (`Ctrl+`` `)
2. Start backend:
   ```bash
   npm start
   ```
3. Open new terminal tab (`Ctrl+Shift+`` `)
4. Start frontend:
   ```bash
   cd frontend
   npm start
   ```

#### Method 2: Using VS Code Tasks
Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "npm",
      "args": ["start"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "npm",
      "args": ["start"],
      "options": {
        "cwd": "${workspaceFolder}/frontend"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Start Both",
      "dependsOrder": "parallel",
      "dependsOn": ["Start Backend", "Start Frontend"],
      "group": "build"
    }
  ]
}
```

### Testing API with Thunder Client

1. Install Thunder Client extension
2. Create a new collection
3. Add requests for testing:

#### Health Check
```http
GET http://localhost:5000/
```

#### Register User
```http
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "email": "test@example.com",
  "name": "Test User",
  "password": "password123"
}
```

#### Login User
```http
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "test@example.com"
}
```

#### Create Transaction
```http
POST http://localhost:5000/api/transactions
Content-Type: application/json

{
  "userId": "USER_ID_HERE",
  "transactionValue": 1500,
  "itemId": "item123",
  "transactionId": "txn_123456789"
}
```

## 🔧 VS Code Tips and Tricks

### Useful Keyboard Shortcuts
- `Ctrl+Shift+P`: Command Palette
- `Ctrl+`` `: Toggle Terminal
- `Ctrl+Shift+`` `: New Terminal
- `Ctrl+Shift+F`: Search in Files
- `Ctrl+F`: Search in Current File
- `Ctrl+D`: Select Next Occurrence
- `Alt+Shift+F`: Format Document
- `Ctrl+/`: Toggle Comment
- `Ctrl+Space`: Trigger Suggestions

### Code Snippets
Create custom snippets in VS Code:

1. Go to `File > Preferences > Configure User Snippets`
2. Select `javascript.json`
3. Add snippets:

```json
{
  "API Route": {
    "prefix": "api-route",
    "body": [
      "router.${1:get}('/${2:path}', async (req, res) => {",
      "  try {",
      "    $3",
      "    res.status(200).json({ message: 'Success' });",
      "  } catch (error) {",
      "    console.error('Error:', error);",
      "    res.status(500).json({ message: 'Server error', error: error.message });",
      "  }",
      "});"
    ],
    "description": "Create API route"
  },
  "MongoDB Model": {
    "prefix": "mongo-model",
    "body": [
      "const mongoose = require('mongoose');",
      "",
      "const ${1:modelName}Schema = new mongoose.Schema({",
      "  $2",
      "}, { timestamps: true });",
      "",
      "module.exports = mongoose.model('${1:ModelName}', ${1:modelName}Schema);"
    ],
    "description": "Create MongoDB model"
  }
}
```

### Git Integration
1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Connect to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/referral-system.git
   git branch -M main
   git push -u origin main
   ```

3. **VS Code Git Features**:
   - Source Control panel (`Ctrl+Shift+G`)
   - Inline blame annotations
   - Git history
   - Branch management

## 🐛 Debugging

### Backend Debugging
1. Set breakpoints in your code
2. Press `F5` or go to `Run > Start Debugging`
3. Select "Launch Backend" configuration
4. Use `console.log()` for quick debugging

### Frontend Debugging
1. Open browser DevTools (`F12`)
2. Set breakpoints in React components
3. Use React Developer Tools extension
4. Check Network tab for API calls

### MongoDB Debugging
1. Install MongoDB for VS Code extension
2. Connect to your database
3. View collections and documents
4. Run queries directly in VS Code

## 📁 Project Structure in VS Code

```
referral-system/
├── .vscode/                 # VS Code configuration
│   ├── settings.json
│   ├── launch.json
│   └── tasks.json
├── backend/                 # Backend code
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/               # Frontend code
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── .env                    # Backend environment
├── .gitignore
└── README.md
```

## 🚀 Quick Start Commands

### One-liner Setup
```bash
# Clone and setup
git clone https://github.com/yourusername/referral-system.git && cd referral-system && npm install && cd frontend && npm install && cd .. && code .

# Start both servers
npm run dev  # (if you add this script to package.json)
```

### Package.json Scripts
Add these to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "concurrently \"npm start\" \"cd frontend && npm start\"",
    "install-all": "npm install && cd frontend && npm install",
    "build": "cd frontend && npm run build"
  }
}
```

## 📚 Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://reactjs.org/docs)
- [Socket.IO Documentation](https://socket.io/docs)

---

**Happy Coding! 🚀** 