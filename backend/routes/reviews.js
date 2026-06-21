const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const Review = require("../models/Review");

const router = express.Router();

// ── Rate limiter — applies ONLY to submitting new reviews (POST /) ────────────
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many review submissions. Please try again later." },
});

// ── Validation rules ──────────────────────────────────────────────────────────
const reviewValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("location").optional().trim().isLength({ max: 100 }),
  body("trip").optional().trim().isLength({ max: 150 }),
  body("rating")
    .notEmpty().withMessage("Rating is required")
    .isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("review").trim().notEmpty().withMessage("Review text is required").isLength({ max: 1000 }),
  body("mobile").optional().trim().isLength({ max: 20 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
  }
  next();
};

// ── POST /api/reviews — Submit a new review (public, goes to "pending") ───────
router.post("/", reviewLimiter, reviewValidation, validate, async (req, res, next) => {
  try {
    const { name, location, trip, rating, review, mobile } = req.body;

    const newReview = await Review.create({
      name,
      location: location || "",
      trip: trip || "",
      rating,
      review,
      mobile: mobile || "",
      status: "pending",
    });

    console.log(`[REVIEW] ✅ New review ${newReview._id} — ${name} (${rating}★)`);

    return res.status(201).json({
      success: true,
      message: "Thank you! Your review has been submitted and will appear once approved.",
    });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/reviews — Public: only APPROVED reviews (for the website) ────────
router.get("/", async (req, res, next) => {
  try {
    const { limit = 20 } = req.query;
    const reviews = await Review.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .lean();

    return res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/reviews/all — Admin: ALL reviews regardless of status ────────────
router.get("/all", async (req, res, next) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [reviews, total] = await Promise.all([
      Review.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Review.countDocuments(filter),
    ]);

    return res.json({ success: true, total, page: parseInt(page), reviews });
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/reviews/:id/status — Admin: approve / reject a review ──────────
router.patch(
  "/:id/status",
  [body("status").isIn(["pending", "approved", "rejected"]).withMessage("Invalid status")],
  validate,
  async (req, res, next) => {
    try {
      const review = await Review.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );
      if (!review) return res.status(404).json({ success: false, message: "Review not found" });
      return res.json({ success: true, message: "Status updated", review });
    } catch (err) {
      next(err);
    }
  }
);

// ── DELETE /api/reviews/:id — Admin: delete a review ───────────────────────────
router.delete("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    return res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;