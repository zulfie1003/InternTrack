# 🚀 InternTrack - Job Application Tracking SaaS

A full-stack MERN application for tracking internships and job applications with analytics, Kanban board, and role-based authentication.

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with bcrypt password hashing
- Role-based access control (User/Admin)
- Protected routes and middleware
- Secure HTTP headers with Helmet
- Rate limiting to prevent abuse

### 📊 Application Management
- Complete CRUD operations for job applications
- Advanced filtering and search
- Pagination support
- Bulk delete operations
- Status tracking with timeline

### 📈 Analytics Dashboard
- Real-time statistics and insights
- Monthly application trends
- Status distribution charts
- Success rate calculations
- Source analytics
- Top companies tracking

### 🎯 Kanban Board
- Drag-and-drop interface
- Real-time status updates
- Visual application tracking
- Four default columns: Applied, Interview, Offer, Rejected

### 💼 Application Features
- Track company, position, location, salary
- Application dates and deadlines
- Priority levels (Low, Medium, High)
- Tags and notes
- Job source tracking
- Contact person details

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **react-beautiful-dnd** - Drag and drop
- **react-hot-toast** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd interntrack
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/interntrack
# JWT_SECRET=your_super_secret_key_here

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
interntrack/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── applicationController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── error.js              # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Application.js        # Application schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── applications.js
│   │   └── analytics.js
│   ├── .env.example
│   ├── server.js                 # Entry point
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── DashboardLayout.js
    │   │   ├── ProtectedRoute.js
    │   │   └── KanbanBoard.js
    │   ├── context/
    │   │   └── AuthContext.js    # Global auth state
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   └── Applications.js
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    ├── tailwind.config.js
    └── package.json
```

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
GET    /api/auth/me                # Get current user
PUT    /api/auth/profile           # Update profile
PUT    /api/auth/password          # Change password
```

### Applications
```
GET    /api/applications           # Get all applications (with filters)
GET    /api/applications/:id       # Get single application
POST   /api/applications           # Create application
PUT    /api/applications/:id       # Update application
DELETE /api/applications/:id       # Delete application
PATCH  /api/applications/:id/status # Update status
DELETE /api/applications/bulk      # Bulk delete
```

### Analytics
```
GET    /api/analytics/dashboard    # Dashboard statistics
GET    /api/analytics/status-stats # Status breakdown
GET    /api/analytics/timeline     # Timeline data
GET    /api/analytics/response-rate # Response rate
GET    /api/analytics/sources      # Source analytics
```

## 🌐 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=<your-mongodb-atlas-uri>`
   - `JWT_SECRET=<your-secret>`
   - `FRONTEND_URL=<your-frontend-url>`

### Frontend Deployment (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. From the `frontend` directory, run: `vercel`
3. Follow the prompts
4. Add environment variable:
   - `REACT_APP_API_URL=<your-backend-url>`

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get connection string and update `.env`

## 🎨 Features to Add

- [ ] Email notifications
- [ ] Calendar integration
- [ ] Resume upload and tracking
- [ ] Interview preparation notes
- [ ] Deadline reminders
- [ ] Export applications to CSV/PDF
- [ ] Dark mode
- [ ] Mobile app (React Native)

## 🐛 Known Issues

- Drag-and-drop may not work on mobile browsers
- Date format depends on browser locale

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interntrack
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=InternTrack
REACT_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Portfolio](https://yourportfolio.com)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- UI inspiration from modern SaaS applications

---

**Made with ❤️ using MERN Stack**
