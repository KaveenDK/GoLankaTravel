# 🌴 GoLanka Travel - AI-Powered Travel Platform

**GoLanka Travel** is a modern, immersive travel booking platform designed specifically for Sri Lanka. It combines cutting-edge technology with authentic local experiences, featuring an AI-powered itinerary generator, 3D interactive maps, and a seamless booking system.

![GoLanka Hero](https://images.unsplash.com/photo-1586607267156-621d9607eb26?q=80&w=1974&auto=format&fit=crop)

## 🚀 Features

### 🌟 Core Features

- **AI Smart Planner:** Generate personalized day-by-day itineraries based on budget, interests, and duration using Gemini AI.
- **Immersive 3D Maps:** Interactive Leaflet maps with custom markers to visualize trip routes.
- **AI Chat Assistant:** A global floating chat widget to answer travel queries instantly.
- **Trip Booking System:** Full e-commerce flow including Cart, Checkout, and Order Management.
- **Secure Payments:** Integrated support for Stripe (International) and PayHere (Local) payment gateways.
- **PDF Itinerary Generation:** Download styled PDF tickets and itineraries after booking.

### 🎨 Frontend Highlights

- **Modern UI/UX:** Built with React, TypeScript, and Tailwind CSS.
- **Animations:** Smooth transitions using Framer Motion.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **State Management:** Powered by Redux Toolkit for robust data handling.

### ⚙️ Backend Highlights

- **RESTful API:** Robust Node.js & Express architecture.
- **Security:** JWT Authentication, Bcrypt password hashing, and Helmet security headers.
- **Database:** MongoDB with Mongoose ODM.

---

## 🛠️ Tech Stack

| **Frontend**  | **Backend** | **Tools & APIs**    |
| :------------ | :---------- | :------------------ |
| React (Vite)  | Node.js     | Gemini AI (Google)  |
| TypeScript    | Express.js  | Stripe & PayHere    |
| Tailwind CSS  | MongoDB     | Cloudinary (Images) |
| Redux Toolkit | Mongoose    | Leaflet Maps        |
| Framer Motion | JWT Auth    | Puppeteer (PDF)     |

---

## 📂 Project Structure

```bash
GoLanka-Travel/
├── GoLankaTravelBackend/   # Server-side Code
│   ├── config/             # DB & Env Config
│   ├── controllers/        # Route Logic
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Endpoints
│   ├── services/           # AI & Email Services
│   └── server.js           # Entry Point
│
└── GoLankaTravelFrontend/  # Client-side Code
    ├── src/
    │   ├── components/     # Reusable UI (Maps, Chat, Cards)
    │   ├── layouts/        # Auth & Main Layouts
    │   ├── pages/          # Full Page Views
    │   ├── redux/          # State Slices
    │   └── utils/          # Helpers & API Wrappers
    └── package.json

```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)
- Git

### 2. Backend Setup

Navigate to the backend folder and install dependencies.

```bash
cd GoLankaTravelBackend
npm install

```

Create a `.env` file in the `GoLankaTravelBackend` root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d

# AI & Cloud Keys
GEMINI_API_KEY=your_google_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

Start the server:

```bash
npm run dev
# Server running on http://localhost:5000

```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies.

```bash
cd GoLankaTravelFrontend
npm install

```

Create a `.env` file in the `GoLankaTravelFrontend` root (Optional):

```env
VITE_API_URL=http://localhost:5000/api/v1

```

Start the development server:

```bash
npm run dev
# App running on http://localhost:5173

```

---

## 🔌 API Endpoints (Overview)

| Method          | Endpoint                 | Description                  | Access  |
| --------------- | ------------------------ | ---------------------------- | ------- |
| **Auth**        |                          |                              |         |
| `POST`          | `/api/v1/auth/register`  | Register new user            | Public  |
| `POST`          | `/api/v1/auth/login`     | Login user                   | Public  |
| `GET`           | `/api/v1/auth/me`        | Get current user profile     | Private |
| **Trips**       |                          |                              |         |
| `GET`           | `/api/v1/trips`          | Get all trips (with filters) | Public  |
| `GET`           | `/api/v1/trips/:id`      | Get single trip details      | Public  |
| **AI Features** |                          |                              |         |
| `POST`          | `/api/v1/ai/generate`    | Generate itinerary           | Private |
| `POST`          | `/api/v1/ai/chat`        | Chat with AI Assistant       | Public  |
| **Orders**      |                          |                              |         |
| `POST`          | `/api/v1/orders`         | Create new booking           | Private |
| `POST`          | `/api/v1/orders/pdf/:id` | Generate Trip PDF            | Private |

---

## 🧪 Testing

### Frontend Testing

- **Chat:** Click the floating button on the bottom right.
- **Maps:** Go to any _Trip Details_ page to see the Leaflet integration.
- **Cart:** Click "Book Now" on a trip and check the Cart page.

### Common Issues & Fixes

1. **Map not loading?**

- Ensure your internet connection is active (Leaflet needs OSM tiles).

2. **401 Unauthorized Errors?**

- Check `src/utils/api.ts` ensures the token is being sent.
- Clear Local Storage (Application > Local Storage > Delete 'token') and login again.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Developer:** KaveeNDK

**Project Link:** [https://github.com/KaveenDK/GoLankaTravel](https://github.com/KaveenDK/GoLankaTravel.git)
