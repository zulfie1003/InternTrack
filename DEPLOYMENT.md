# 🚀 InternTrack Deployment Guide

## Table of Contents
1. [MongoDB Atlas Setup](#mongodb-atlas-setup)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Testing](#post-deployment-testing)
6. [Common Issues](#common-issues)

---

## 1. MongoDB Atlas Setup

### Step 1: Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Click "Build a Database"

### Step 2: Create Cluster
1. Choose **FREE** tier (M0)
2. Select a cloud provider and region (choose closest to you)
3. Name your cluster (e.g., "interntrack-cluster")
4. Click "Create"

### Step 3: Create Database User
1. Go to **Database Access** in left sidebar
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Create username and strong password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to **Network Access** in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's IP
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to **Database** in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `interntrack`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/interntrack?retryWrites=true&w=majority
```

---

## 2. Backend Deployment (Render)

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Make sure `.gitignore` includes `node_modules` and `.env`

### Step 2: Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository

### Step 4: Configure Service
Fill in the following:

**Basic Settings:**
- Name: `interntrack-backend`
- Region: Choose closest to your users
- Branch: `main` (or your default branch)
- Root Directory: `backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

**Instance Type:**
- Free (for testing)

### Step 5: Add Environment Variables
Click "Advanced" → "Add Environment Variable"

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/interntrack?retryWrites=true&w=majority
JWT_SECRET=your_very_strong_random_secret_key_here_min_32_chars
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important:** 
- Generate a strong JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- You'll update FRONTEND_URL after deploying frontend

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL (e.g., `https://interntrack-backend.onrender.com`)

---

## 3. Frontend Deployment (Vercel)

### Method 1: Vercel Dashboard (Recommended)

#### Step 1: Prepare Frontend
1. Make sure your frontend code is pushed to GitHub

#### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### Step 3: Add Environment Variables
Before clicking "Deploy", add environment variable:

```env
REACT_APP_API_URL=https://interntrack-backend.onrender.com/api
```

Replace with your actual Render backend URL

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Copy your frontend URL (e.g., `https://interntrack.vercel.app`)

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Create production .env
echo "REACT_APP_API_URL=https://interntrack-backend.onrender.com/api" > .env.production

# Deploy
vercel --prod

# Follow prompts and select your project settings
```

---

## 4. Environment Variables

### Update Backend FRONTEND_URL

After deploying frontend:
1. Go to Render dashboard
2. Select your backend service
3. Go to "Environment"
4. Update `FRONTEND_URL` to your Vercel URL
5. Click "Save Changes"
6. Service will automatically redeploy

### Full Environment Variables

**Backend (Render):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/interntrack
JWT_SECRET=<32-char-random-string>
JWT_EXPIRE=7d
FRONTEND_URL=https://interntrack.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (Vercel):**
```env
REACT_APP_API_URL=https://interntrack-backend.onrender.com/api
```

---

## 5. Post-Deployment Testing

### Test Backend
```bash
# Health check
curl https://interntrack-backend.onrender.com/health

# Register test user
curl -X POST https://interntrack-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Frontend
1. Visit your Vercel URL
2. Try to register a new account
3. Login with the account
4. Create a test application
5. Check analytics dashboard
6. Test Kanban board drag-and-drop

### Common Deployment Checks
- ✅ Backend health endpoint responds
- ✅ User registration works
- ✅ User login works
- ✅ Applications can be created
- ✅ Analytics load correctly
- ✅ Kanban board drag works
- ✅ No CORS errors in browser console

---

## 6. Common Issues

### Issue: CORS Error
**Symptoms:** "Access to fetch at ... has been blocked by CORS policy"

**Solution:**
1. Verify `FRONTEND_URL` in backend matches your Vercel URL exactly
2. Don't include trailing slash
3. Redeploy backend after changing

### Issue: MongoDB Connection Failed
**Symptoms:** Backend logs show "MongoDB Connection Error"

**Solutions:**
1. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 or Render IPs)
2. Verify connection string is correct
3. Ensure database user has correct permissions
4. Check if password contains special characters (URL encode them)

### Issue: JWT Token Invalid
**Symptoms:** "Token is invalid or expired"

**Solutions:**
1. Verify `JWT_SECRET` is set and same across deployments
2. Clear browser localStorage
3. Try logging in again

### Issue: Render Free Tier Spindown
**Symptoms:** Backend slow on first request

**Solutions:**
1. Free tier services spin down after 15 minutes of inactivity
2. First request may take 30-60 seconds
3. Upgrade to paid plan for always-on service
4. Use a service like UptimeRobot to ping your backend every 14 minutes

### Issue: Environment Variables Not Working
**Symptoms:** Features not working as expected

**Solutions:**
1. Restart services after changing environment variables
2. In Render, variables update automatically but may need manual redeploy
3. In Vercel, redeploy frontend after changing variables
4. Check variable names match exactly (case-sensitive)

---

## 7. Custom Domain (Optional)

### Vercel Custom Domain
1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow DNS configuration instructions

### Render Custom Domain
1. Go to your service in Render
2. Click "Settings" → "Custom Domains"
3. Add your domain
4. Update DNS records as instructed

---

## 8. SSL/HTTPS

Both Vercel and Render provide **automatic HTTPS** with free SSL certificates. No configuration needed!

---

## 9. Monitoring & Logs

### Render Logs
1. Go to your service
2. Click "Logs" tab
3. Monitor real-time logs
4. Set up log alerts

### Vercel Analytics
1. Go to your project
2. Click "Analytics" tab
3. View deployment logs
4. Monitor function executions

---

## 10. Production Checklist

Before launching:

- [ ] All environment variables set correctly
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong JWT_SECRET generated (32+ characters)
- [ ] CORS configured with correct frontend URL
- [ ] Rate limiting enabled
- [ ] Test user registration and login
- [ ] Test all CRUD operations
- [ ] Test analytics dashboard
- [ ] Test Kanban board
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Configure error monitoring (Sentry, etc.)
- [ ] Set up uptime monitoring
- [ ] Backup strategy for database

---

## 🎉 Congratulations!

Your InternTrack SaaS is now live in production!

**Share your app:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com`

**Next Steps:**
1. Share with friends for feedback
2. Add to your resume and portfolio
3. Continue adding features
4. Monitor usage and performance
