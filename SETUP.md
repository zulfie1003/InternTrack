# 🔧 InternTrack - Complete Setup Guide

## 📝 Project Information

**Project Name:** InternTrack  
**Type:** Full-Stack MERN SaaS Application  
**Author:** Zulfie (alijulfekar419@gmail.com)  
**GitHub:** [Your GitHub Repository URL]  
**Status:** ✅ Development Ready

---

## ⚙️ Configuration Setup

### Environment Variables

#### Backend (.env)
Create `backend/.env` with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5001

# Database
MONGODB_URI=mongodb://localhost:27017/interntrack
# For production (MongoDB Atlas):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interntrack?retryWrites=true&w=majority

# JWT Secret (Generate a strong random string for production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
Create `frontend/.env` with the following variables:

```env
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_NAME=InternTrack
REACT_APP_VERSION=1.0.0
```

---

## 🚀 Quick Start Steps

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Database Setup

**Option A: Local MongoDB**

macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Windows: Download from [MongoDB Community](https://www.mongodb.com/try/download/community)

Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud)**

1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster
3. Get connection string
4. Add to `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interntrack?retryWrites=true&w=majority
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

### 4. Verify Setup

- ✅ Backend health check: `http://localhost:5001/health`
- ✅ Frontend: `http://localhost:3000`
- ✅ Register account and login
- ✅ Create first job application

---

## 🔒 Important Security Notes

### DO NOT Commit:
- ❌ `.env` files with actual credentials
- ❌ API keys or secrets
- ❌ Personal access tokens
- ❌ `node_modules` directory

### Always:
- ✅ Use `.env.example` as template
- ✅ Keep secrets in `.env` (locally)
- ✅ Use strong JWT_SECRET in production
- ✅ Never push `.env` files to GitHub
- ✅ Rotate credentials regularly

---

## 🧪 Testing

### Manual Testing Checklist

1. **Authentication**
   - Register new account
   - Login with credentials
   - Logout functionality
   - Password reset (if available)

2. **CRUD Operations**
   - Create job application
   - Read/view applications
   - Update application details
   - Delete application

3. **Features**
   - Filter applications by status
   - Sort by date
   - View Kanban board
   - Check analytics dashboard
   - Search functionality

4. **UI/UX**
   - Responsive on mobile
   - Form validations
   - Error messages
   - Loading states
   - Toast notifications

---

## 🚢 Deployment Checklist

### Before Deploying:

- [ ] `.env` files are NOT tracked by git
- [ ] All environment variables documented
- [ ] Database configured for production
- [ ] JWT_SECRET is strong and unique
- [ ] CORS properly configured
- [ ] API rate limiting enabled
- [ ] Error handling implemented
- [ ] Tests pass locally
- [ ] No console.log statements in production code
- [ ] Security headers enabled (Helmet)

### Deployment Platforms:

- **Backend:** Render, Railway, Heroku
- **Frontend:** Vercel, Netlify
- **Database:** MongoDB Atlas

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📚 Project Structure

```
interntrack/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── .env.example     # Environment template
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client
│   │   ├── App.js       # Main app component
│   │   └── index.js     # React entry point
│   ├── .env.example     # Environment template
│   └── package.json     # Dependencies
│
├── README.md            # Full documentation
├── QUICK_START.md       # Quick setup guide
├── API_DOCUMENTATION.md # API reference
└── SETUP.md            # This file
```

---

## 🔗 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Analytics
- `GET /api/analytics/summary` - Get dashboard stats
- `GET /api/analytics/trends` - Get monthly trends

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete details.

---

## 🐛 Troubleshooting

### Port Issues

**Error: EADDRINUSE: address already in use :::5001**

Solution:
```bash
# Find process using port 5001
lsof -i :5001

# Kill the process
kill -9 <PID>

# Or change port in backend/.env to 5002
```

### Database Connection Issues

**Error: Failed to connect to MongoDB**

- [ ] MongoDB is running locally (`mongosh` to test)
- [ ] MONGODB_URI is correct in `.env`
- [ ] Network connectivity (if using MongoDB Atlas)
- [ ] Firewall allows connection

### Frontend API Connection Issues

**Error: Cannot reach backend**

- [ ] Backend is running on correct port
- [ ] REACT_APP_API_URL matches backend URL
- [ ] CORS enabled in backend
- [ ] No typos in API endpoint

---

## 📞 Support & Contribution

**Developer:** Zulfie  
**Email:** alijulfekar419@gmail.com  
**GitHub Issues:** [Report bugs on GitHub]

---

## 📄 License

This project is available for educational and portfolio use.

---

**Last Updated:** February 13, 2026  
**Version:** 1.0.0
