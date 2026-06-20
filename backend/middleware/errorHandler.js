/**
 * Central error handler middleware.
 * Must be registered LAST in Express (after all routes).
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 422;
    const messages = Object.values(err.errors).map((e) => e.message);
    message = messages[0];
    return res.status(statusCode).json({ success: false, message, errors: messages });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate entry detected.";
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid ID format.";
  }

  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
