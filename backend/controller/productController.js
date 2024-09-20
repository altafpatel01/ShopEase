const Product = require("../models/productModel");
const asyncHandler =require('../middleware/asyncHandler')
const ErrorHandler = require('../utils/errorHandler')
const mongoose = require('mongoose');
const ApiFeature = require("../utils/apifeature");
exports.getProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
  
    let product = await Product.findById(id);
  
    if (!product) {
      return next(new ErrorHandler("product not found", 400));
    }
    res.status(200).json({
      success: true,
      message: "product fetch successfully",
      product,
    });
  }
)

exports.createProduct = asyncHandler(async (req, res, next) => {

  req.body.user=req.user.id
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    message: "product created successfully",
    newProduct,
  });
});
exports.getAllPorducts = asyncHandler(async (req, res, next) => {
  const resultPerPage =5
  const apiFeature =new ApiFeature(Product.find(),req.query).search().filter().pagination(resultPerPage)
  const products = await apiFeature.query;
  res.status(200).json({
    message: "All product",
    products,
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    let product = await Product.findById(id);

    if (!product) {
      return  next(new ErrorHandler("product not found", 400));
    }

    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      updatedproduct: product,
      message: "Product detail update successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
    console.error(error);
  }
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
    try {
      const productId = req.params.id;
      
      // Validate ID format
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler('Invalid product ID format', 400));
      }
  
      const product = await Product.findByIdAndDelete(productId);
  
      if (!product) {
        return next(new ErrorHandler('Product not found', 404));
      }
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (err) {
      next(err); // Pass the error to the error-handling middleware
    }
  });