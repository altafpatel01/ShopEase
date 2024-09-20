const ErrorHandler = require("../utils/errorHandler");

// Error handling middleware
// errorMiddleware.js
const errorss = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Check for invalid JWT token (jsonwebtoken errors)
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token, please login again.";
    err = new ErrorHandler(message, 401);
  }

  // Check for expired JWT token
  if (err.name === "TokenExpiredError") {
    const message = "Your token has expired, please login again.";
    err = new ErrorHandler(message, 401);
  }
  console.log(err);
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,

    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack only in development mode
  });
};

module.exports = errorss;
