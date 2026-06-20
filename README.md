# 🚗 TMS Travels — MERN Stack Website

A complete travel rental website for **TMS Travels**, Salem, Tamil Nadu.
**Stack: MongoDB · Express · React · Node.js**

---

## 📁 Project Structure

```
tms-travels-fullstack/
├── src/                          # React frontend (Vite)
│   ├── app/components/           # UI components
│   └── main.tsx
├── backend/                      # Node.js + Express API
│   ├── config/
│   │   └── db.js                 # MongoDB connection (Mongoose)
│   ├── models/
│   │   ├── Booking.js            # Booking schema & model
│   │   └── Contact.js            # Contact message schema & model
│   ├── routes/
│   │   ├── bookings.js           # Booking CRUD API
│   │   └── contact.js            # Contact messages API
│   ├── middleware/
│   │   └── errorHandler.js       # Central error handler
│   ├── admin.html                # Admin dashboard (browser UI)
│   ├── email.js                  # Nodemailer email notifications
│   ├── server.js                 # Express entry point
│   ├── package.json
│   └── .env.example
├── package.json                  # Frontend deps
├── vite.config.ts                # Vite + API proxy
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB installed locally **or** a MongoDB Atlas account (free)

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd backend && npm install && cd ..
```

### 2. Configure environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
# Local MongoDB
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB_NAME=tms_travels

# OR MongoDB Atlas
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

PORT=5000
FRONTEND_URL=http://localhost:5173
EMAIL_USER=tmstravels@gmail.com
EMAIL_PASS=your_gmail_app_password
OWNER_EMAIL=tmstravels@gmail.com
```

### 3. Start MongoDB (if running locally)

```bash
mongod
# or on macOS with Homebrew:
brew services start mongodb-community
```

### 4. Run both servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev        # nodemon, auto-reload
# or: npm start
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:5000/admin

---

## 📡 API Reference

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | List bookings (`?status=pending&date=2026-07-01&page=1&limit=20`) |
| GET | `/api/bookings/stats` | Count by status |
| GET | `/api/bookings/:id` | Get single booking |
| PATCH | `/api/bookings/:id/status` | Update status |
| DELETE | `/api/bookings/:id` | Delete booking |

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit message |
| GET | `/api/contact` | List messages |
| PATCH | `/api/contact/:id/status` | Mark read/replied |

### Health

| Method | Endpoint |
|--------|----------|
| GET | `/api/health` |

---

## 🗄️ MongoDB Collections

### `bookings`
```js
{
  name, mobile, pickup, destination,
  vehicle, tripType, travelDate,
  message, status,   // pending | confirmed | completed | cancelled
  createdAt, updatedAt
}
```

### `contacts`
```js
{
  name, email, mobile, subject, message,
  status,   // unread | read | replied
  createdAt, updatedAt
}
```

---

## 📧 Email Setup

1. Enable 2-Step Verification on your Google account
2. Go to **App Passwords** → generate one
3. Set `EMAIL_PASS` in `backend/.env`

---

## ☁️ MongoDB Atlas (Free Cloud DB)

1. Create account at https://www.mongodb.com/atlas
2. Create a free M0 cluster
3. Add a database user & whitelist your IP
4. Copy the connection string to `MONGO_URI` in `.env`

---

## 🏗️ Production Build

```bash
# Build React frontend
npm run build          # outputs to dist/

# Run backend (serves dist/ automatically in production)
cd backend
NODE_ENV=production npm start
```

Only one process needed in production!

---

**TMS Travels** | Thammampatty, Salem, TN 636 309 | +91 7402233588
