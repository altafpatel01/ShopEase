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

  // // Check for stock availability of each product in the order
  // for (const item of orderItems) {
  //   const product = await Product.findById(item.product);
  //   if (!product) {
  //     return next(new ErrorHandler(`Product not found: ${item.name}`, 404));
  //   }

  //   if (product.stock < item.quantity) {
  //     return next(
  //       new ErrorHandler(`Insufficient stock for product: ${item.name}`, 400)
  //     );
  //   }
  // }

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
    user: req.user.id, // Assuming user is authenticated
  });

  // // Reduce stock of ordered products
  // for (const item of orderItems) {
  //   const product = await Product.findById(item.product);
  //   product.stock -= item.quantity;
  //   await product.save({ validateBeforeSave: false });
  // }

  res.status(201).json({
    success: true,
    order,
  });
});
// get single order
exports.getSingleOrder = asyncHandler(async(req, res,next)=>{
  const order = await Order.findById(req.params.id).populate('user','name email')
 
   if(!order){
    return next(new ErrorHandler('order not found',400))
   }

   res.status(200).json({
    succes:true,
    order
   })

})
// get total amount order are requested
exports.totalValue =asyncHandler(async(req,res ,next)=>{
  const orders = await Order.find()
if(!orders){
  return next(new ErrorHandler('No order is place',404))
}
    const totalMoney = orders.reduce((acc, order)=> acc+order.totalPrice,0)
    res.status(200).json({
      success:true,
      totalMoney
    })
})
// get all order of logged in user
exports.myOrders= asyncHandler(async(req,res,next)=>{

  const orders = await Order.find({user:req.user.id})

  if(!orders){
    return next(new ErrorHandler("There is no order ",400 ))
  }
  res.status(200).json({
    success:true,
    orders
  })

})



exports.deleteOrder = asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id).populate('orderItems.product')
  if (!order) {
    return next(new ErrorHandler('order not found',400)); // Handle not found case
  }
  //  for(const item of order.orderItems){
  //   const product = item.product

  //   await Product.findByIdAndUpdate(product._id, {
  //     $inc: { stock: item.quantity }, // Increment the stock by the quantity ordered
  //   });
  // }

  // await Order.findByIdAndDelete(req.params.id);
  await order.deleteOne()
  res.status(200).json({ message: 'Order deleted successfully and stock updated' });
})

exports.updateOrderStatus = asyncHandler(async(req,res,next)=>{
  const order = await Order.findById(req.params.id)
  if(!order){
    return next(new ErrorHandler('order not founded',404))
  }
  if(order.orderStatus ==='Delivered'){
    return next(new ErrorHandler('order is already is delivered',400))
  }
  // Check for stock availability of each product in the order
  for (const item of order.orderItems) {
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
  // Reduce stock of ordered products
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save({ validateBeforeSave: false });
  }
  order.orderStatus = req.body.status
  if(req.body.status ==='Delivered'){
    order.deliveredAt = Date.now()
  }
  await order.save()

  res.status(200).json({
    success:true,
    order
  })
})