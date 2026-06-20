const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, param, query, validationResult } = require("express-validator");
const Booking = require("../models/Booking");
const { sendBookingEmails } = require("../email");

const router = express.Router();

// ── Rate limiter — applies ONLY to creating new bookings (POST /) ─────────────
// This stops customers from spamming the public booking form, without
// affecting the admin dashboard's GET requests (list, stats, single booking).
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many booking requests. Please call us at +91 7402233588." },
});

// ── Validation rules ──────────────────────────────────────────────────────────
const bookingValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^[+\d\s\-()]{7,20}$/)
    .withMessage("Invalid mobile number"),
  body("pickup").trim().notEmpty().withMessage("Pickup location is required").isLength({ max: 200 }),
  body("destination").trim().notEmpty().withMessage("Destination is required").isLength({ max: 200 }),
  body("vehicle").trim().notEmpty().withMessage("Vehicle type is required"),
  body("travel_date")
    .notEmpty().withMessage("Travel date is required")
    .isISO8601().withMessage("Invalid date format"),
  body("trip_type").optional().trim().isLength({ max: 100 }),
  body("message").optional().trim().isLength({ max: 1000 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
  }
  next();
};

// ── POST /api/bookings — Create booking ───────────────────────────────────────
router.post("/", bookingLimiter, bookingValidation, validate, async (req, res, next) => {
  try {
    const { name, mobile, pickup, destination, vehicle, trip_type, travel_date, message } = req.body;

    const booking = await Booking.create({
      name,
      mobile,
      pickup,
      destination,
      vehicle,
      tripType: trip_type || "",
      travelDate: new Date(travel_date),
      message: message || "",
    });

    // Send email notification (non-blocking)
    sendBookingEmails(booking).catch(() => {});

    console.log(`[BOOKING] ✅ New booking ${booking._id} — ${name} (${mobile}) → ${destination} on ${travel_date}`);

    return res.status(201).json({
      success: true,
      message: "Booking received! Our team will contact you within 30 minutes.",
      booking: {
        id: booking._id,
        name: booking.name,
        mobile: booking.mobile,
        destination: booking.destination,
        travelDate: booking.travelDate,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/bookings — List bookings ─────────────────────────────────────────
router.get("/", async (req, res, next) => {
  try {
    const { status, date, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (date) {
      // Match bookings on a specific travel date (day range)
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.travelDate = { $gte: start, $lt: end };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Booking.countDocuments(filter),
    ]);

    return res.json({ success: true, total, page: parseInt(page), bookings });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/bookings/stats — Booking counts by status ────────────────────────
router.get("/stats", async (req, res, next) => {
  try {
    const stats = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const result = { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    stats.forEach(({ _id, count }) => {
      result[_id] = count;
      result.total += count;
    });
    return res.json({ success: true, stats: result });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/bookings/:id — Get single booking ────────────────────────────────
router.get("/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).lean();
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    return res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/bookings/:id/status — Update status ───────────────────────────
router.patch(
  "/:id/status",
  [body("status").isIn(["pending", "confirmed", "completed", "cancelled"]).withMessage("Invalid status")],
  validate,
  async (req, res, next) => {
    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );
      if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
      return res.json({ success: true, message: "Status updated", booking });
    } catch (err) {
      next(err);
    }
  }
);

// ── DELETE /api/bookings/:id — Delete booking ─────────────────────────────────
router.delete("/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    return res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
