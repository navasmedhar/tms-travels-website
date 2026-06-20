const express = require("express");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const { sendContactEmail } = require("../email");

const router = express.Router();

const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 2000 }),
  body("email").optional({ checkFalsy: true }).trim().isEmail().withMessage("Invalid email address"),
  body("mobile").optional().trim().isLength({ max: 20 }),
  body("subject").optional().trim().isLength({ max: 200 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array(), message: errors.array()[0].msg });
  }
  next();
};

// POST /api/contact
router.post("/", contactValidation, validate, async (req, res, next) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    const contact = await Contact.create({ name, email, mobile, subject, message });

    // Fire-and-forget email notification
    sendContactEmail(contact).catch(() => {});

    console.log(`[CONTACT] New message from ${name}`);

    return res.status(201).json({
      success: true,
      message: "Message received! We'll get back to you soon.",
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/contact — list messages
router.get("/", async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [messages, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Contact.countDocuments(filter),
    ]);

    return res.json({ success: true, total, page: parseInt(page), messages });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/contact/:id/status
router.patch("/:id/status", [
  body("status").isIn(["unread", "read", "replied"]).withMessage("Invalid status"),
], validate, async (req, res, next) => {
  try {
    const msg = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });
    return res.json({ success: true, message: "Status updated" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
