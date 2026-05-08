# 🛡️ Scam Detector Fullstack App

A modern fullstack scam detection web application built using the MERN stack.

This project allows users to:
- Register and login securely
- Scan phone numbers for scam risk
- Report suspicious numbers
- View scan history
- Delete their account
- Access protected routes using JWT authentication

---

#  Live Demo

## Frontend (Vercel)
https://scam-detector-fullstack-assignment-rho.vercel.app/

## Backend API (Render)
https://scam-detector-fullstack-assignment-3-2.onrender.com/

---

#  Features

##  Authentication System
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Admin Middleware
- Logout System
- Delete Account Feature

## Scam Detection System
- Scan phone numbers
- AI-style risk analysis UI
- Scam risk score
- Scam detection result
- Number reporting system

## History System
- View scan history
- Protected history route
- Role-based access middleware

## Frontend UI
- Responsive modern UI
- Animated scanning system
- Security dashboard design
- Interactive result cards

---

# 🛠Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# Installation Guide

##  Clone Repository

```bash
git clone <your-github-repo>
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Routes

## Auth Routes

| Method | Route | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| DELETE | /api/auth/delete | Delete account |

---

## Scam Routes

| Method | Route | Description |
|---|---|---|
| POST | /api/scam/check | Scan number |
| POST | /api/scam/report | Report scam number |
| GET | /api/scam/history | View scan history |

---

# Security Features

- Password hashing using bcryptjs
- JWT authentication
- Protected API routes
- Role-based middleware
- Token verification
- Secure account deletion

---

# Sample Test Account

```text
Email: test@test.com
Password: 123456
```

---

# Screenshots

You can add screenshots here later:

- Login Page
- Register Page
- Dashboard
- Scam Detection Result
- History Page

---

# Learning Outcomes

This project demonstrates:

- Fullstack MERN development
- REST API creation
- Authentication system
- MongoDB integration
- Frontend and backend connection
- Deployment process
- Protected routes
- State management
- Error handling

---

# Author

Developed by Wan Mohd Fardlullah

---

# License

This project is for educational purposes.

