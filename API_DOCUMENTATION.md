# 📡 InternTrack API Documentation

Base URL: `http://localhost:5000/api` (Development)
Production: `https://your-backend.onrender.com/api`

All API requests return JSON responses with the following format:

```json
{
  "success": true/false,
  "message": "Descriptive message",
  "data": { ... }
}
```

---

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://ui-avatars.com/api/?name=John+Doe"
  }
}
```

---

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://ui-avatars.com/api/?name=John+Doe"
  }
}
```

---

### Get Current User
```http
GET /auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "https://ui-avatars.com/api/?name=John+Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Profile
```http
PUT /auth/profile
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### Change Password
```http
PUT /auth/password
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully",
  "token": "new-jwt-token..."
}
```

---

## 📝 Applications

### Get All Applications
```http
GET /applications
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): Filter by status (applied, interview, offer, rejected, accepted, withdrawn)
- `jobType` (optional): Filter by job type (internship, full-time, part-time, contract)
- `priority` (optional): Filter by priority (low, medium, high)
- `search` (optional): Search in company, position, location
- `sort` (optional): Sort field (company, position, applicationDate, status)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```
GET /applications?status=interview&jobType=internship&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 23,
  "page": 1,
  "pages": 3,
  "applications": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": {
        "_id": "507f191e810c19729de860ea",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "company": "Google",
      "position": "Software Engineer Intern",
      "location": "Mountain View, CA",
      "jobType": "internship",
      "status": "interview",
      "salary": {
        "min": 50000,
        "max": 70000,
        "currency": "USD"
      },
      "applicationDate": "2024-01-15T00:00:00.000Z",
      "interviewDate": "2024-02-01T00:00:00.000Z",
      "jobUrl": "https://careers.google.com/...",
      "notes": "Great opportunity, prepare data structures",
      "priority": "high",
      "source": "linkedin",
      "tags": ["FAANG", "remote-option", "summer-2024"],
      "timeline": [
        {
          "event": "Status changed to interview",
          "date": "2024-01-20T00:00:00.000Z",
          "notes": "HR screening scheduled"
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-20T14:20:00.000Z"
    }
  ]
}
```

---

### Get Single Application
```http
GET /applications/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "application": { ... }
}
```

---

### Create Application
```http
POST /applications
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "company": "Google",
  "position": "Software Engineer Intern",
  "location": "Mountain View, CA",
  "jobType": "internship",
  "status": "applied",
  "salary": {
    "min": 50000,
    "max": 70000,
    "currency": "USD"
  },
  "applicationDate": "2024-01-15",
  "deadline": "2024-02-01",
  "contactPerson": {
    "name": "Jane Smith",
    "email": "jane@google.com",
    "phone": "+1234567890"
  },
  "jobUrl": "https://careers.google.com/...",
  "notes": "Great opportunity",
  "priority": "high",
  "source": "linkedin",
  "tags": ["FAANG", "remote-option"]
}
```

**Note:** Only `company` and `position` are required. All other fields are optional.

**Response (201):**
```json
{
  "success": true,
  "message": "Application created successfully",
  "application": { ... }
}
```

---

### Update Application
```http
PUT /applications/:id
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as create, but all fields optional

**Response (200):**
```json
{
  "success": true,
  "message": "Application updated successfully",
  "application": { ... }
}
```

---

### Update Application Status
```http
PATCH /applications/:id/status
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "interview",
  "notes": "HR screening scheduled for next week"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Status updated successfully",
  "application": { ... }
}
```

---

### Delete Application
```http
DELETE /applications/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

---

### Bulk Delete Applications
```http
DELETE /applications/bulk
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "ids": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "2 applications deleted successfully",
  "deletedCount": 2
}
```

---

## 📊 Analytics

### Get Dashboard Analytics
```http
GET /analytics/dashboard
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalApplications": 45,
    "recentCount": 8,
    "successRate": 22.22,
    "offerCount": 10,
    "statusBreakdown": [
      { "_id": "applied", "count": 15 },
      { "_id": "interview", "count": 12 },
      { "_id": "offer", "count": 8 },
      { "_id": "rejected", "count": 10 }
    ],
    "jobTypeBreakdown": [
      { "_id": "internship", "count": 25 },
      { "_id": "full-time", "count": 20 }
    ],
    "monthlyApplications": [
      { "_id": { "year": 2024, "month": 1 }, "count": 15 },
      { "_id": { "year": 2024, "month": 2 }, "count": 30 }
    ],
    "priorityBreakdown": [
      { "_id": "high", "count": 12 },
      { "_id": "medium", "count": 25 },
      { "_id": "low", "count": 8 }
    ],
    "topCompanies": [
      { "_id": "Google", "count": 5 },
      { "_id": "Meta", "count": 4 },
      { "_id": "Amazon", "count": 3 }
    ]
  }
}
```

---

### Get Status Statistics
```http
GET /analytics/status-stats
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "stats": [
    {
      "status": "applied",
      "count": 15,
      "avgDaysSince": 12
    },
    {
      "status": "interview",
      "count": 8,
      "avgDaysSince": 5
    }
  ]
}
```

---

### Get Timeline Data
```http
GET /analytics/timeline?days=30
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `days` (optional): Number of days to look back (default: 30)

**Response (200):**
```json
{
  "success": true,
  "timeline": [
    { "date": "2024-01-15", "count": 3 },
    { "date": "2024-01-16", "count": 5 },
    { "date": "2024-01-17", "count": 2 }
  ]
}
```

---

### Get Response Rate
```http
GET /analytics/response-rate
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "total": 45,
    "responded": 30,
    "noResponse": 15,
    "responseRate": 66.67
  }
}
```

---

### Get Source Analytics
```http
GET /analytics/sources
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "sourceStats": [
    {
      "source": "linkedin",
      "count": 20,
      "offerCount": 5,
      "successRate": 25.0
    },
    {
      "source": "indeed",
      "count": 15,
      "offerCount": 3,
      "successRate": 20.0
    }
  ]
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Application not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "stack": "Error stack trace (development only)"
}
```

---

## 🔄 Rate Limiting

API is rate-limited to prevent abuse:
- **Window**: 15 minutes
- **Max Requests**: 100 per window per IP

When exceeded:
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

---

## 📝 Field Validation

### Application Schema Constraints
- `company`: Required, max 100 characters
- `position`: Required, max 100 characters
- `location`: Optional, max 100 characters
- `jobType`: Enum: internship, full-time, part-time, contract, freelance
- `status`: Enum: applied, interview, offer, rejected, accepted, withdrawn
- `priority`: Enum: low, medium, high
- `source`: Enum: linkedin, indeed, company-website, referral, other
- `notes`: Optional, max 1000 characters
- `tags`: Array of strings

### User Schema Constraints
- `name`: Required, max 50 characters
- `email`: Required, valid email format, unique
- `password`: Required, min 6 characters
- `role`: Enum: user, admin

---

## 🧪 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get applications (replace TOKEN)
curl http://localhost:5000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create application
curl -X POST http://localhost:5000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"company":"Google","position":"SWE Intern"}'
```

### Using Postman

1. Import as collection or create requests manually
2. Set `Authorization` type to `Bearer Token`
3. Paste your JWT token
4. Send requests

---

## 🔐 Security Notes

1. **Never share your JWT token**
2. **Tokens expire after 7 days** - login again
3. **Use HTTPS in production** - never send tokens over HTTP
4. **Store tokens securely** - localStorage or httpOnly cookies
5. **Don't log sensitive data** - passwords, tokens

---

## 📞 Support

For bugs or questions:
- GitHub Issues: [Your Repo](https://github.com/yourusername/interntrack)
- Email: your.email@example.com

---

**API Version**: 1.0.0  
**Last Updated**: February 2024
