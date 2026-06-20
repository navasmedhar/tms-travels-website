require("dotenv").config();

const express   = require("express");
const cors      = require("cors");
const rateLimit = require("express-rate-limit");
const path      = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const bookingsRouter = require("./routes/bookings");
const contactRouter  = require("./routes/contact");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Connect MongoDB ───────────────────────────────────────────────────────────
connectDB();

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ── Rate limiting (general, applies to all routes) ────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again in 15 minutes." },
}));

// NOTE: bookingLimiter moved into routes/bookings.js and applied ONLY to the
// POST "/" (create booking) route — so admin GET requests are never rate-limited.

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Admin Dashboard (static HTML) ────────────────────────────────────────────
app.get("/admin", (_req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/bookings", bookingsRouter);
app.use("/api/contact",  contactRouter);

// Health check
app.get("/api/health", (_req, res) => {
  const mongoose = require("mongoose");
  res.json({
    success: true,
    service: "TMS Travels API (MERN)",
    status: "running",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// ── Error Handling ────────────────────────────────────────────────────────────
app.use(errorHandler);
app.use((_req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║   TMS Travels API  —  MERN Stack             ║
║   http://localhost:${PORT}                      ║
║   Admin: http://localhost:${PORT}/admin          ║
║   Stack: MongoDB + Express + React + Node    ║
╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
