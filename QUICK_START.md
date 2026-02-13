# ⚡ InternTrack - Quick Start Guide

Get InternTrack running in **5 minutes**!

## 📋 Prerequisites
- Node.js installed (v14+) - [Download here](https://nodejs.org/)
- MongoDB installed locally OR MongoDB Atlas account - [Get free account](https://www.mongodb.com/cloud/atlas/register)
- Text editor (VS Code recommended)
- Terminal/Command Prompt

---

## 🚀 Quick Setup (Local Development)

### Step 1: Install MongoDB (If not using Atlas)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

---

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Open .env and update if needed (defaults work for local):
# MONGODB_URI=mongodb://localhost:27017/interntrack
# JWT_SECRET=your_secret_key_change_in_production
# PORT=5000

# Start backend
npm run dev
```

✅ Backend should be running at `http://localhost:5000`

Test it: Open browser and go to `http://localhost:5000/health`

---

### Step 3: Frontend Setup

**Open a new terminal window** (keep backend running)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Open .env and verify:
# REACT_APP_API_URL=http://localhost:5000/api

# Start frontend
npm start
```

✅ Frontend should open automatically at `http://localhost:3000`

---

## 🎉 You're Done!

### What to do next:

1. **Register an account** at `http://localhost:3000/register`
2. **Login** with your credentials
3. **Add your first application** using the "Add Application" button
4. **Try the Kanban board** - drag applications between columns
5. **Check analytics** on the dashboard

---

## 🔧 Troubleshooting

### Backend won't start?

**Error: MongoDB connection failed**
```bash
# Make sure MongoDB is running
# macOS:
brew services list

# Windows: Check Services app for MongoDB

# OR use MongoDB Atlas instead:
# 1. Create free cluster at mongodb.com
# 2. Get connection string
# 3. Update MONGODB_URI in .env
```

**Error: Port 5000 already in use**
```bash
# Change PORT in backend/.env to different number (e.g., 5001)
# Update frontend/.env REACT_APP_API_URL accordingly
```

---

### Frontend won't start?

**Error: Module not found**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: Cannot connect to backend**
```bash
# Verify backend is running
# Check REACT_APP_API_URL in frontend/.env matches backend URL
```

---

## 📱 Test the Application

### Create Test Data

1. **Register**: Create account with any email/password
2. **Add Applications**: Click "Add Application"
   - Company: Google
   - Position: Software Engineer Intern
   - Status: Applied
   - Fill other optional fields

3. **Try Kanban**: Go to Applications → Switch to Kanban view
   - Drag application to "Interview" column
   - Watch it update!

4. **Check Analytics**: Go to Dashboard
   - See your statistics
   - View charts

---

## 🎯 Next Steps

### For Learning:
- Read through the code in `backend/controllers/`
- Explore React components in `frontend/src/pages/`
- Try adding a new feature
- Read the full README.md

### For Production:
- Follow DEPLOYMENT.md to deploy to Render/Vercel
- Set up MongoDB Atlas
- Configure production environment variables
- Enable monitoring

### For Interviews:
- Read INTERVIEW_PREP.md
- Practice explaining the architecture
- Review security implementations
- Prepare demo walkthrough

---

## 📚 Documentation

- **README.md** - Full project documentation
- **API_DOCUMENTATION.md** - Complete API reference
- **DEPLOYMENT.md** - Production deployment guide
- **INTERVIEW_PREP.md** - Interview questions & answers

---

## 🆘 Still Need Help?

### Common Questions:

**Q: Can I use this for my portfolio?**
A: Absolutely! That's what it's for. Just customize it and make it your own.

**Q: Do I need to know MERN stack?**
A: Basic knowledge helps, but the code is well-commented. Great learning project!

**Q: Is it mobile responsive?**
A: Yes! Try resizing your browser or open on mobile.

**Q: Can I add features?**
A: Yes! Fork it and make it yours. See README for feature ideas.

---

## ✅ Quick Checklist

- [ ] Node.js installed
- [ ] MongoDB running (or Atlas setup)
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend .env file created
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend .env file created
- [ ] Frontend running on port 3000
- [ ] Can register new user
- [ ] Can login
- [ ] Can create application
- [ ] Kanban board works
- [ ] Analytics load

---

## 🎊 Congratulations!

You now have a production-ready MERN stack application running locally!

**Share your success:**
- Star the repo on GitHub
- Share with friends
- Add to your portfolio
- Deploy to production
- Use it for your job search!

---

**Happy Coding!** 🚀
