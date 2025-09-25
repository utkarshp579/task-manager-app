# Task Manager - Fullstack Web Application

A modern, responsive task management application built with React.js frontend and Node.js/Express backend, featuring JWT authentication, CRUD operations, and real-time filtering.

## 🚀 Live Demo

- **Frontend**: https://task-manager-app-two-pi.vercel.app/
- **Backend API**: https://task-manager-backend-shj6.onrender.com/
- **Demo Credentials**: 
  - Email: john@example.com
  - Password: 123456

## ✨ Features

### Authentication & Security
- [x] User registration and login
- [x] JWT-based authentication
- [x] Password hashing with bcrypt
- [x] Protected routes
- [x] Token validation middleware

### Task Management (CRUD)
- [x] Create tasks with title, description, priority, and status
- [x] View all tasks in a clean, organized interface
- [x] Edit existing tasks
- [x] Delete tasks with confirmation
- [x] Real-time search functionality
- [x] Filter by status (pending, in-progress, completed)
- [x] Filter by priority (low, medium, high)

### User Experience
- [x] Responsive design for all screen sizes
- [x] Loading states and error handling
- [x] User profile management
- [x] Dashboard with task statistics
- [x] Mobile-friendly navigation
- [x] Form validation (client + server side)

### Technical Features
- [x] RESTful API design
- [x] MongoDB database integration
- [x] Modern React with hooks
- [x] TailwindCSS for styling
- [x] Component-based architecture
- [x] Context API for state management

## 🛠️ Tech Stack

### Frontend
- **React.js** (18+) with Vite
- **React Router** for navigation
- **TailwindCSS** for styling
- **Lucide React** for icons
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment variables

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📦 Installation & Setup

### Prerequisites
- Node.js (14+ recommended)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/task-manager-fullstack.git
cd task-manager-fullstack
```
### 2. Backend Setup
```bash
cd backend
npm install
```

# Create .env file
Add to .env:
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

# Start backend server
npm run dev

Backend will run on http://localhost:5000

### 3. Frontend Setup
cd ../frontend
npm install

# Start frontend development server
npm run dev

Frontend will run on http://localhost:5173

### 🔧 API Documentation
# Authentication Endpoints

POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/verify - Verify JWT token

# Profile Endpoints

GET /api/profile - Get user profile
PUT /api/profile - Update user profile

# Tasks Endpoints

GET /api/tasks - Get all tasks (with optional query parameters)
POST /api/tasks - Create new task
GET /api/tasks/:id - Get single task
PUT /api/tasks/:id - Update task
DELETE /api/tasks/:id - Delete task

# Query Parameters for GET /api/tasks

search - Search in title/description
status - Filter by status (pending, in-progress, completed)
priority - Filter by priority (low, medium, high)
sort - Sort order (default: -createdAt)

sort - Sort order (default: -createdAt)

### 📱 Screenshots
Dashboard
Show Image
Tasks Management
Show Image
Mobile View
Show Image

### 🚀 Deployment
Backend (Render)

Create account on Render.com
Connect GitHub repository
Create new Web Service
Set environment variables
Deploy

Frontend (Vercel)

Create account on Vercel.com
Import GitHub repository
Configure build settings
Deploy

### 🧪 Testing
Manual Testing Checklist

 User registration with validation
 User login/logout functionality
 Create tasks with all fields
 Edit existing tasks
 Delete tasks with confirmation
 Search functionality
 Status and priority filtering
 Profile update
 Mobile responsiveness
 Error handling

### API Testing
Use the included Postman collection (task-manager-api.postman_collection.json) to test all endpoints.

### 🔒 Security Features

JWT token-based authentication
Password hashing with bcrypt (salt rounds: 10)
Protected routes on both frontend and backend
Input validation and sanitization
CORS configuration
Environment variables for sensitive data

### 📈 Scalability Considerations
Current Architecture

Component-based React structure
Context API for state management
Modular backend with separate routes and controllers
MongoDB for flexible data storage

### Future Enhancements

Redis for session management
Microservices architecture
Real-time updates with Socket.io
File upload functionality
Email notifications
Task sharing and collaboration
Advanced analytics dashboard

### 🐛 Known Issues & Limitations

Email notifications not implemented
File attachments not supported
Bulk operations not available
Advanced search filters limited

### 🤝 Contributing

Fork the repository
Create feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open Pull Request

### 📄 License
This project is open source and available under the MIT License.

### 👨‍💻 Developer
Utkarsh Pandey

Email: utkarshp579@gmail.com
GitHub: @utkarshp579
Portfolio: linkedin/u/utkarshp579


⭐ If you found this project helpful, please give it a star!