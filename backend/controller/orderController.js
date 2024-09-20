const Order = require('../models/orderModel'); // Import the Order model
const Product = require('../models/productModel'); // Import the Product model (for stock checks)
const asyncHandler = require('../middleware/asyncHandler'); // For error handling
const ErrorHandler = require('../utils/errorHandler'); // Error handling utility

// Create new order handler
exports.newOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Ensure the order contains items
  if (orderItems.length === 0) {
    return next(new ErrorHandler('No order items provided', 400));
  }

  // Check for stock availability of each product in the order
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      return next(new ErrorHandler(`Product not found: ${item.name}`, 404));
    }

    if (product.stock < item.quantity) {
      return next(
        new ErrorHandler(`Insufficient stock for product: ${item.name}`, 400)
      );
    }
  }

  // Create new order in the database
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(), // Assuming payment is completed during the order creation
    user: req.user._id, // Assuming user is authenticated
  });

  // Reduce stock of ordered products
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save({ validateBeforeSave: false });
  }

  res.status(201).json({
    success: true,
    order,
  });
});
