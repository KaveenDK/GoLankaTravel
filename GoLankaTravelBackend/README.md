````markdown
# 🌴 GoLanka Travel - Backend API

> The powerful Node.js & TypeScript backend powering the GoLanka Travel platform.
> Features AI-driven itinerary generation, secure payments, and comprehensive travel management.

![Node.js](https://img.shields.io/badge/Node.js-v18-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)

---

## 🚀 Features

- **🔐 Advanced Authentication:**

  - JWT Access & Refresh Tokens (HttpOnly Cookies).
  - Google OAuth Integration.
  - Role-Based Access Control (Admin vs. Traveler).

- **🤖 AI Smart Planner:**

  - Integration with **Google Gemini AI**.
  - Generates personalized day-by-day itineraries based on budget and interests.

- **💳 Secure Payments:**

  - **Stripe** integration for international card payments.
  - **PayHere** integration for local Sri Lankan payments.
  - Payment audit logs and order tracking.

- **📄 Dynamic PDF Generation:**

  - Download professional travel itineraries as PDF files.

- **☁️ Cloud Storage:**

  - **Cloudinary** integration for optimized image uploads (Avatars, Trip covers).

- **🛡️ Security & Reliability:**
  - Data Validation with **Joi**.
  - Security headers with **Helmet**.
  - Global Error Handling middleware.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Passport.js, JSON Web Tokens (JWT)
- **Validation:** Joi
- **File Uploads:** Multer, Cloudinary
- **Tools:** Nodemon, Dotenv

---

## ⚙️ Installation & Setup

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local instance)

### 2. Clone the Repository

```bash
git clone [https://github.com/yourusername/GoLankaTravelBackend.git](https://github.com/yourusername/GoLankaTravelBackend.git)
cd GoLankaTravelBackend
```
````

### 3\. Install Dependencies

```bash
npm install
```

_Note: If you encounter dependency conflicts, run `npm install --legacy-peer-deps`._

### 4\. Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```env
# Server Config
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/golanka?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
REFRESH_TOKEN_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# AI Service (Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Payment Gateways
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYHERE_MERCHANT_ID=your_merchant_id
PAYHERE_SECRET=your_payhere_secret
```

### 5\. Run the Server

**Development Mode:**

```bash
npm run dev
```

The server will start at `http://localhost:5000`.

**Production Build:**

```bash
npm run build
npm start
```

---

## 📡 API Documentation

### **Authentication**

- `POST /api/v1/auth/register` - Create a new account.
- `POST /api/v1/auth/login` - Login and receive tokens.
- `GET /api/v1/auth/google` - Login with Google.

### **Users**

- `GET /api/v1/users/me` - Get current user profile.
- `PUT /api/v1/users/me` - Update profile (Avatar, Name).

### **Trips**

- `GET /api/v1/trips/all` - Browse all travel packages.
- `POST /api/v1/trips/save` - Create a new trip (Admin).
- `POST /api/v1/trips/:id/pdf` - Download Trip PDF.

### **AI Planner**

- `POST /api/v1/ai/generate` - Generate a custom itinerary.

---

## 📂 Project Structure

```
src/
├── config/         # Database, Gemini, Passport config
├── controllers/    # Route logic (Req/Res handling)
├── dto/            # Data Transfer Objects (Interfaces)
├── middleware/     # Auth, Validation, Uploads, Errors
├── models/         # Mongoose Schemas (User, Trip, Order)
├── routes/         # API Endpoint definitions
├── services/       # Business logic (Email, PDF, AI)
├── utils/          # Helpers (AppError, APIResponse)
├── app.ts          # Express App setup
└── server.ts       # Server entry point
```

---

## 👨‍💻 Author

**KaveenDK**

- GitHub: [KaveenDK](https://www.google.com/search?q=https://github.com/KaveenDK)

---

## 📄 License

This project is licensed under the MIT License.

```

```
