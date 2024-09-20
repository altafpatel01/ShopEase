const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the stock quantity"],
    maxLength: [4, "Quantity cannot exceed 9999"],
    default: 1,
  },
  reviews: [  // Corrected from 'reviwes' to 'reviews'
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: { // Corrected from 'comments' to 'comment' for consistency
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {  // Corrected from 'createAt' to 'createdAt'
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);


